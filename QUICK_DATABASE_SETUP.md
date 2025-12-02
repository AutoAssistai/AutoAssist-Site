# 🗄️ Quick Database Setup for AutoAssist.ai

## Option 1: Fly.io PostgreSQL (Recommended - FREE)

### Step 1: Create Fly.io Database
```bash
# Install Fly CLI (if not installed)
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Create free PostgreSQL database
fly postgres create --name autoassist-db --region iad

# SAVE the connection string shown!
# It will look like: postgresql://postgres:password@autoassist-db.internal:5432
```

### Step 2: Update .env
```bash
# Edit autoassist-api/.env and update DATABASE_URL:
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@autoassist-db.internal:5432/autoassist
```

### Step 3: Connect via Fly Proxy
```bash
# In one terminal, start proxy:
fly proxy 5432 -a autoassist-db

# In another terminal, start backend:
cd autoassist-api
cargo run
```

---

## Option 2: Local PostgreSQL Setup

### Step 1: Install PostgreSQL
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

### Step 2: Start PostgreSQL
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Step 3: Create Database
```bash
# Switch to postgres user
sudo -i -u postgres

# Create database and user
psql
```

In PostgreSQL shell:
```sql
CREATE USER autoassist WITH PASSWORD 'autoassist_password';
CREATE DATABASE autoassist OWNER autoassist;
GRANT ALL PRIVILEGES ON DATABASE autoassist TO autoassist;
\q
```

Exit postgres user:
```bash
exit
```

### Step 4: Update .env
Edit `autoassist-api/.env`:
```env
DATABASE_URL=postgresql://autoassist:autoassist_password@localhost:5432/autoassist
```

### Step 5: Start Backend
```bash
cd autoassist-api
cargo run
```

Migrations will run automatically on first start!

---

## Option 3: Railway PostgreSQL (Alternative FREE)

### Step 1: Create Railway Account
Go to: https://railway.app

### Step 2: Create PostgreSQL Database
- Click "New Project"
- Select "Provision PostgreSQL"
- Copy the connection string

### Step 3: Update .env
```env
DATABASE_URL=postgresql://postgres:password@host:port/railway
```

---

## ✅ Verify Database Works

After setting up ANY option above:

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

---

## 🧪 Test Email System

Once backend is running:

```bash
# In another terminal
cd autoassist-api
./test-professional-email.sh
```

---

## 🐛 Troubleshooting

### Error: "password authentication failed"
**Solution**: Check your DATABASE_URL has correct username/password

### Error: "connection refused"
**Solution**: PostgreSQL not running
```bash
sudo systemctl start postgresql
sudo systemctl status postgresql
```

### Error: "database does not exist"
**Solution**: Create the database first (see Step 3 above)

### For Fly.io: "connection refused"
**Solution**: Make sure proxy is running
```bash
fly proxy 5432 -a autoassist-db
```

---

## 📞 Quick Help

**Current DATABASE_URL format:**
```
postgresql://username:password@host:port/database

Examples:
- Local: postgresql://autoassist:autoassist_password@localhost:5432/autoassist
- Fly.io: postgresql://postgres:password@autoassist-db.internal:5432/autoassist  
- Railway: postgresql://postgres:password@containers-us-west-1.railway.app:5432/railway
```

---

## 🎯 Recommended for Testing

**Fastest Option**: Fly.io PostgreSQL (5 minutes setup)

```bash
fly postgres create --name autoassist-db --region iad
# Copy connection string
# Update .env
fly proxy 5432 -a autoassist-db
# In another terminal:
cd autoassist-api && cargo run
```

**Most Simple**: Local PostgreSQL (if already installed)

**Alternative**: Railway (web-based, very simple)

---

Once database is configured, you're ready to test the professional email system!
