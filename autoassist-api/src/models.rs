use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct CreateLeadRequest {
    #[validate(length(min = 1, message = "Full name is required"))]
    #[serde(rename = "fullName")]
    pub full_name: String,

    #[validate(length(min = 1, message = "Company is required"))]
    pub company: String,

    #[validate(length(min = 1, message = "Website or Instagram is required"))]
    pub website: String,

    #[validate(length(min = 1, message = "Goal is required"))]
    pub goal: String,

    #[validate(length(min = 1, message = "Budget is required"))]
    pub budget: String,

    #[validate(email(message = "Invalid email address"))]
    pub email: String,

    pub phone: Option<String>,

    pub consent: bool,

    // UTM parameters
    pub utm_source: Option<String>,
    pub utm_medium: Option<String>,
    pub utm_campaign: Option<String>,
    pub utm_content: Option<String>,
    pub utm_term: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Lead {
    pub id: Uuid,
    pub full_name: String,
    pub company: String,
    pub website: String,
    pub goal: String,
    pub budget: String,
    pub email: String,
    pub phone: Option<String>,
    pub consent: bool,
    pub consent_ip: Option<String>,
    pub consent_timestamp: DateTime<Utc>,
    pub utm_source: Option<String>,
    pub utm_medium: Option<String>,
    pub utm_campaign: Option<String>,
    pub utm_content: Option<String>,
    pub utm_term: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize)]
pub struct CreateLeadResponse {
    pub success: bool,
    pub message: String,
    pub lead_id: Uuid,
}

#[derive(Debug, Serialize)]
pub struct ErrorResponse {
    pub error: String,
    pub message: String,
}

#[derive(Debug, Serialize)]
pub struct HealthResponse {
    pub status: String,
    pub version: String,
    pub timestamp: DateTime<Utc>,
}
