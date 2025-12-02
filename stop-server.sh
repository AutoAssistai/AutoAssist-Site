#!/bin/bash
# Stop AutoAssist.ai Backend Server

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai - Stop Server                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

echo -e "${BLUE}ℹ${NC}  Checking for running server..."

if lsof -ti:8080 > /dev/null 2>&1; then
    echo -e "${BLUE}ℹ${NC}  Stopping server on port 8080..."
    
    # Try graceful shutdown first
    pkill -f autoassist-api
    sleep 2
    
    # Force kill if still running
    if lsof -ti:8080 > /dev/null 2>&1; then
        echo -e "${BLUE}ℹ${NC}  Force stopping..."
        lsof -ti:8080 | xargs kill -9 2>/dev/null || true
        sleep 1
    fi
    
    echo -e "${GREEN}✓${NC} Server stopped successfully"
else
    echo -e "${GREEN}✓${NC} No server running on port 8080"
fi

echo ""
echo -e "${GREEN}✓ Done!${NC}"
