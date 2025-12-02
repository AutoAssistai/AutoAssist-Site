use anyhow::{Context, Result};
use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
pub struct Config {
    pub host: String,
    pub port: u16,
    pub database_url: String,
    pub smtp_host: String,
    pub smtp_port: u16,
    pub smtp_username: String,
    pub smtp_password: String,
    pub smtp_from: String,
    pub admin_email: String,
}

impl Config {
    pub fn from_env() -> Result<Self> {
        dotenvy::dotenv().ok();

        Ok(Self {
            host: std::env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string()),
            port: std::env::var("PORT")
                .unwrap_or_else(|_| "3001".to_string())
                .parse()
                .context("Invalid PORT")?,
            database_url: std::env::var("DATABASE_URL")
                .context("DATABASE_URL must be set")?,
            smtp_host: std::env::var("SMTP_HOST")
                .context("SMTP_HOST must be set")?,
            smtp_port: std::env::var("SMTP_PORT")
                .unwrap_or_else(|_| "587".to_string())
                .parse()
                .context("Invalid SMTP_PORT")?,
            smtp_username: std::env::var("SMTP_USERNAME")
                .context("SMTP_USERNAME must be set")?,
            smtp_password: std::env::var("SMTP_PASSWORD")
                .context("SMTP_PASSWORD must be set")?,
            smtp_from: std::env::var("SMTP_FROM")
                .unwrap_or_else(|_| "autoassist.contact@yahoo.com".to_string()),
            admin_email: std::env::var("ADMIN_EMAIL")
                .unwrap_or_else(|_| "autoassist.contact@yahoo.com".to_string()),
        })
    }
}
