#!/bin/bash
# Verification script to ensure everything is ready

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai - Installation Verification                          ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

PASS=0
FAIL=0

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $1 - MISSING"
        ((FAIL++))
    fi
}

check_executable() {
    if [ -x "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 (executable)"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $1 - NOT EXECUTABLE"
        ((FAIL++))
    fi
}

echo "Checking Configuration Files..."
check_file "autoassist-api/.env"
check_file "autoassist-api/.env.example"
check_file "autoassist-api/.env.local"
check_file "autoassist-api/.env.railway"
echo ""

echo "Checking Scripts..."
check_executable "setup-railway-connection.sh"
check_executable "test-railway-connection.sh"
check_executable "deploy-to-railway.sh"
echo ""

echo "Checking Deployment Files..."
check_file "railway.toml"
check_file "railway.json"
echo ""

echo "Checking Documentation..."
check_file "RAILWAY_SETUP_COMPLETE.md"
check_file "COMPLETE_RAILWAY_INTEGRATION.md"
check_file "START_HERE_RAILWAY.md"
check_file "FINAL_DELIVERY_SUMMARY.md"
check_file "QUICK_REFERENCE.md"
check_file "autoassist-api/README_RAILWAY.md"
echo ""

echo "Checking Source Code Updates..."
check_file "autoassist-api/src/db.rs"
check_file "autoassist-api/Dockerfile"
check_file "autoassist-api/migrations/001_create_leads_table.sql"
echo ""

echo "Checking DATABASE_URL in .env..."
if grep -q "DATABASE_URL=postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg" autoassist-api/.env; then
    echo -e "${GREEN}✓${NC} DATABASE_URL configured correctly"
    ((PASS++))
else
    echo -e "${RED}✗${NC} DATABASE_URL not configured"
    ((FAIL++))
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Results:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "Passed: ${GREEN}$PASS${NC}"
echo -e "Failed: ${RED}$FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Installation is complete.${NC}"
    echo ""
    echo "Next Steps:"
    echo "  1. Run: ./setup-railway-connection.sh"
    echo "  2. Or read: START_HERE_RAILWAY.md"
    exit 0
else
    echo -e "${RED}✗ Some checks failed. Please review the output above.${NC}"
    exit 1
fi
