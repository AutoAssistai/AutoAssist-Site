use anyhow::Result;
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::time::Duration;

#[derive(Clone)]
pub struct Database {
    pool: PgPool,
}

impl Database {
    pub async fn new(database_url: &str) -> Result<Self> {
        tracing::info!("Connecting to database...");
        
        // Railway-optimized connection pool configuration
        let pool = PgPoolOptions::new()
            .max_connections(20) // Increased for Railway
            .min_connections(2)  // Maintain minimum connections
            .acquire_timeout(Duration::from_secs(30)) // Longer timeout for Railway network
            .idle_timeout(Duration::from_secs(600)) // 10 minutes idle timeout
            .max_lifetime(Duration::from_secs(1800)) // 30 minutes max lifetime
            .test_before_acquire(true) // Test connection health before use
            .connect(database_url)
            .await
            .map_err(|e| {
                tracing::error!("Failed to connect to database: {}", e);
                e
            })?;

        tracing::info!("Database connection pool established");
        
        Ok(Self { pool })
    }

    pub fn pool(&self) -> &PgPool {
        &self.pool
    }

    pub async fn run_migrations(&self) -> Result<()> {
        tracing::info!("Running database migrations...");
        
        sqlx::migrate!("./migrations")
            .run(&self.pool)
            .await
            .map_err(|e| {
                tracing::error!("Migration failed: {}", e);
                e
            })?;
        
        tracing::info!("Database migrations completed successfully");
        Ok(())
    }
    
    /// Test database connection
    pub async fn test_connection(&self) -> Result<()> {
        sqlx::query("SELECT 1")
            .execute(&self.pool)
            .await?;
        
        tracing::info!("Database connection test successful");
        Ok(())
    }
}
