#!/bin/bash
# AutoAssist.ai - Complete Setup Verification Script

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai - Complete Setup Verification                         ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS=0
FAIL=0

check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        PASS=$((PASS + 1))
    else
        echo -e "${RED}✗${NC} $1"
        FAIL=$((FAIL + 1))
    fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. System Dependencies"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

command -v rustc >/dev/null 2>&1
check "Rust installed ($(rustc --version 2>/dev/null | awk '{print $2}'))"

command -v cargo >/dev/null 2>&1
check "Cargo installed ($(cargo --version 2>/dev/null | awk '{print $2}'))"

command -v node >/dev/null 2>&1
check "Node.js installed ($(node --version 2>/dev/null))"

command -v npm >/dev/null 2>&1
check "npm installed ($(npm --version 2>/dev/null))"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. Project Files"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

[ -f "autoassist-api/Cargo.toml" ]
check "Backend Cargo.toml exists"

[ -f "autoassist-api/.env" ]
check "Backend .env exists"

[ -f "autoassist-frontend/package.json" ]
check "Frontend package.json exists"

[ -f "autoassist-frontend/.env" ]
check "Frontend .env exists"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. Backend Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

grep -q "rustls" autoassist-api/Cargo.toml
check "Using rustls (no OpenSSL dependency)"

grep -q "SMTP_HOST" autoassist-api/.env
check "SMTP_HOST configured"

grep -q "SMTP_PORT" autoassist-api/.env
check "SMTP_PORT configured"

grep -q "ADMIN_EMAIL" autoassist-api/.env
check "ADMIN_EMAIL configured"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. Build Status"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "autoassist-api/target/release/autoassist-api" ]; then
    echo -e "${GREEN}✓${NC} Backend built ($(du -h autoassist-api/target/release/autoassist-api | cut -f1))"
    PASS=$((PASS + 1))
else
    echo -e "${YELLOW}⚠${NC} Backend not built yet (run ./build-backend.sh)"
    FAIL=$((FAIL + 1))
fi

if [ -d "autoassist-frontend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
    PASS=$((PASS + 1))
else
    echo -e "${YELLOW}⚠${NC} Frontend dependencies not installed (run: cd autoassist-frontend && npm ci)"
    FAIL=$((FAIL + 1))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. Scripts"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

[ -x "build-backend.sh" ]
check "build-backend.sh executable"

[ -x "run-local-stack.sh" ]
check "run-local-stack.sh executable"

[ -x "validate-deployment.sh" ]
check "validate-deployment.sh executable"

[ -x "autoassist-api/test-email.sh" ]
check "test-email.sh executable"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6. Deployment Files"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

[ -f "autoassist-api/Dockerfile" ]
check "Backend Dockerfile exists"

[ -f "deploy/fly/fly.toml" ]
check "fly.toml exists"

grep -q "internal_port = 8080" deploy/fly/fly.toml
check "Fly.io port configured correctly"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}Passed:${NC} $PASS"
echo -e "${RED}Failed:${NC} $FAIL"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ System is ready!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Build backend: ./build-backend.sh"
    echo "  2. Run locally: ./run-local-stack.sh"
    echo "  3. Test email: cd autoassist-api && ./test-email.sh"
    echo "  4. Deploy: cd autoassist-api && fly deploy"
    exit 0
else
    echo -e "${YELLOW}⚠ Some checks failed. Please fix the issues above.${NC}"
    exit 1
fi
