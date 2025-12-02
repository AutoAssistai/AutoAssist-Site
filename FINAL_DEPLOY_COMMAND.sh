#!/bin/bash
# ONE COMMAND TO DEPLOY EVERYTHING

set -e

echo "════════════════════════════════════════════════════════════"
echo "🚀 Final Deploy - One Command"
echo "════════════════════════════════════════════════════════════"
echo ""

cd ~/Desktop/AutoAssist_site/autoassist-api

# Force link to AutoAssist service
echo "Linking to AutoAssist service..."
railway link bd2109f7-6af8-4557-a71a-ef63055f3044 -e production -s ac4c6187-f68d-41e3-8b2f-1e38f57e688f

echo ""
echo "Deploying..."
railway up --detach

echo ""
echo "════════════════════════════════════════════════════════════"
echo "✅ Deployment started!"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Monitor: railway logs"
echo "Test: curl https://autoassist-production.up.railway.app/health"
echo ""
