use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;

#[derive(Debug, thiserror::Error)]
pub enum ApiError {
    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),

    #[error("Validation error: {0}")]
    Validation(String),

    #[error("Email error: {0}")]
    Email(String),

    #[error("Rate limit exceeded")]
    RateLimit,

    #[error("Internal server error")]
    Internal(#[from] anyhow::Error),
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            ApiError::Database(e) => {
                tracing::error!("Database error: {:?}", e);
                (StatusCode::INTERNAL_SERVER_ERROR, "Database error occurred")
            }
            ApiError::Validation(ref msg) => (StatusCode::BAD_REQUEST, msg.as_str()),
            ApiError::Email(ref msg) => {
                tracing::error!("Email error: {}", msg);
                (StatusCode::INTERNAL_SERVER_ERROR, "Failed to send email")
            }
            ApiError::RateLimit => (
                StatusCode::TOO_MANY_REQUESTS,
                "Too many requests. Please try again later.",
            ),
            ApiError::Internal(e) => {
                tracing::error!("Internal error: {:?}", e);
                (StatusCode::INTERNAL_SERVER_ERROR, "Internal server error")
            }
        };

        let body = Json(json!({
            "error": status.canonical_reason().unwrap_or("Unknown"),
            "message": error_message,
        }));

        (status, body).into_response()
    }
}
