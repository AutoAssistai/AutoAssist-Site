#!/bin/bash
# Final Fix: Delete target/ and deploy

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          Final Fix & Deploy to Railway                      ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Step 1: Delete target directory
echo -e "${BLUE}Step 1: Deleting target/ directory (1.2GB)...${NC}"
cd autoassist-api

if [ -d "target" ]; then
    echo "Deleting target/..."
    rm -rf target
    echo -e "${GREEN}✓${NC} target/ deleted"
else
    echo -e "${GREEN}✓${NC} target/ already deleted"
fi

cd ..

# Step 2: Check size
echo ""
echo -e "${BLUE}Step 2: Checking project size...${NC}"
SIZE=$(du -sh autoassist-api | cut -f1)
echo "Project size now: $SIZE"

if [[ "$SIZE" == *"G"* ]]; then
    echo -e "${RED}✗${NC} Still too large!"
    echo "Finding large files..."
    find autoassist-api -type f -size +10M -ls 2>/dev/null
    exit 1
fi

echo -e "${GREEN}✓${NC} Size is good: $SIZE"

# Step 3: Verify .railwayignore
echo ""
echo -e "${BLUE}Step 3: Verifying .railwayignore...${NC}"
if grep -q "target/" autoassist-api/.railwayignore 2>/dev/null; then
    echo -e "${GREEN}✓${NC} .railwayignore contains target/"
else
    echo -e "${YELLOW}⚠${NC} Adding target/ to .railwayignore..."
    echo "target/" >> autoassist-api/.railwayignore
fi

# Step 4: Link Railway service
echo ""
echo -e "${BLUE}Step 4: Linking Railway service...${NC}"
cd autoassist-api

if railway status > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Service already linked"
else
    echo -e "${YELLOW}⚠${NC} Linking service..."
    railway service || railway link
fi

# Step 5: Deploy
echo ""
echo -e "${BLUE}Step 5: Deploying to Railway...${NC}"
echo ""

railway up

echo ""
echo -e "${GREEN}✓ Deployment started!${NC}"
echo ""
echo "Monitor deployment:"
echo "  railway logs --follow"
echo ""
echo "Get URL:"
echo "  railway domain"
