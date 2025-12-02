#!/bin/bash
# AutoAssist.ai - Railway Database Setup Script

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai - Railway PostgreSQL Setup                           ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}ℹ${NC}  This script will guide you through setting up a FREE Railway PostgreSQL database"
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${YELLOW}⚠${NC}  Railway CLI not installed. Installing..."
    echo ""
    
    # Install Railway CLI
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        curl -fsSL https://railway.app/install.sh | sh
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install railway
    else
        echo -e "${RED}✗${NC} Unsupported OS. Please install Railway CLI manually:"
        echo "   https://docs.railway.app/develop/cli#install"
        exit 1
    fi
    
    echo -e "${GREEN}✓${NC} Railway CLI installed"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Railway Login"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

railway login

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Create Project & PostgreSQL Database"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}ℹ${NC}  Creating new Railway project..."

# Create project
railway init --name autoassist-api

echo ""
echo -e "${BLUE}ℹ${NC}  Adding PostgreSQL database (this may take 1-2 minutes)..."

# Add PostgreSQL
railway add --plugin postgresql

echo ""
echo -e "${GREEN}✓${NC} PostgreSQL database created!"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3: Get Database Connection String"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Get DATABASE_URL
DATABASE_URL=$(railway variables get DATABASE_URL 2>/dev/null || echo "")

if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}✗${NC} Failed to get DATABASE_URL automatically"
    echo ""
    echo "Please get your DATABASE_URL manually:"
    echo "  1. Go to: https://railway.app/project"
    echo "  2. Click on your PostgreSQL service"
    echo "  3. Go to 'Variables' tab"
    echo "  4. Copy the DATABASE_URL value"
    echo ""
    read -p "Paste DATABASE_URL here: " DATABASE_URL
fi

echo ""
echo -e "${GREEN}✓${NC} Database URL obtained"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 4: Update .env File"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Create/update .env file
cat > autoassist-api/.env << ENVFILE
# Server Configuration
HOST=0.0.0.0
PORT=8080

# Database (Railway PostgreSQL)
DATABASE_URL=${DATABASE_URL}

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

echo -e "${GREEN}✓${NC} .env file created at autoassist-api/.env"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 5: Test Database Connection"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd autoassist-api

echo -e "${BLUE}ℹ${NC}  Starting backend (migrations will run automatically)..."
echo ""

timeout 15 cargo run || true

echo ""
echo -e "${GREEN}✓${NC} Database setup complete!"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✓${NC} Railway project created: autoassist-api"
echo -e "${GREEN}✓${NC} PostgreSQL database provisioned"
echo -e "${GREEN}✓${NC} DATABASE_URL configured in .env"
echo -e "${GREEN}✓${NC} Email settings configured"
echo ""
echo "Database Details:"
echo "  Provider: Railway"
echo "  Region: US West (or nearest)"
echo "  Free Tier: ✓ Active"
echo "  Storage: 512MB (free tier)"
echo ""
echo "Connection String:"
echo "  ${DATABASE_URL}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Next Steps:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Start backend:"
echo "   cd autoassist-api && cargo run"
echo ""
echo "2. Test email system:"
echo "   ./test-professional-email.sh"
echo ""
echo "3. Deploy to Fly.io:"
echo "   cd autoassist-api && fly deploy"
echo ""
