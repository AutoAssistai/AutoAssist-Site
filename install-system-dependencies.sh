#!/bin/bash
# AutoAssist.ai - System Dependencies Installer
# For Ubuntu/Debian/Pop!_OS systems

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai - System Dependencies Installation                   ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
   echo -e "${RED}Please do not run as root. Run with sudo when prompted.${NC}"
   exit 1
fi

echo "This script will install required system dependencies for building AutoAssist.ai"
echo ""
echo "Dependencies to be installed:"
echo "  • build-essential (GCC, G++, make)"
echo "  • pkg-config (package configuration)"
echo "  • libssl-dev (OpenSSL development files)"
echo "  • libpq-dev (PostgreSQL client library)"
echo "  • ca-certificates (SSL certificates)"
echo ""

# Update package list
echo -e "${YELLOW}→${NC} Updating package lists..."
sudo apt-get update -qq

# Install build essentials
echo -e "${YELLOW}→${NC} Installing build-essential..."
sudo apt-get install -y build-essential

# Install pkg-config
echo -e "${YELLOW}→${NC} Installing pkg-config..."
sudo apt-get install -y pkg-config

# Install OpenSSL development files
echo -e "${YELLOW}→${NC} Installing libssl-dev..."
sudo apt-get install -y libssl-dev

# Install PostgreSQL client library
echo -e "${YELLOW}→${NC} Installing libpq-dev..."
sudo apt-get install -y libpq-dev

# Install CA certificates
echo -e "${YELLOW}→${NC} Installing ca-certificates..."
sudo apt-get install -y ca-certificates

echo ""
echo -e "${GREEN}✓${NC} All system dependencies installed successfully!"
echo ""

# Verify installations
echo "Verifying installations..."
echo ""

if command -v gcc &> /dev/null; then
    echo -e "${GREEN}✓${NC} GCC: $(gcc --version | head -1)"
else
    echo -e "${RED}✗${NC} GCC not found"
fi

if command -v pkg-config &> /dev/null; then
    echo -e "${GREEN}✓${NC} pkg-config: $(pkg-config --version)"
else
    echo -e "${RED}✗${NC} pkg-config not found"
fi

if pkg-config --exists openssl; then
    echo -e "${GREEN}✓${NC} OpenSSL: $(pkg-config --modversion openssl)"
else
    echo -e "${RED}✗${NC} OpenSSL pkg-config not found"
fi

if command -v pg_config &> /dev/null; then
    echo -e "${GREEN}✓${NC} PostgreSQL: $(pg_config --version)"
else
    echo -e "${RED}✗${NC} pg_config not found"
fi

echo ""
echo "Setting up environment variables..."

# Set environment variables for current session
export PKG_CONFIG_PATH="/usr/lib/x86_64-linux-gnu/pkgconfig:$PKG_CONFIG_PATH"
export OPENSSL_DIR="/usr"
export OPENSSL_LIB_DIR="/usr/lib/x86_64-linux-gnu"
export OPENSSL_INCLUDE_DIR="/usr/include/openssl"

# Add to shell profile for persistence
SHELL_RC="$HOME/.bashrc"
if [ -f "$HOME/.zshrc" ]; then
    SHELL_RC="$HOME/.zshrc"
fi

if ! grep -q "PKG_CONFIG_PATH.*usr/lib/x86_64-linux-gnu/pkgconfig" "$SHELL_RC"; then
    echo "" >> "$SHELL_RC"
    echo "# AutoAssist.ai build environment" >> "$SHELL_RC"
    echo 'export PKG_CONFIG_PATH="/usr/lib/x86_64-linux-gnu/pkgconfig:$PKG_CONFIG_PATH"' >> "$SHELL_RC"
    echo 'export OPENSSL_DIR="/usr"' >> "$SHELL_RC"
    echo 'export OPENSSL_LIB_DIR="/usr/lib/x86_64-linux-gnu"' >> "$SHELL_RC"
    echo 'export OPENSSL_INCLUDE_DIR="/usr/include/openssl"' >> "$SHELL_RC"
    echo -e "${GREEN}✓${NC} Environment variables added to $SHELL_RC"
fi

echo ""
echo -e "${GREEN}✓${NC} System setup complete!"
echo ""
echo "Next steps:"
echo "  1. Restart your terminal or run: source $SHELL_RC"
echo "  2. Run: ./build-backend.sh"
echo "  3. Test backend: cd autoassist-api && cargo run"
echo ""
