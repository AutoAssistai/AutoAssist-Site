#!/bin/bash
set -e

echo "🚀 Building AutoAssist.ai Frontend for Production..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run type checking
echo "🔍 Type checking..."
npm run type-check || true

# Run linting
echo "✨ Linting..."
npm run lint || true

# Build for production
echo "🏗️  Building..."
npm run build

# Check build output
if [ -d ".output/public" ]; then
  echo "✅ Build successful!"
  echo "📊 Build size:"
  du -sh .output/public
  echo ""
  echo "📁 Build contents:"
  ls -lh .output/public/ | head -10
  echo ""
  echo "🎉 Ready to deploy to Cloudflare Pages!"
  echo ""
  echo "📝 Deployment command:"
  echo "   wrangler pages deploy .output/public --project-name=autoassist"
else
  echo "❌ Build failed - output directory not found"
  exit 1
fi
