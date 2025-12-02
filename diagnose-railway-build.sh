#!/bin/bash
# Diagnose Railway build issues

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          Railway Build Diagnostics                          ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

cd autoassist-api

echo -e "${BLUE}1. Checking required files...${NC}"
echo ""

files=(
    "Cargo.toml"
    "Cargo.lock"
    "Dockerfile"
    "src/main.rs"
    "migrations/001_create_leads_table.sql"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file - MISSING"
    fi
done

echo ""
echo -e "${BLUE}2. Checking Dockerfile syntax...${NC}"
echo ""

if docker build --no-cache --progress=plain -t test-build . > /tmp/docker_build.log 2>&1; then
    echo -e "${GREEN}✓${NC} Docker build successful locally"
else
    echo -e "${RED}✗${NC} Docker build failed locally"
    echo ""
    echo "Last 30 lines of build log:"
    tail -30 /tmp/docker_build.log
fi

echo ""
echo -e "${BLUE}3. Checking Railway configuration...${NC}"
echo ""

if railway status > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Railway project linked"
    railway status
else
    echo -e "${RED}✗${NC} Railway project not linked"
fi

echo ""
echo -e "${BLUE}4. Checking environment variables...${NC}"
echo ""

railway variables | head -20 || echo "Cannot fetch variables"

echo ""
echo -e "${BLUE}5. Recent Railway logs...${NC}"
echo ""

railway logs | tail -50 || echo "Cannot fetch logs"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "Diagnostics complete!"
echo "════════════════════════════════════════════════════════════════"
