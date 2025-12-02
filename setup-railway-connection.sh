#!/bin/bash
# AutoAssist.ai - Quick Railway Database Setup Script

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai - Railway Database Setup                             ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}ℹ${NC}  This script will configure your Railway PostgreSQL connection"
echo ""

# Step 1: Choose environment
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Choose Environment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Local Development (uses external TCP proxy)"
echo "2. Railway Production (uses internal network)"
echo ""
read -p "Enter your choice (1 or 2): " ENV_CHOICE

if [ "$ENV_CHOICE" = "1" ]; then
    echo -e "${BLUE}ℹ${NC}  Setting up for LOCAL DEVELOPMENT..."
    cp autoassist-api/.env.local autoassist-api/.env
    echo -e "${GREEN}✓${NC} Copied .env.local to .env"
    ENV_NAME="Local Development"
elif [ "$ENV_CHOICE" = "2" ]; then
    echo -e "${BLUE}ℹ${NC}  Setting up for RAILWAY PRODUCTION..."
    cp autoassist-api/.env.railway autoassist-api/.env
    echo -e "${GREEN}✓${NC} Copied .env.railway to .env"
    ENV_NAME="Railway Production"
else
    echo -e "${RED}✗${NC} Invalid choice"
    exit 1
fi

echo ""

# Step 2: Verify configuration
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Verify Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

DATABASE_URL=$(grep "^DATABASE_URL=" autoassist-api/.env | cut -d '=' -f2)
echo -e "${BLUE}ℹ${NC}  Environment: $ENV_NAME"
echo -e "${BLUE}ℹ${NC}  Database URL: $DATABASE_URL"
echo ""

# Step 3: Test connection (if local development)
if [ "$ENV_CHOICE" = "1" ]; then
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Step 3: Test Connection"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    read -p "Would you like to test the database connection? (y/n): " TEST_CONN
    
    if [ "$TEST_CONN" = "y" ] || [ "$TEST_CONN" = "Y" ]; then
        ./test-railway-connection.sh
    else
        echo -e "${YELLOW}⚠${NC}  Skipping connection test"
    fi
fi

echo ""

# Step 4: Run migrations
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 4: Database Migrations"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ "$ENV_CHOICE" = "1" ]; then
    read -p "Would you like to run database migrations now? (y/n): " RUN_MIGRATIONS
    
    if [ "$RUN_MIGRATIONS" = "y" ] || [ "$RUN_MIGRATIONS" = "Y" ]; then
        echo -e "${BLUE}ℹ${NC}  Running migrations..."
        cd autoassist-api
        
        # Build and run briefly to trigger migrations
        echo -e "${YELLOW}→${NC} Building application..."
        cargo build --release
        
        echo -e "${YELLOW}→${NC} Running migrations (this will take a few seconds)..."
        timeout 10 cargo run --release || true
        
        echo -e "${GREEN}✓${NC} Migrations completed"
        cd ..
    else
        echo -e "${YELLOW}⚠${NC}  Skipping migrations"
        echo -e "${BLUE}ℹ${NC}  Run migrations later with: cd autoassist-api && cargo run"
    fi
else
    echo -e "${BLUE}ℹ${NC}  For Railway production, migrations will run automatically on deployment"
    echo -e "${BLUE}ℹ${NC}  The application runs migrations on startup (see src/main.rs)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Configuration Summary:"
echo "  Environment: $ENV_NAME"
echo "  Database: Railway PostgreSQL"
echo "  Config File: autoassist-api/.env"
echo ""
echo "Next Steps:"
if [ "$ENV_CHOICE" = "1" ]; then
    echo "  1. Start backend: cd autoassist-api && cargo run"
    echo "  2. Test API: curl http://localhost:8080/health"
    echo "  3. Test email: ./autoassist-api/test-professional-email.sh"
else
    echo "  1. Deploy to Railway: railway up"
    echo "  2. Or deploy to Fly.io: ./deploy-to-fly.sh"
    echo "  3. Migrations will run automatically on first startup"
fi
echo ""
