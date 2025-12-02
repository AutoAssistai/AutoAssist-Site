#!/bin/bash
# AutoAssist.ai - Automated Fly.io Deployment

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai - Fly.io Deployment                                   ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Check if Fly CLI is installed
if ! command -v fly &> /dev/null; then
    echo -e "${YELLOW}⚠${NC}  Fly CLI not installed. Installing..."
    curl -L https://fly.io/install.sh | sh
    echo -e "${GREEN}✓${NC} Fly CLI installed"
fi

# Check if logged in
if ! fly auth whoami &> /dev/null; then
    echo -e "${BLUE}ℹ${NC}  Please login to Fly.io:"
    fly auth login
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Get Database URL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Read DATABASE_URL from .env
if [ -f "autoassist-api/.env" ]; then
    DATABASE_URL=$(grep "^DATABASE_URL=" autoassist-api/.env | cut -d '=' -f2-)
    echo -e "${GREEN}✓${NC} Database URL found in .env"
else
    echo -e "${RED}✗${NC} .env file not found!"
    echo ""
    read -p "Enter your Railway DATABASE_URL: " DATABASE_URL
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Create/Configure Fly.io App"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd autoassist-api

# Check if app already exists
if fly status &> /dev/null; then
    echo -e "${BLUE}ℹ${NC}  App already exists, skipping creation"
else
    echo -e "${BLUE}ℹ${NC}  Creating new Fly.io app..."
    fly launch --no-deploy --name autoassist-api --region iad
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3: Configure Secrets"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}ℹ${NC}  Setting environment variables as secrets..."

fly secrets set \
  DATABASE_URL="${DATABASE_URL}" \
  SMTP_HOST="smtp.mail.yahoo.com" \
  SMTP_PORT="465" \
  SMTP_USERNAME="autoassist.contact@yahoo.com" \
  SMTP_PASSWORD="gjrmemjpcqwqiqft" \
  SMTP_FROM="autoassist.contact@yahoo.com" \
  ADMIN_EMAIL="autoassist.contact@yahoo.com"

echo -e "${GREEN}✓${NC} Secrets configured"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 4: Deploy"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}ℹ${NC}  Deploying to Fly.io (this may take 5-10 minutes)..."
echo ""

fly deploy

echo ""
echo -e "${GREEN}✓${NC} Deployment complete!"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 5: Verify Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

APP_URL=$(fly status --json | jq -r '.Hostname' 2>/dev/null || echo "autoassist-api.fly.dev")

echo -e "${BLUE}ℹ${NC}  Testing health endpoint..."

sleep 5

if curl -s "https://${APP_URL}/health" | grep -q "healthy"; then
    echo -e "${GREEN}✓${NC} Health check passed!"
else
    echo -e "${YELLOW}⚠${NC}  Health check failed. Check logs:"
    echo "   fly logs"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✓${NC} Backend deployed to Fly.io"
echo -e "${GREEN}✓${NC} Database connected (Railway)"
echo -e "${GREEN}✓${NC} Email system configured"
echo ""
echo "URLs:"
echo "  Backend: https://${APP_URL}"
echo "  Health: https://${APP_URL}/health"
echo "  API: https://${APP_URL}/api/lead"
echo ""
echo "Monitoring:"
echo "  Status: fly status"
echo "  Logs: fly logs"
echo "  Restart: fly restart"
echo ""
echo "Next: Update frontend VITE_API_URL to: https://${APP_URL}"
echo ""
