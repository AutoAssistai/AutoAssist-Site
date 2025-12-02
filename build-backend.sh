#!/bin/bash
# AutoAssist.ai - Backend Build Script

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║                AutoAssist.ai - Backend Build                                 ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Set environment variables for build
export PKG_CONFIG_PATH="/usr/lib/x86_64-linux-gnu/pkgconfig:$PKG_CONFIG_PATH"
export OPENSSL_DIR="/usr"
export OPENSSL_LIB_DIR="/usr/lib/x86_64-linux-gnu"
export OPENSSL_INCLUDE_DIR="/usr/include/openssl"

echo -e "${YELLOW}→${NC} Setting environment variables..."
echo "   PKG_CONFIG_PATH: $PKG_CONFIG_PATH"
echo "   OPENSSL_DIR: $OPENSSL_DIR"
echo ""

# Navigate to backend directory
cd autoassist-api

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠${NC}  .env file not found. Please create one from .env.example"
    exit 1
fi

echo -e "${YELLOW}→${NC} Checking Cargo.lock..."
if [ ! -f "Cargo.lock" ]; then
    echo "   Generating Cargo.lock..."
fi

echo ""
echo -e "${YELLOW}→${NC} Building backend (this may take a few minutes)..."
echo ""

# Build in release mode
cargo build --release 2>&1 | tee ../backend-build.log

if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓${NC} Backend built successfully!"
    echo ""
    echo "Binary location: target/release/autoassist-api"
    echo "Size: $(du -h target/release/autoassist-api | cut -f1)"
    echo ""
    echo "To run:"
    echo "  cd autoassist-api"
    echo "  cargo run --release"
    echo "  # or"
    echo "  ./target/release/autoassist-api"
    echo ""
else
    echo ""
    echo -e "${RED}✗${NC} Build failed. Check backend-build.log for details"
    exit 1
fi
