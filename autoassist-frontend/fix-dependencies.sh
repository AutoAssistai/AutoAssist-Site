#!/bin/bash

# AutoAssist.ai - Dependency Fix Script
# This script resolves the SolidStart + Vinxi version conflict

echo "🔧 Fixing SolidStart + Vinxi dependency conflict..."
echo ""

# Step 1: Clean everything
echo "📦 Step 1: Cleaning old dependencies..."
rm -rf node_modules package-lock.json .solid .output .vinxi
echo "✅ Cleaned"
echo ""

# Step 2: Clear npm cache
echo "🧹 Step 2: Clearing npm cache..."
npm cache clean --force
echo "✅ Cache cleared"
echo ""

# Step 3: Install with legacy peer deps
echo "📥 Step 3: Installing dependencies..."
npm install --legacy-peer-deps
echo ""

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 You can now run: npm run dev"
else
    echo "❌ Installation failed. Trying alternative method..."
    echo ""
    
    # Alternative: Install exact versions manually
    echo "📥 Installing exact versions..."
    npm install --save --legacy-peer-deps \
        @solidjs/meta@0.29.4 \
        @solidjs/router@0.13.6 \
        @solidjs/start@1.0.6 \
        solid-js@1.8.18 \
        vinxi@0.4.3
fi
