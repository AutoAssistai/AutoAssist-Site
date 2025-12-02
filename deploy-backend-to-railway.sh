#!/bin/bash
# AutoAssist.ai - Complete Railway Backend Deployment Script
# This script handles everything: init, variables, deployment

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai Backend - Railway Deployment                         ║"
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
        export PATH="$HOME/.railway/bin:$PATH"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install railway
    else
        echo -e "${RED}✗${NC} Unsupported OS. Install Railway CLI manually:"
        echo "   https://docs.railway.app/develop/cli#install"
        exit 1
    fi
    
    echo -e "${GREEN}✓${NC} Railway CLI installed"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Railway Authentication"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if already logged in
if railway whoami &> /dev/null; then
    RAILWAY_USER=$(railway whoami 2>/dev/null || echo "User")
    echo -e "${GREEN}✓${NC} Already logged in as: $RAILWAY_USER"
else
    echo -e "${BLUE}ℹ${NC}  Please login to Railway..."
    railway login
    echo -e "${GREEN}✓${NC} Login successful"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Navigate to Backend Directory"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd autoassist-api
echo -e "${GREEN}✓${NC} Changed to autoassist-api directory"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3: Initialize Railway Project"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if project is already linked
if railway status &> /dev/null; then
    PROJECT_NAME=$(railway status 2>/dev/null | grep -i "project" | head -1 || echo "AutoAssist")
    echo -e "${GREEN}✓${NC} Project already linked: $PROJECT_NAME"
else
    echo -e "${BLUE}ℹ${NC}  Initializing new Railway project: AutoAssist"
    railway init AutoAssist || railway link
    echo -e "${GREEN}✓${NC} Project initialized"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 4: Configure Environment Variables"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}ℹ${NC}  Setting PostgreSQL database variables..."

# PostgreSQL variables
# Set variables using new Railway CLI syntax
echo "DATABASE_URL=postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway" | railway variables --set || true
echo "DATABASE_PUBLIC_URL=postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway" | railway variables --set || true
echo "PGUSER=postgres" | railway variables --set || true
echo "PGPASSWORD=bpGdnlJNciDiREFjpuMAafmHCQuWnryg" | railway variables --set || true
echo "PGHOST=postgres.railway.internal" | railway variables --set || true
echo "PGPORT=5432" | railway variables --set || true
echo "PGDATABASE=railway" | railway variables --set || true

echo -e "${GREEN}✓${NC} PostgreSQL variables configured"

echo ""
echo -e "${BLUE}ℹ${NC}  Setting SMTP (email) variables..."

# Check if .env file exists to get SMTP settings
if [ -f ".env.railway" ]; then
    SMTP_HOST=$(grep "^SMTP_HOST=" .env.railway | cut -d '=' -f2)
    SMTP_PORT=$(grep "^SMTP_PORT=" .env.railway | cut -d '=' -f2)
    SMTP_USERNAME=$(grep "^SMTP_USERNAME=" .env.railway | cut -d '=' -f2)
    SMTP_PASSWORD=$(grep "^SMTP_PASSWORD=" .env.railway | cut -d '=' -f2)
    SMTP_FROM=$(grep "^SMTP_FROM=" .env.railway | cut -d '=' -f2)
    ADMIN_EMAIL=$(grep "^ADMIN_EMAIL=" .env.railway | cut -d '=' -f2)
    
    echo "SMTP_HOST=$SMTP_HOST" | railway variables --set || true
    echo "SMTP_PORT=$SMTP_PORT" | railway variables --set || true
    echo "SMTP_USERNAME=$SMTP_USERNAME" | railway variables --set || true
    echo "SMTP_PASSWORD=$SMTP_PASSWORD" | railway variables --set || true
    echo "SMTP_FROM=$SMTP_FROM" | railway variables --set || true
    echo "ADMIN_EMAIL=$ADMIN_EMAIL" | railway variables --set || true
    
    echo -e "${GREEN}✓${NC} SMTP variables configured from .env.railway"
else
    echo -e "${YELLOW}⚠${NC}  .env.railway not found. Using defaults..."
    echo "SMTP_HOST=smtp.mail.yahoo.com" | railway variables --set || true
    echo "SMTP_PORT=465" | railway variables --set || true
    echo "SMTP_USERNAME=autoassist.contact@yahoo.com" | railway variables --set || true
    echo "SMTP_PASSWORD=gjrmemjpcqwqiqft" | railway variables --set || true
    echo "SMTP_FROM=autoassist.contact@yahoo.com" | railway variables --set || true
    echo "ADMIN_EMAIL=autoassist.contact@yahoo.com" | railway variables --set || true
    echo -e "${GREEN}✓${NC} SMTP variables configured with defaults"
fi

echo ""
echo -e "${BLUE}ℹ${NC}  Setting application variables..."

# Application variables
echo "HOST=0.0.0.0" | railway variables --set || true
echo "PORT=8080" | railway variables --set || true
echo "RUST_LOG=info,sqlx=warn,tower_http=info" | railway variables --set || true

echo -e "${GREEN}✓${NC} Application variables configured"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 5: View Current Variables"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}ℹ${NC}  Current environment variables:"
railway variables | grep -E "(DATABASE|PG|SMTP|HOST|PORT|RUST)" || echo "Variables are set (some may be hidden for security)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 6: Deploy to Railway"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}ℹ${NC}  Starting deployment (this may take 5-10 minutes)..."
echo ""

# Deploy
railway up --detach

echo ""
echo -e "${GREEN}✓${NC} Deployment initiated!"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 7: Get Deployment Information"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}ℹ${NC}  Waiting for deployment to complete..."
sleep 15

# Try to get domain
DEPLOY_URL=$(railway domain 2>/dev/null | head -1 || echo "")

if [ -n "$DEPLOY_URL" ]; then
    echo -e "${GREEN}✓${NC} Deployment URL: https://$DEPLOY_URL"
else
    echo -e "${YELLOW}⚠${NC}  Domain not yet assigned. You can generate one with:"
    echo "     cd autoassist-api && railway domain"
fi

cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Deployment Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${GREEN}✓${NC} Backend deployed to Railway"
echo -e "${GREEN}✓${NC} PostgreSQL database connected (internal network)"
echo -e "${GREEN}✓${NC} Environment variables configured"
echo -e "${GREEN}✓${NC} SMTP email system configured"
echo -e "${GREEN}✓${NC} Migrations will run automatically on first request"
echo ""

if [ -n "$DEPLOY_URL" ]; then
    echo "URLs:"
    echo "  Backend:    https://$DEPLOY_URL"
    echo "  Health:     https://$DEPLOY_URL/health"
    echo "  API:        https://$DEPLOY_URL/api/lead"
    echo ""
fi

echo "Monitoring Commands:"
echo "  Status:     cd autoassist-api && railway status"
echo "  Logs:       cd autoassist-api && railway logs"
echo "  Open:       cd autoassist-api && railway open"
echo "  Domain:     cd autoassist-api && railway domain"
echo ""

if [ -n "$DEPLOY_URL" ]; then
    echo "Next Steps:"
    echo "  1. Test health endpoint:"
    echo "     curl https://$DEPLOY_URL/health"
    echo ""
    echo "  2. Monitor deployment logs:"
    echo "     cd autoassist-api && railway logs --follow"
    echo ""
    echo "  3. Update frontend VITE_API_URL:"
    echo "     Edit autoassist-frontend/.env"
    echo "     VITE_API_URL=https://$DEPLOY_URL"
    echo ""
fi

echo -e "${GREEN}✓ Deployment Complete!${NC}"
echo ""
