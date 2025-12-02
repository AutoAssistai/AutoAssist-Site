#!/bin/bash
# Quick fix and run script for AutoAssist.ai backend

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai - Fix & Run                          ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

cd autoassist-api

echo -e "${BLUE}ℹ${NC}  Step 1: Ensuring correct .env file..."
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠${NC}  .env.local not found!"
    exit 1
fi

cp .env.local .env
echo -e "${GREEN}✓${NC} Copied .env.local to .env"

echo ""
echo -e "${BLUE}ℹ${NC}  Step 2: Verifying DATABASE_URL..."
DATABASE_URL=$(grep "^DATABASE_URL=" .env | cut -d '=' -f2)
echo "   $DATABASE_URL"

if [[ "$DATABASE_URL" == *"postgres.railway.internal"* ]]; then
    echo -e "${YELLOW}⚠${NC}  Wrong DATABASE_URL! Using internal host."
    echo -e "${YELLOW}⚠${NC}  Fixing..."
    cp .env.local .env
    echo -e "${GREEN}✓${NC} Fixed!"
fi

echo ""
echo -e "${BLUE}ℹ${NC}  Step 3: Starting server..."
echo ""

cargo run
