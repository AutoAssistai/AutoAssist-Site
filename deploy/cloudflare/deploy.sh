#!/bin/bash

# AutoAssist.ai Frontend - Cloudflare Pages Deployment Script

set -e

echo "🚀 AutoAssist.ai - Cloudflare Pages Deployment"
echo "================================================"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Check environment
if [ "$1" == "production" ]; then
    ENVIRONMENT="production"
    PROJECT_NAME="autoassist"
    BRANCH="main"
    echo "📦 Deploying to PRODUCTION"
elif [ "$1" == "staging" ]; then
    ENVIRONMENT="staging"
    PROJECT_NAME="autoassist-staging"
    BRANCH="develop"
    echo "📦 Deploying to STAGING"
else
    echo "❌ Usage: ./deploy.sh [staging|production]"
    exit 1
fi

# Navigate to frontend directory
cd "$(dirname "$0")/../../autoassist-frontend"

# Install dependencies
echo "📥 Installing dependencies..."
npm ci

# Build
echo "🔨 Building frontend..."
npm run build

# Deploy to Cloudflare Pages
echo "☁️  Deploying to Cloudflare Pages..."
wrangler pages deploy .output/public \
    --project-name=$PROJECT_NAME \
    --branch=$BRANCH

echo "✅ Deployment complete!"
echo "🌐 URL: https://${PROJECT_NAME}.pages.dev"
