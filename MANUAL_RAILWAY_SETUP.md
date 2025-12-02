# 🚂 Manual Railway Database Setup (5 Minutes)

## Quick Setup via Web UI (No CLI Needed)

### Step 1: Create Railway Account
1. Go to: **https://railway.app**
2. Click **"Start a New Project"**
3. Sign up with GitHub (free, no credit card)

### Step 2: Create PostgreSQL Database
1. Click **"New Project"**
2. Select **"Provision PostgreSQL"**
3. Wait 30 seconds for database to provision

### Step 3: Get Connection String
1. Click on your **PostgreSQL service** (purple box)
2. Go to **"Variables"** tab
3. Find **DATABASE_URL**
4. Click the **copy icon** to copy the full connection string

It will look like:
```
postgresql://postgres:PASSWORD@containers-us-west-123.railway.app:5432/railway
```

### Step 4: Update .env File
1. Open `autoassist-api/.env` in your editor
2. Replace the DATABASE_URL line with your copied value:

```env
# Server Configuration
HOST=0.0.0.0
PORT=8080

# Database (Railway PostgreSQL) - PASTE YOUR CONNECTION STRING HERE
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@containers-us-west-123.railway.app:5432/railway

# SMTP Configuration (Yahoo Mail)
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=465
SMTP_USERNAME=autoassist.contact@yahoo.com
SMTP_PASSWORD=gjrmemjpcqwqiqft
SMTP_FROM=autoassist.contact@yahoo.com
ADMIN_EMAIL=autoassist.contact@yahoo.com

# Logging
RUST_LOG=autoassist_api=info,tower_http=info
```

### Step 5: Test Connection
```bash
cd autoassist-api
cargo run
```

You should see:
```
✓ Configuration loaded
✓ Database connected
✓ Database migrations completed
✓ Server listening on 0.0.0.0:8080
```

### Step 6: Test Email System
```bash
# In another terminal
./test-professional-email.sh
```

---

## ✅ Railway Free Tier Details

- **Storage**: 512MB
- **RAM**: 512MB
- **Cost**: $0/month (free forever)
- **SSL**: Included automatically
- **Region**: US West (fastest for most US users)
- **Uptime**: 99.9%

---

## 🔐 Connection String Format

Railway provides a connection string in this format:
```
postgresql://<username>:<password>@<host>:<port>/<database>

Example:
postgresql://postgres:a1b2c3d4@containers-us-west-45.railway.app:5432/railway
```

The connection string includes:
- **Username**: `postgres` (default)
- **Password**: Auto-generated secure password
- **Host**: Railway's private network address
- **Port**: `5432` (PostgreSQL default)
- **Database**: `railway` (default)
- **SSL**: Automatically enabled (Railway requires SSL)

---

## 🐛 Troubleshooting

### Issue: "password authentication failed"
**Solution**: Double-check you copied the entire DATABASE_URL correctly (no spaces)

### Issue: "connection refused"
**Solution**: Railway database may still be provisioning. Wait 1 minute and try again.

### Issue: "SSL required"
**Solution**: Railway requires SSL. Your Rust app already supports this with rustls (no config needed!)

---

## 🎯 Verify Everything Works

After updating .env:

```bash
# Start backend
cd autoassist-api
cargo run

# Should see:
# ✓ Configuration loaded
# ✓ Database connected  
# ✓ Database migrations completed
# ✓ Server listening on 0.0.0.0:8080
```

Then test emails:
```bash
./test-professional-email.sh
```

Check:
- Admin email at: autoassist.contact@yahoo.com
- User welcome email at: test@example.com

---

## 🚀 Ready for Production

Once local testing works:

```bash
cd autoassist-api
fly deploy
```

Your Railway database works from anywhere (local dev + production)!

---

**Estimated Time**: 5 minutes  
**Cost**: $0 (free tier)  
**Difficulty**: Very Easy ⭐
