#!/bin/bash
# Deploy fresh to Railway - NO CACHE

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          Deploy Fresh to Railway (No Cache)                 ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Delete old service and create new one
echo -e "${BLUE}Step 1: إعداد Railway...${NC}"
cd autoassist-api

# Create a temporary file to trigger new deployment
echo "# Deployment trigger $(date)" > .railway-deploy-trigger

echo -e "${GREEN}✓${NC} جاهز للنشر"
echo ""

echo -e "${BLUE}Step 2: النشر (سيستغرق 5-10 دقائق)...${NC}"
echo ""
echo "سيُطلب منك اختيار service - اختر: AutoAssist"
echo ""

# Deploy with environment variable to skip cache
RAILWAY_NO_CACHE=1 railway up

echo ""
echo -e "${GREEN}✓${NC} تم بدء النشر!"
echo ""
echo "مراقبة النشر:"
echo "  railway logs"
echo ""
echo "اختبار:"
echo "  curl https://autoassist-production.up.railway.app/health"

cd ..
