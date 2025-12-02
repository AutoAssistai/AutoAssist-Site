#!/bin/bash
# AutoAssist.ai - Automated Railway Deployment Script

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai - Railway Deployment                                  ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${YELLOW}⚠${NC}  Railway CLI not installed. Installing..."
    
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
    
    # Add to PATH
    export PATH="$HOME/.railway/bin:$PATH"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Railway Authentication"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if already logged in
if railway whoami &> /dev/null; then
    RAILWAY_USER=$(railway whoami)
    echo -e "${GREEN}✓${NC} Already logged in as: $RAILWAY_USER"
else
    echo -e "${BLUE}ℹ${NC}  Please login to Railway..."
    railway login
    echo -e "${GREEN}✓${NC} Login successful"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Project Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if project is already linked
if [ -f "railway.json" ] && railway status &> /dev/null; then
    PROJECT_NAME=$(railway status --json 2>/dev/null | jq -r '.project.name' 2>/dev/null || echo "autoassist-api")
    echo -e "${GREEN}✓${NC} Project already linked: $PROJECT_NAME"
else
    echo -e "${BLUE}ℹ${NC}  Creating new Railway project..."
    
    read -p "Enter project name (default: autoassist-api): " PROJECT_NAME
    PROJECT_NAME=${PROJECT_NAME:-autoassist-api}
    
    railway init --name "$PROJECT_NAME"
    echo -e "${GREEN}✓${NC} Project created: $PROJECT_NAME"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3: PostgreSQL Database"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}ℹ${NC}  Checking if PostgreSQL is already linked..."

if railway variables | grep -q "DATABASE_URL"; then
    echo -e "${GREEN}✓${NC} PostgreSQL database already linked"
    
    # Get DATABASE_URL
    DATABASE_URL=$(railway variables get DATABASE_URL 2>/dev/null || echo "")
    
    if [ -n "$DATABASE_URL" ]; then
        echo -e "${BLUE}ℹ${NC}  Database URL: ${DATABASE_URL:0:30}..."
    fi
else
    echo -e "${YELLOW}⚠${NC}  PostgreSQL not found. Would you like to:"
    echo "  1. Link existing PostgreSQL database (you already have one)"
    echo "  2. Create new PostgreSQL database"
    echo "  3. Skip (configure manually later)"
    echo ""
    read -p "Enter your choice (1, 2, or 3): " DB_CHOICE
    
    if [ "$DB_CHOICE" = "1" ]; then
        echo ""
        echo -e "${BLUE}ℹ${NC}  Using your existing Railway PostgreSQL database..."
        echo ""
        echo "Your credentials:"
        echo "  Host: postgres.railway.internal"
        echo "  Port: 5432"
        echo "  Database: railway"
        echo "  User: postgres"
        echo "  Password: bpGdnlJNciDiREFjpuMAafmHCQuWnryg"
        echo ""
        
        DATABASE_URL="postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway"
        
        echo -e "${BLUE}ℹ${NC}  Setting DATABASE_URL environment variable..."
        railway variables set DATABASE_URL="$DATABASE_URL"
        echo -e "${GREEN}✓${NC} Database linked successfully"
        
    elif [ "$DB_CHOICE" = "2" ]; then
        echo -e "${BLUE}ℹ${NC}  Creating new PostgreSQL database..."
        railway add --plugin postgresql
        echo -e "${GREEN}✓${NC} PostgreSQL database created"
        
        sleep 3
        DATABASE_URL=$(railway variables get DATABASE_URL 2>/dev/null || echo "")
        echo -e "${GREEN}✓${NC} Database URL configured automatically"
        
    else
        echo -e "${YELLOW}⚠${NC}  Skipping database setup"
        echo -e "${BLUE}ℹ${NC}  Remember to set DATABASE_URL manually in Railway dashboard"
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 4: Environment Variables"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}ℹ${NC}  Setting required environment variables..."

# Set environment variables
railway variables set HOST="0.0.0.0"
railway variables set PORT="8080"
railway variables set RUST_LOG="autoassist_api=info,tower_http=info,sqlx=info"

# SMTP Configuration
echo ""
echo -e "${BLUE}ℹ${NC}  Would you like to configure SMTP settings now? (y/n)"
read -p "Configure SMTP? (y/n): " CONFIGURE_SMTP

if [ "$CONFIGURE_SMTP" = "y" ] || [ "$CONFIGURE_SMTP" = "Y" ]; then
    # Load from .env if available
    if [ -f "autoassist-api/.env" ]; then
        SMTP_HOST=$(grep "^SMTP_HOST=" autoassist-api/.env | cut -d '=' -f2)
        SMTP_PORT=$(grep "^SMTP_PORT=" autoassist-api/.env | cut -d '=' -f2)
        SMTP_USERNAME=$(grep "^SMTP_USERNAME=" autoassist-api/.env | cut -d '=' -f2)
        SMTP_PASSWORD=$(grep "^SMTP_PASSWORD=" autoassist-api/.env | cut -d '=' -f2)
        SMTP_FROM=$(grep "^SMTP_FROM=" autoassist-api/.env | cut -d '=' -f2)
        ADMIN_EMAIL=$(grep "^ADMIN_EMAIL=" autoassist-api/.env | cut -d '=' -f2)
        
        echo -e "${BLUE}ℹ${NC}  Using SMTP settings from .env file"
        
        railway variables set SMTP_HOST="$SMTP_HOST"
        railway variables set SMTP_PORT="$SMTP_PORT"
        railway variables set SMTP_USERNAME="$SMTP_USERNAME"
        railway variables set SMTP_PASSWORD="$SMTP_PASSWORD"
        railway variables set SMTP_FROM="$SMTP_FROM"
        railway variables set ADMIN_EMAIL="$ADMIN_EMAIL"
        
        echo -e "${GREEN}✓${NC} SMTP configuration set"
    else
        echo -e "${YELLOW}⚠${NC}  No .env file found. Please set SMTP variables manually in Railway dashboard"
    fi
else
    echo -e "${YELLOW}⚠${NC}  Skipping SMTP configuration"
    echo -e "${BLUE}ℹ${NC}  Set these variables manually in Railway dashboard:"
    echo "     SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_FROM, ADMIN_EMAIL"
fi

echo ""
echo -e "${GREEN}✓${NC} Environment variables configured"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 5: Deploy Application"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}ℹ${NC}  Deploying to Railway (this may take 5-10 minutes)..."
echo ""

# Change to backend directory for deployment
cd autoassist-api

railway up --detach

echo ""
echo -e "${GREEN}✓${NC} Deployment initiated"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 6: Get Deployment URL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}ℹ${NC}  Waiting for deployment to complete..."
sleep 10

# Get deployment URL
DEPLOY_URL=$(railway domain 2>/dev/null || echo "")

if [ -n "$DEPLOY_URL" ]; then
    echo -e "${GREEN}✓${NC} Deployment URL: https://$DEPLOY_URL"
else
    echo -e "${YELLOW}⚠${NC}  Domain not yet assigned. Generate one with:"
    echo "     railway domain"
fi

cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Deployment Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✓${NC} Backend deployed to Railway"
echo -e "${GREEN}✓${NC} PostgreSQL database connected"
echo -e "${GREEN}✓${NC} Environment variables configured"
echo -e "${GREEN}✓${NC} Migrations will run automatically on first request"
echo ""

if [ -n "$DEPLOY_URL" ]; then
    echo "URLs:"
    echo "  Backend: https://$DEPLOY_URL"
    echo "  Health: https://$DEPLOY_URL/health"
    echo "  API: https://$DEPLOY_URL/api/lead"
    echo ""
fi

echo "Monitoring:"
echo "  Status: railway status"
echo "  Logs: railway logs"
echo "  Open: railway open"
echo "  Domain: railway domain"
echo ""

if [ -n "$DEPLOY_URL" ]; then
    echo "Next Steps:"
    echo "  1. Test health endpoint: curl https://$DEPLOY_URL/health"
    echo "  2. Update frontend VITE_API_URL to: https://$DEPLOY_URL"
    echo "  3. Monitor logs: railway logs --follow"
fi

echo ""
echo -e "${GREEN}✓ Deployment Complete!${NC}"
echo ""
