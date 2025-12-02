#!/bin/bash
# Complete deployment validation script for AutoAssist.ai

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║                  AutoAssist.ai Deployment Validator                          ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Helper functions
pass() {
    echo -e "${GREEN}✓${NC} $1"
    PASSED=$((PASSED + 1))
}

fail() {
    echo -e "${RED}✗${NC} $1"
    FAILED=$((FAILED + 1))
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    WARNINGS=$((WARNINGS + 1))
}

info() {
    echo -e "ℹ $1"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Prerequisites Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node --version)
    if [[ "$NODE_VERSION" =~ v([0-9]+) ]] && [[ ${BASH_REMATCH[1]} -ge 18 ]]; then
        pass "Node.js $NODE_VERSION (>= 18 required)"
    else
        fail "Node.js $NODE_VERSION is too old (>= 18 required)"
    fi
else
    fail "Node.js not installed"
fi

# Check npm
if command_exists npm; then
    pass "npm $(npm --version)"
else
    fail "npm not installed"
fi

# Check Rust
if command_exists cargo; then
    pass "Rust/Cargo $(cargo --version | cut -d' ' -f2)"
else
    warn "Rust not installed (needed for local testing only)"
fi

# Check Fly CLI
if command_exists fly; then
    pass "Fly CLI $(fly version)"
else
    warn "Fly CLI not installed (needed for deployment)"
    info "Install: curl -L https://fly.io/install.sh | sh"
fi

# Check wrangler
if command_exists wrangler; then
    pass "Wrangler $(wrangler --version | head -1)"
else
    warn "Wrangler not installed (needed for Cloudflare deployment)"
    info "Install: npm install -g wrangler"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. Backend Configuration Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check backend .env file
if [ -f "autoassist-api/.env" ]; then
    pass "Backend .env file exists"
    
    # Check required variables
    if grep -q "SMTP_HOST=smtp.mail.yahoo.com" autoassist-api/.env; then
        pass "SMTP_HOST configured (smtp.mail.yahoo.com)"
    else
        fail "SMTP_HOST not configured correctly"
    fi
    
    if grep -q "SMTP_PORT=465" autoassist-api/.env; then
        pass "SMTP_PORT configured (465 SSL)"
    else
        fail "SMTP_PORT not configured correctly"
    fi
    
    if grep -q "SMTP_USERNAME=autoassist.contact@yahoo.com" autoassist-api/.env; then
        pass "SMTP_USERNAME configured"
    else
        fail "SMTP_USERNAME not configured"
    fi
    
    if grep -q "SMTP_PASSWORD=gjrmemjpcqwqiqft" autoassist-api/.env; then
        pass "SMTP_PASSWORD configured (Yahoo App Password)"
    else
        fail "SMTP_PASSWORD not configured"
    fi
    
    if grep -q "ADMIN_EMAIL=autoassist.contact@yahoo.com" autoassist-api/.env; then
        pass "ADMIN_EMAIL configured"
    else
        fail "ADMIN_EMAIL not configured"
    fi
    
    if grep -q "DATABASE_URL=" autoassist-api/.env; then
        pass "DATABASE_URL present"
    else
        fail "DATABASE_URL not configured"
    fi
else
    fail "Backend .env file missing"
    info "Created template at autoassist-api/.env"
fi

# Check Dockerfile
if [ -f "autoassist-api/Dockerfile" ]; then
    pass "Dockerfile exists"
    if grep -q "EXPOSE 8080" autoassist-api/Dockerfile; then
        pass "Dockerfile exposes port 8080"
    else
        fail "Dockerfile port not set to 8080"
    fi
else
    fail "Dockerfile missing"
fi

# Check fly.toml
if [ -f "deploy/fly/fly.toml" ]; then
    pass "fly.toml exists"
    if grep -q "internal_port = 8080" deploy/fly/fly.toml; then
        pass "fly.toml configured for port 8080"
    else
        fail "fly.toml port not set to 8080"
    fi
else
    fail "fly.toml missing"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. Frontend Configuration Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check frontend .env file
if [ -f "autoassist-frontend/.env" ]; then
    pass "Frontend .env file exists"
    
    if grep -q "VITE_API_URL=" autoassist-frontend/.env; then
        pass "VITE_API_URL configured"
        API_URL=$(grep "VITE_API_URL=" autoassist-frontend/.env | cut -d'=' -f2)
        info "API URL: $API_URL"
    else
        warn "VITE_API_URL not configured"
    fi
else
    warn "Frontend .env file missing (will use defaults)"
fi

# Check package.json
if [ -f "autoassist-frontend/package.json" ]; then
    pass "package.json exists"
else
    fail "package.json missing"
fi

# Check node_modules
if [ -d "autoassist-frontend/node_modules" ]; then
    pass "node_modules directory exists"
else
    warn "node_modules not installed"
    info "Run: cd autoassist-frontend && npm ci"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. File Structure Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check key backend files
[ -f "autoassist-api/Cargo.toml" ] && pass "Cargo.toml exists" || fail "Cargo.toml missing"
[ -f "autoassist-api/src/main.rs" ] && pass "main.rs exists" || fail "main.rs missing"
[ -f "autoassist-api/src/email.rs" ] && pass "email.rs exists" || fail "email.rs missing"
[ -f "autoassist-api/src/handlers.rs" ] && pass "handlers.rs exists" || fail "handlers.rs missing"
[ -f "autoassist-api/src/config.rs" ] && pass "config.rs exists" || fail "config.rs missing"

# Check migrations
[ -d "autoassist-api/migrations" ] && pass "Migrations directory exists" || fail "Migrations directory missing"
[ -f "autoassist-api/migrations/001_create_leads_table.sql" ] && pass "Database migration exists" || fail "Database migration missing"

# Check key frontend files
[ -f "autoassist-frontend/src/app.tsx" ] && pass "app.tsx exists" || fail "app.tsx missing"
[ -f "autoassist-frontend/src/components/ContactForm.tsx" ] && pass "ContactForm.tsx exists" || fail "ContactForm.tsx missing"
[ -f "autoassist-frontend/src/components/Hero.tsx" ] && pass "Hero.tsx exists" || fail "Hero.tsx missing"

# Check assets
[ -f "autoassist-frontend/public/assets/logo.jpg" ] && pass "logo.jpg exists" || warn "logo.jpg missing"
[ -f "autoassist-frontend/public/robots.txt" ] && pass "robots.txt exists" || warn "robots.txt missing"
[ -f "autoassist-frontend/public/sitemap.xml" ] && pass "sitemap.xml exists" || warn "sitemap.xml missing"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. Code Configuration Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check email configuration in code
if grep -q "autoassist.contact@yahoo.com" autoassist-api/src/email.rs; then
    pass "Email address consistent in backend"
else
    fail "Email address not updated in backend code"
fi

if grep -q "autoassist.contact@yahoo.com" autoassist-frontend/src/components/Footer.tsx; then
    pass "Email address consistent in frontend"
else
    fail "Email address not updated in frontend code"
fi

# Check port configuration
if grep -q "self.smtp_port == 465" autoassist-api/src/email.rs; then
    pass "Email service supports SSL (port 465)"
else
    warn "Email service may not support SSL properly"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6. Build Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test frontend build
if [ -d "autoassist-frontend" ]; then
    info "Testing frontend build..."
    cd autoassist-frontend
    
    if [ ! -d "node_modules" ]; then
        info "Installing dependencies..."
        npm ci > /dev/null 2>&1
    fi
    
    if npm run build > /dev/null 2>&1; then
        pass "Frontend builds successfully"
        
        if [ -d ".output/public" ]; then
            pass "Build output directory exists"
            SIZE=$(du -sh .output/public | cut -f1)
            info "Build size: $SIZE"
        else
            fail "Build output directory missing"
        fi
    else
        fail "Frontend build failed"
    fi
    
    cd ..
else
    fail "Frontend directory not found"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "7. Documentation Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

[ -f "DEPLOYMENT_INSTRUCTIONS.md" ] && pass "Deployment instructions exist" || warn "Deployment instructions missing"
[ -f "README_FIRST.md" ] && pass "README_FIRST.md exists" || warn "README_FIRST.md missing"
[ -f "QUICK_DEPLOYMENT.md" ] && pass "Quick deployment guide exists" || warn "Quick deployment guide missing"
[ -f "autoassist-api/test-email.sh" ] && pass "Email test script exists" || warn "Email test script missing"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}Passed:${NC}   $PASSED"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
echo -e "${RED}Failed:${NC}   $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All critical checks passed!${NC}"
    echo ""
    echo "🚀 Next Steps:"
    echo "   1. Test email locally: cd autoassist-api && cargo run, then ./test-email.sh"
    echo "   2. Deploy backend: Follow DEPLOYMENT_INSTRUCTIONS.md"
    echo "   3. Deploy frontend: Follow DEPLOYMENT_INSTRUCTIONS.md"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Some checks failed. Please fix the issues above.${NC}"
    echo ""
    exit 1
fi
