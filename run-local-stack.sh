#!/bin/bash
# AutoAssist.ai - Local Development Stack Runner

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║            AutoAssist.ai - Local Development Stack                           ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check prerequisites
echo "Checking prerequisites..."

# Check if backend is built
if [ ! -f "autoassist-api/target/release/autoassist-api" ]; then
    echo -e "${YELLOW}⚠${NC}  Backend not built. Building now..."
    ./build-backend.sh
fi

# Check backend .env
if [ ! -f "autoassist-api/.env" ]; then
    echo -e "${RED}✗${NC} autoassist-api/.env not found"
    echo "   Please create it from .env.example"
    exit 1
fi

# Check frontend .env
if [ ! -f "autoassist-frontend/.env" ]; then
    echo -e "${YELLOW}⚠${NC}  autoassist-frontend/.env not found. Creating..."
    echo "VITE_API_URL=http://localhost:8080" > autoassist-frontend/.env
fi

# Check if frontend dependencies are installed
if [ ! -d "autoassist-frontend/node_modules" ]; then
    echo -e "${YELLOW}→${NC} Installing frontend dependencies..."
    cd autoassist-frontend
    npm ci
    cd ..
fi

echo ""
echo -e "${GREEN}✓${NC} Prerequisites checked"
echo ""

# Create PID file directory
mkdir -p .pids

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down services..."
    if [ -f ".pids/backend.pid" ]; then
        kill $(cat .pids/backend.pid) 2>/dev/null || true
        rm .pids/backend.pid
    fi
    if [ -f ".pids/frontend.pid" ]; then
        kill $(cat .pids/frontend.pid) 2>/dev/null || true
        rm .pids/frontend.pid
    fi
    echo "Services stopped"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start backend
echo -e "${YELLOW}→${NC} Starting backend on http://localhost:8080..."
cd autoassist-api
cargo run --release > ../backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../.pids/backend.pid
cd ..

# Wait for backend to be ready
echo "   Waiting for backend to start..."
for i in {1..30}; do
    if curl -s http://localhost:8080/health > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Backend running on http://localhost:8080"
        break
    fi
    sleep 1
    if [ $i -eq 30 ]; then
        echo -e "${RED}✗${NC} Backend failed to start. Check backend.log"
        cleanup
        exit 1
    fi
done

# Start frontend
echo -e "${YELLOW}→${NC} Starting frontend on http://localhost:3000..."
cd autoassist-frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../.pids/frontend.pid
cd ..

# Wait for frontend to be ready
echo "   Waiting for frontend to start..."
sleep 5
echo -e "${GREEN}✓${NC} Frontend running on http://localhost:3000"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "                       Services Running"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Backend:  http://localhost:8080"
echo "  Health:   http://localhost:8080/health"
echo "  API:      http://localhost:8080/api/lead"
echo ""
echo "  Frontend: http://localhost:3000"
echo ""
echo "Logs:"
echo "  Backend:  tail -f backend.log"
echo "  Frontend: tail -f frontend.log"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Keep script running
wait
