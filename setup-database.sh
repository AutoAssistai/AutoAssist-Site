#!/bin/bash
# Quick Database Setup for AutoAssist.ai

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai - Database Setup                                      ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}✗${NC} PostgreSQL not installed"
    echo ""
    echo "Installing PostgreSQL..."
    sudo apt-get update
    sudo apt-get install -y postgresql postgresql-contrib
    echo -e "${GREEN}✓${NC} PostgreSQL installed"
fi

# Start PostgreSQL service
echo -e "${YELLOW}→${NC} Starting PostgreSQL service..."
sudo systemctl start postgresql
sudo systemctl enable postgresql
echo -e "${GREEN}✓${NC} PostgreSQL started"

# Create database and user
echo -e "${YELLOW}→${NC} Creating database and user..."

sudo -u postgres psql << 'EOF'
-- Create user if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'autoassist') THEN
        CREATE USER autoassist WITH PASSWORD 'autoassist_dev_password';
    END IF;
END
$$;

-- Create database if not exists
SELECT 'CREATE DATABASE autoassist'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'autoassist')\gexec

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE autoassist TO autoassist;
ALTER DATABASE autoassist OWNER TO autoassist;
EOF

echo -e "${GREEN}✓${NC} Database created"
echo ""

# Update .env file
echo -e "${YELLOW}→${NC} Updating .env file..."

cat > autoassist-api/.env << 'ENVFILE'
# Server Configuration
HOST=0.0.0.0
PORT=8080

# Database (Local PostgreSQL)
DATABASE_URL=postgresql://autoassist:autoassist_dev_password@localhost:5432/autoassist

# SMTP Configuration (Yahoo Mail)
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=465
SMTP_USERNAME=autoassist.contact@yahoo.com
SMTP_PASSWORD=gjrmemjpcqwqiqft
SMTP_FROM=autoassist.contact@yahoo.com
ADMIN_EMAIL=autoassist.contact@yahoo.com

# Logging
RUST_LOG=autoassist_api=info,tower_http=info
ENVFILE

echo -e "${GREEN}✓${NC} .env file updated"
echo ""

# Run migrations
echo -e "${YELLOW}→${NC} Running database migrations..."
cd autoassist-api
cargo run &
SERVER_PID=$!

# Wait for migrations to run
sleep 5

# Stop the server
kill $SERVER_PID 2>/dev/null || true

echo ""
echo -e "${GREEN}✓${NC} Database setup complete!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Database Configuration:"
echo "  Host: localhost"
echo "  Port: 5432"
echo "  Database: autoassist"
echo "  User: autoassist"
echo "  Password: autoassist_dev_password"
echo ""
echo "Connection String:"
echo "  postgresql://autoassist:autoassist_dev_password@localhost:5432/autoassist"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "  1. Start backend: cd autoassist-api && cargo run"
echo "  2. Test emails: ./test-professional-email.sh"
echo ""
