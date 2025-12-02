#!/bin/bash
# Start AutoAssist.ai Backend Server

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai - Start Server                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Kill any existing server
echo -e "${BLUE}ℹ${NC}  Checking for existing server..."
if lsof -ti:8080 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠${NC}  Port 8080 is in use. Stopping existing server..."
    pkill -f autoassist-api || lsof -ti:8080 | xargs kill -9 2>/dev/null || true
    sleep 2
    echo -e "${GREEN}✓${NC} Stopped existing server"
else
    echo -e "${GREEN}✓${NC} Port 8080 is free"
fi

# Ensure correct .env
cd autoassist-api
echo ""
echo -e "${BLUE}ℹ${NC}  Ensuring correct .env configuration..."
cp .env.local .env
echo -e "${GREEN}✓${NC} Using .env.local (TCP proxy for local development)"

# Start server
echo ""
echo -e "${BLUE}ℹ${NC}  Starting server..."
echo ""

cargo run
