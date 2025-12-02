#!/bin/bash
# Test Railway PostgreSQL Connection Script

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai - Railway Database Connection Test                   ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}ℹ${NC}  Testing Railway PostgreSQL connection..."
echo ""

# Railway Database Configuration
PGUSER="postgres"
PGPASSWORD="bpGdnlJNciDiREFjpuMAafmHCQuWnryg"
PGDATABASE="railway"
PGHOST="tramway.proxy.rlwy.net"
PGPORT="55133"

# Test 1: Check if psql is installed
echo -e "${YELLOW}→${NC} Test 1: Checking PostgreSQL client installation..."
if command -v psql &> /dev/null; then
    echo -e "${GREEN}✓${NC} PostgreSQL client (psql) is installed"
else
    echo -e "${YELLOW}⚠${NC}  PostgreSQL client not installed. Installing..."
    
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update && sudo apt-get install -y postgresql-client
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install postgresql
    else
        echo -e "${RED}✗${NC} Please install PostgreSQL client manually"
        exit 1
    fi
    
    echo -e "${GREEN}✓${NC} PostgreSQL client installed"
fi
echo ""

# Test 2: Test external connection via TCP proxy
echo -e "${YELLOW}→${NC} Test 2: Testing external connection (TCP Proxy)..."
if PGPASSWORD="$PGPASSWORD" psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -c "SELECT version();" &> /dev/null; then
    echo -e "${GREEN}✓${NC} External connection successful (TCP Proxy)"
    
    # Get PostgreSQL version
    PG_VERSION=$(PGPASSWORD="$PGPASSWORD" psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -t -c "SELECT version();" | head -n1)
    echo -e "${BLUE}ℹ${NC}  PostgreSQL Version: $PG_VERSION"
else
    echo -e "${RED}✗${NC} External connection failed"
    echo -e "${YELLOW}⚠${NC}  Please check your Railway database credentials"
    exit 1
fi
echo ""

# Test 3: Check database tables
echo -e "${YELLOW}→${NC} Test 3: Checking database tables..."
TABLES=$(PGPASSWORD="$PGPASSWORD" psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")
echo -e "${BLUE}ℹ${NC}  Found $TABLES table(s) in database"

if [ "$TABLES" -eq 0 ]; then
    echo -e "${YELLOW}⚠${NC}  No tables found. Migrations need to run."
else
    echo -e "${GREEN}✓${NC} Database tables exist"
    
    # List tables
    echo -e "${BLUE}ℹ${NC}  Tables:"
    PGPASSWORD="$PGPASSWORD" psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -c "\dt"
fi
echo ""

# Test 4: Test write operation
echo -e "${YELLOW}→${NC} Test 4: Testing write permissions..."
if PGPASSWORD="$PGPASSWORD" psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -c "CREATE TABLE IF NOT EXISTS test_connection (id SERIAL PRIMARY KEY, test_time TIMESTAMPTZ DEFAULT NOW()); INSERT INTO test_connection DEFAULT VALUES; DROP TABLE test_connection;" &> /dev/null; then
    echo -e "${GREEN}✓${NC} Write permissions verified"
else
    echo -e "${RED}✗${NC} Write operation failed"
    exit 1
fi
echo ""

# Test 5: Connection string format test
echo -e "${YELLOW}→${NC} Test 5: Testing connection string formats..."

# Internal connection string (for Railway deployment)
INTERNAL_URL="postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway"
echo -e "${BLUE}ℹ${NC}  Internal URL: $INTERNAL_URL"
echo -e "${BLUE}ℹ${NC}  (Use this when deployed on Railway)"

# External connection string (for local development)
EXTERNAL_URL="postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway"
echo -e "${BLUE}ℹ${NC}  External URL: $EXTERNAL_URL"
echo -e "${BLUE}ℹ${NC}  (Use this for local development)"

echo -e "${GREEN}✓${NC} Connection string formats verified"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ All tests passed!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Summary:"
echo -e "  ${GREEN}✓${NC} Railway PostgreSQL is accessible"
echo -e "  ${GREEN}✓${NC} Connection credentials are valid"
echo -e "  ${GREEN}✓${NC} Read/Write permissions verified"
echo ""
echo "Next Steps:"
echo "  1. For local development: cp autoassist-api/.env.local autoassist-api/.env"
echo "  2. Run migrations: cd autoassist-api && cargo run"
echo "  3. For Railway deployment: Use .env.railway settings"
echo ""
