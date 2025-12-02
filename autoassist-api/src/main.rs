mod config;
mod db;
mod email;
mod errors;
mod handlers;
mod models;
mod rate_limit;

use axum::{
    routing::{get, post},
    Router,
};
use std::sync::Arc;
use tower_http::{
    compression::CompressionLayer,
    cors::{Any, CorsLayer},
    trace::TraceLayer,
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use crate::config::Config;
use crate::db::Database;
use crate::rate_limit::RateLimitLayer;

pub struct AppState {
    pub db: Database,
    pub config: Config,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "autoassist_api=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer().json())
        .init();

    // Load configuration
    let config = Config::from_env()?;
    tracing::info!("Configuration loaded");

    // Initialize database
    let db = Database::new(&config.database_url).await?;
    tracing::info!("Database connected");

    // Run migrations
    db.run_migrations().await?;
    tracing::info!("Database migrations completed");

    // Create shared state
    let state = Arc::new(AppState { db, config: config.clone() });

    // Configure CORS
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Build router
    let app = Router::new()
        .route("/health", get(handlers::health_check))
        .route("/api/lead", post(handlers::create_lead))
        .layer(TraceLayer::new_for_http())
        .layer(CompressionLayer::new())
        .layer(RateLimitLayer::new())
        .layer(cors)
        .with_state(state);

    // Start server
    let addr = format!("{}:{}", config.host, config.port);
    let listener = tokio::net::TcpListener::bind(&addr).await?;
    tracing::info!("Server listening on {}", addr);

    axum::serve(listener, app).await?;

    Ok(())
}
