# AutoAssist.ai - Quickstart Guide

Get your ultra-premium landing page running in 30 minutes.

## Prerequisites Install

```bash
# Install Node.js 20+ (if not already)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Rust 1.91+ (if not already)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Install PostgreSQL (using Docker is easiest)
docker run --name autoassist-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=autoassist \
  -p 5432:5432 \
  -d postgres:16-alpine
```

## Step 1: Frontend Setup (5 minutes)

```bash
cd autoassist-frontend

# Install dependencies
npm install

# Create environment file
cat > .env << 'ENVFILE'
VITE_API_URL=http://localhost:3001
VITE_API_ENDPOINT=/api/lead
VITE_PLAUSIBLE_DOMAIN=localhost
ENVFILE

# Start development server
npm run dev
```

✅ Frontend running at http://localhost:3000

## Step 2: Backend Setup (10 minutes)

```bash
cd autoassist-api

# Install SQLx CLI
cargo install sqlx-cli --no-default-features --features postgres

# Create environment file
cat > .env << 'ENVFILE'
HOST=0.0.0.0
PORT=3001
DATABASE_URL=postgresql://postgres:password@localhost:5432/autoassist

# SMTP Configuration (use Gmail for testing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
ADMIN_EMAIL=your-email@gmail.com
ENVFILE

# Run database migrations
sqlx migrate run

# Start API server
cargo run
```

✅ Backend API running at http://localhost:3001

## Step 3: Test the Form (5 minutes)

1. Open http://localhost:3000 in your browser
2. Scroll to "Get Your Free Homepage Preview" section
3. Fill out the form:
   - Full Name: Test User
   - Company: Test Company
   - Website: test.com
   - Goal: Testing the form
   - Budget: $1,500 - $3,000
   - Email: your-email@gmail.com
   - Check the consent checkbox
4. Click "Get My Free Preview"
5. Check your email for welcome message

✅ Form submission working!

## Gmail SMTP Setup (Required for Testing)

To send emails via Gmail:

1. Enable 2-factor authentication on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate an "App Password" for "Mail"
4. Use this password in your `.env` file as `SMTP_PASSWORD`

## Common Issues

### "Database connection refused"

```bash
# Make sure PostgreSQL is running
docker ps | grep postgres

# If not running, start it
docker start autoassist-postgres
```

### "Port 3000 already in use"

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### "Rust compile error"

```bash
# Update Rust toolchain
rustup update stable
```

### "Email not sending"

- Verify Gmail app password is correct
- Check backend logs: `cargo run` output
- Ensure "Less secure app access" is NOT needed (use App Password instead)

## Next Steps

1. ✅ Local development working
2. 📝 Replace placeholder images in `autoassist-frontend/public/assets/`
3. 📝 Update content tokens in components
4. 🚀 Deploy to staging (see `deploy/` folder)
5. ✅ Run tests: `npm run test:e2e`
6. 🚀 Deploy to production

## Quick Commands Reference

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code style
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests

# Backend
cargo run            # Start API server
cargo test           # Run tests
cargo clippy         # Lint Rust code
cargo audit          # Security audit
sqlx migrate run     # Run migrations

# Database
psql $DATABASE_URL   # Connect to database
sqlx migrate revert  # Undo last migration
```

## Resources

- **Full README**: See `README.md` in project root
- **Frontend Guide**: `autoassist-frontend/README.md`
- **Backend Guide**: `autoassist-api/README.md`
- **Deployment**: `deploy/cloudflare/README.md` and `deploy/fly/README.md`
- **Implementation Notes**: `IMPLEMENTATION_NOTES.md`

## Support

Issues? Email hello@autoassist.ai (response within 4 hours)

---

**Time to production-ready: ~30 minutes** ⚡
