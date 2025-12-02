use axum::{
    extract::{ConnectInfo, State},
    http::StatusCode,
    Json,
};
use chrono::Utc;
use std::{net::SocketAddr, sync::Arc};
use uuid::Uuid;
use validator::Validate;

use crate::{
    email::EmailService,
    errors::ApiError,
    models::{CreateLeadRequest, CreateLeadResponse, HealthResponse, Lead},
    AppState,
};

pub async fn health_check() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "healthy".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
        timestamp: Utc::now(),
    })
}

pub async fn create_lead(
    State(state): State<Arc<AppState>>,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    Json(payload): Json<CreateLeadRequest>,
) -> Result<(StatusCode, Json<CreateLeadResponse>), ApiError> {
    // Validate payload
    payload
        .validate()
        .map_err(|e| ApiError::Validation(format!("Validation failed: {}", e)))?;

    // Check consent
    if !payload.consent {
        return Err(ApiError::Validation(
            "Consent is required to submit the form".to_string(),
        ));
    }

    // Extract IP address
    let client_ip = addr.ip().to_string();

    // Generate request ID for tracing
    let request_id = Uuid::new_v4();
    tracing::info!(
        request_id = %request_id,
        email = %payload.email,
        company = %payload.company,
        "Creating new lead"
    );

    // Insert lead into database
    let lead_id = Uuid::new_v4();
    let now = Utc::now();

    let lead = sqlx::query_as::<_, Lead>(
        r#"
        INSERT INTO leads (
            id, full_name, company, website, goal, budget, email, phone,
            consent, consent_ip, consent_timestamp,
            utm_source, utm_medium, utm_campaign, utm_content, utm_term,
            created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING *
        "#,
    )
    .bind(lead_id)
    .bind(&payload.full_name)
    .bind(&payload.company)
    .bind(&payload.website)
    .bind(&payload.goal)
    .bind(&payload.budget)
    .bind(&payload.email)
    .bind(&payload.phone)
    .bind(payload.consent)
    .bind(Some(client_ip))
    .bind(now)
    .bind(&payload.utm_source)
    .bind(&payload.utm_medium)
    .bind(&payload.utm_campaign)
    .bind(&payload.utm_content)
    .bind(&payload.utm_term)
    .bind(now)
    .bind(now)
    .fetch_one(state.db.pool())
    .await?;

    tracing::info!(
        request_id = %request_id,
        lead_id = %lead.id,
        "Lead created successfully"
    );

    // Send emails asynchronously (don't block response)
    let config_for_welcome = state.config.clone();
    let lead_for_welcome = lead.clone();
    tokio::spawn(async move {
        let email_service = EmailService::new(&config_for_welcome);
        if let Err(e) = email_service.send_welcome_email(&lead_for_welcome).await {
            tracing::error!("Failed to send welcome email: {}", e);
        }
    });

    let config_for_admin = state.config.clone();
    let lead_for_admin = lead.clone();
    tokio::spawn(async move {
        let email_service = EmailService::new(&config_for_admin);
        if let Err(e) = email_service.send_admin_notification(&lead_for_admin).await {
            tracing::error!("Failed to send admin notification: {}", e);
        }
    });

    Ok((
        StatusCode::OK,
        Json(CreateLeadResponse {
            success: true,
            message: "Thank you! We'll send your free homepage preview within 24-48 hours."
                .to_string(),
            lead_id: lead.id,
        }),
    ))
}
