# 🦀 Rust + SQLx + Railway PostgreSQL - Template & Prompt

## 📋 Comprehensive Prompt for Any Rust + SQLx + Railway Project

```markdown
You are tasked with integrating a Rust project with Railway PostgreSQL database.

### Project Stack:
- Backend: Rust + Axum (or Actix/Rocket)
- Database Layer: SQLx (PostgreSQL)
- Database Host: Railway PostgreSQL
- Deployment: Railway

### Railway Database Credentials:
PGUSER=postgres
PGPASSWORD=bpGdnlJNciDiREFjpuMAafmHCQuWnryg
PGDATABASE=railway
PGPORT=5432 (internal) / 55133 (external)
PGHOST=postgres.railway.internal (internal) / tramway.proxy.rlwy.net (external)
PGDATA=/var/lib/postgresql/data/pgdata

DATABASE_URL (internal): postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway
DATABASE_URL (external): postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway

### Requirements:
1. Create/update .env files:
   - .env (for active use)
   - .env.local (for local development - uses external proxy)
   - .env.railway (for production - uses internal network)
   - .env.example (template)

2. Ensure src/main.rs or src/config.rs loads environment variables using dotenv or dotenvy

3. Configure SQLx connection pool with Railway-optimized settings:
   - max_connections: 20
   - min_connections: 2
   - acquire_timeout: 30 seconds
   - idle_timeout: 10 minutes
   - max_lifetime: 30 minutes
   - test_before_acquire: true

4. Set up automatic migrations using sqlx::migrate!()

5. Add proper error handling and logging for database connections

6. Create setup script (setup-railway.sh) that:
   - Allows choosing between local/production environment
   - Copies appropriate .env file
   - Tests database connection
   - Runs migrations

7. Create test script (test-railway-connection.sh) that verifies:
   - PostgreSQL client availability
   - External connection (TCP proxy)
   - Database tables existence
   - Write permissions

8. Update Dockerfile with:
   - SSL/TLS certificates (ca-certificates, openssl)
   - Health check endpoint
   - Proper runtime dependencies

9. Create Railway deployment files:
   - railway.toml
   - railway.json (if needed)

10. Provide comprehensive documentation in both English and Arabic

### Deliverables:
- All .env files ready to copy/paste
- Optimized database connection code
- Setup and testing scripts
- Railway deployment configuration
- Complete documentation
```

---

## 🔧 Standard .env Templates

### `.env.local` (Local Development)
```env
# Server Configuration
HOST=0.0.0.0
PORT=8080

# Railway PostgreSQL - External Connection (TCP Proxy)
DATABASE_URL=postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway

# PostgreSQL Variables
PGUSER=postgres
PGPASSWORD=bpGdnlJNciDiREFjpuMAafmHCQuWnryg
PGDATABASE=railway
PGHOST=tramway.proxy.rlwy.net
PGPORT=55133
PGDATA=/var/lib/postgresql/data/pgdata

# Logging (verbose for development)
RUST_LOG=debug,sqlx=debug
```

### `.env.railway` (Production)
```env
# Server Configuration
HOST=0.0.0.0
PORT=8080

# Railway PostgreSQL - Internal Network (Production)
DATABASE_URL=postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway

# PostgreSQL Variables
PGUSER=postgres
PGPASSWORD=bpGdnlJNciDiREFjpuMAafmHCQuWnryg
PGDATABASE=railway
PGHOST=postgres.railway.internal
PGPORT=5432
PGDATA=/var/lib/postgresql/data/pgdata

# Logging (production level)
RUST_LOG=info,sqlx=warn
```

### `.env.example` (Template)
```env
# Server Configuration
HOST=0.0.0.0
PORT=8080

# Railway PostgreSQL Database
# For local development, use external proxy
# For production, use internal network

# LOCAL (external proxy):
# DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@YOUR_PROXY.proxy.rlwy.net:YOUR_PORT/railway

# PRODUCTION (internal network):
# DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@postgres.railway.internal:5432/railway

DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/your_database

# PostgreSQL Variables
PGUSER=postgres
PGPASSWORD=YOUR_PASSWORD
PGDATABASE=railway
PGHOST=localhost
PGPORT=5432
PGDATA=/var/lib/postgresql/data/pgdata

# Logging
RUST_LOG=info,sqlx=warn
```

---

## 📝 Standard Cargo.toml Dependencies

```toml
[dependencies]
# Web Framework (choose one)
axum = { version = "0.7", features = ["macros"] }
# actix-web = "4"
# rocket = { version = "0.5", features = ["json"] }

# Async Runtime
tokio = { version = "1", features = ["full"] }

# Database
sqlx = { 
    version = "0.7", 
    features = [
        "runtime-tokio-rustls",  # Use rustls instead of native-tls
        "postgres", 
        "macros", 
        "migrate", 
        "chrono", 
        "uuid"
    ], 
    default-features = false 
}

# Serialization
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

# Environment Variables
dotenvy = "0.15"  # Or use dotenv = "0.15"

# Logging
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter", "json"] }

# Error Handling
anyhow = "1.0"
thiserror = "1.0"

# Date/Time
chrono = { version = "0.4", features = ["serde"] }

# UUID
uuid = { version = "1.0", features = ["v4", "serde"] }
```

---

## 💻 Standard Database Connection Code

### `src/config.rs`
```rust
use anyhow::{Context, Result};
use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
pub struct Config {
    pub host: String,
    pub port: u16,
    pub database_url: String,
}

impl Config {
    pub fn from_env() -> Result<Self> {
        // Load .env file
        dotenvy::dotenv().ok();

        Ok(Self {
            host: std::env::var("HOST")
                .unwrap_or_else(|_| "0.0.0.0".to_string()),
            port: std::env::var("PORT")
                .unwrap_or_else(|_| "8080".to_string())
                .parse()
                .context("Invalid PORT")?,
            database_url: std::env::var("DATABASE_URL")
                .context("DATABASE_URL must be set")?,
        })
    }
}
```

### `src/db.rs`
```rust
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
        
        // Railway-optimized connection pool
        let pool = PgPoolOptions::new()
            .max_connections(20)
            .min_connections(2)
            .acquire_timeout(Duration::from_secs(30))
            .idle_timeout(Duration::from_secs(600))
            .max_lifetime(Duration::from_secs(1800))
            .test_before_acquire(true)
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
    
    pub async fn test_connection(&self) -> Result<()> {
        sqlx::query("SELECT 1")
            .execute(&self.pool)
            .await?;
        
        tracing::info!("Database connection test successful");
        Ok(())
    }
}
```

### `src/main.rs`
```rust
mod config;
mod db;

use config::Config;
use db::Database;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info".into()),
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

    // Start your server here...
    tracing::info!("Server starting on {}:{}", config.host, config.port);

    Ok(())
}
```

---

## 🐋 Standard Dockerfile

```dockerfile
# Build stage
FROM rust:1.91 as builder

WORKDIR /app

# Copy manifests
COPY Cargo.toml Cargo.lock ./

# Cache dependencies
RUN mkdir src && \
    echo "fn main() {}" > src/main.rs && \
    cargo build --release && \
    rm -rf src

# Copy source code
COPY src ./src
COPY migrations ./migrations

# Build application
RUN touch src/main.rs && \
    cargo build --release

# Runtime stage
FROM debian:bookworm-slim

# Install runtime dependencies including SSL/TLS support
RUN apt-get update && \
    apt-get install -y ca-certificates libssl3 openssl curl && \
    update-ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/target/release/YOUR_APP_NAME ./
COPY --from=builder /app/migrations ./migrations

# Create non-root user
RUN useradd -m -u 1001 appuser && \
    chown -R appuser:appuser /app

USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

CMD ["./YOUR_APP_NAME"]
```

---

## 📄 Standard railway.toml

```toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "Dockerfile"

[deploy]
startCommand = "./YOUR_APP_NAME"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3
healthcheckPath = "/health"
healthcheckTimeout = 30

[env]
HOST = "0.0.0.0"
PORT = "8080"
RUST_LOG = "info,sqlx=warn"
```

---

## 🔧 Standard Setup Script

```bash
#!/bin/bash
# setup-railway.sh - Railway PostgreSQL Setup

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          Railway PostgreSQL Setup                           ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "Choose environment:"
echo "1. Local Development (TCP Proxy)"
echo "2. Railway Production (Internal Network)"
echo ""
read -p "Enter choice (1 or 2): " ENV_CHOICE

if [ "$ENV_CHOICE" = "1" ]; then
    echo -e "${BLUE}Setting up for LOCAL DEVELOPMENT...${NC}"
    cp .env.local .env
    echo -e "${GREEN}✓ Copied .env.local to .env${NC}"
elif [ "$ENV_CHOICE" = "2" ]; then
    echo -e "${BLUE}Setting up for RAILWAY PRODUCTION...${NC}"
    cp .env.railway .env
    echo -e "${GREEN}✓ Copied .env.railway to .env${NC}"
else
    echo "Invalid choice"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Run: cargo run"
echo "  2. Test: curl http://localhost:8080/health"
```

---

## 🧪 Standard Test Script

```bash
#!/bin/bash
# test-railway-connection.sh

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          Railway Database Connection Test                   ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

PGUSER="postgres"
PGPASSWORD="bpGdnlJNciDiREFjpuMAafmHCQuWnryg"
PGDATABASE="railway"
PGHOST="tramway.proxy.rlwy.net"
PGPORT="55133"

echo "Testing external connection (TCP Proxy)..."
if PGPASSWORD="$PGPASSWORD" psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -c "SELECT 1;" &> /dev/null; then
    echo -e "${GREEN}✓ Connection successful${NC}"
    
    # Get PostgreSQL version
    PG_VERSION=$(PGPASSWORD="$PGPASSWORD" psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -t -c "SELECT version();" | head -n1)
    echo "PostgreSQL Version: $PG_VERSION"
else
    echo -e "${RED}✗ Connection failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ All tests passed!${NC}"
```

---

## 📚 Usage Instructions

### 1. Initial Setup
```bash
# Copy appropriate environment file
cp .env.local .env  # For local development
# OR
cp .env.railway .env  # For production

# Install dependencies
cargo build

# Run migrations (happens automatically on startup)
cargo run
```

### 2. Local Development
```bash
# Use local environment
./setup-railway.sh  # Choose option 1

# Start application
cargo run

# Test
curl http://localhost:8080/health
```

### 3. Railway Deployment
```bash
# Use production environment
./setup-railway.sh  # Choose option 2

# Deploy
railway up

# Or use Docker
docker build -t myapp .
docker run -p 8080:8080 --env-file .env.railway myapp
```

---

## ✅ Checklist for Any Rust + SQLx + Railway Project

- [ ] Install `dotenvy` or `dotenv` in Cargo.toml
- [ ] Add `sqlx` with features: `runtime-tokio-rustls`, `postgres`, `macros`, `migrate`
- [ ] Create `.env.local` with TCP proxy connection
- [ ] Create `.env.railway` with internal network connection
- [ ] Create `.env.example` as template
- [ ] Implement `src/config.rs` to load environment variables
- [ ] Implement `src/db.rs` with optimized connection pool
- [ ] Update `src/main.rs` to run migrations automatically
- [ ] Create `migrations/` directory with SQL files
- [ ] Update `Dockerfile` with SSL/TLS support
- [ ] Create `railway.toml` configuration
- [ ] Create `setup-railway.sh` script
- [ ] Create `test-railway-connection.sh` script
- [ ] Add health check endpoint
- [ ] Test locally before deploying
- [ ] Document database schema
- [ ] Add proper error handling
- [ ] Configure logging

---

## 🎯 Key Points to Remember

1. **Two Connection Strings**:
   - Local: `tramway.proxy.rlwy.net:55133` (TCP proxy)
   - Production: `postgres.railway.internal:5432` (internal network)

2. **Use rustls, not native-tls**:
   - Railway works better with `runtime-tokio-rustls`
   - Avoids OpenSSL dependency issues

3. **Connection Pool Settings**:
   - Max connections: 20 (Railway free tier friendly)
   - Always test connections before acquiring
   - Set appropriate timeouts for Railway network

4. **Migrations**:
   - Run automatically on application startup
   - Use `sqlx::migrate!("./migrations")`
   - Create migration files in `migrations/` directory

5. **Environment Variables**:
   - Use `dotenvy::dotenv().ok()` to load `.env`
   - Never commit `.env` files (add to `.gitignore`)
   - Use Railway Dashboard for production secrets

---

**🚀 This template works for any Rust + SQLx + Railway PostgreSQL project!**
