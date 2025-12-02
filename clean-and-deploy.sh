#!/bin/bash
# Clean project and deploy to Railway

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          Clean & Deploy to Railway                          ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}Step 1: Cleaning build artifacts...${NC}"
cd autoassist-api
rm -rf target .env.backup .env~
cd ..
echo -e "${GREEN}✓${NC} Cleaned"

echo ""
echo -e "${BLUE}Step 2: Checking project size...${NC}"
SIZE=$(du -sh autoassist-api | cut -f1)
echo "Project size: $SIZE"

if [[ "$SIZE" == *G* ]]; then
    echo -e "${YELLOW}⚠${NC}  Warning: Project size is too large!"
    echo "Checking for large files..."
    find autoassist-api -type f -size +10M -ls 2>/dev/null | head -10
    exit 1
fi

echo -e "${GREEN}✓${NC} Size looks good"

echo ""
echo -e "${BLUE}Step 3: Testing Docker build locally...${NC}"
cd autoassist-api
if docker build -t test-build . > /tmp/docker_build_test.log 2>&1; then
    echo -e "${GREEN}✓${NC} Docker build successful"
else
    echo -e "${RED}✗${NC} Docker build failed"
    echo ""
    echo "Last 20 lines of build log:"
    tail -20 /tmp/docker_build_test.log
    exit 1
fi

echo ""
echo -e "${BLUE}Step 4: Deploying to Railway...${NC}"
echo ""

# Deploy
railway up

echo ""
echo -e "${GREEN}✓ Deployment initiated!${NC}"
echo ""
echo "Monitor logs with:"
echo "  railway logs --follow"
