# ⚡ AutoAssist.ai - Quick Deployment (30 Minutes)

## 🎯 Prerequisites

- Fly.io account: https://fly.io/signup
- Cloudflare account: https://dash.cloudflare.com/sign-up
- Yahoo App Password generated: https://login.yahoo.com/account/security
- PostgreSQL connection string ready

---

## 🚀 Backend Deployment (15 minutes)

### Step 1: Install Fly CLI
```bash
curl -L https://fly.io/install.sh | sh
fly auth login
```

### Step 2: Create Database
```bash
fly postgres create --name autoassist-db --region iad
# Save the connection string provided
```

### Step 3: Deploy Backend
```bash
cd autoassist-api

# Launch (first time only)
fly launch --no-deploy --name autoassist-api --region iad

# Set all secrets
fly secrets set \
  DATABASE_URL="postgresql://user:pass@host:5432/db" \
  SMTP_HOST="smtp.mail.yahoo.com" \
  SMTP_PORT="587" \
  SMTP_USERNAME="autoassist.contact@yahoo.com" \
  SMTP_PASSWORD="your_yahoo_app_password" \
  SMTP_FROM="autoassist.contact@yahoo.com" \
  ADMIN_EMAIL="autoassist.contact@yahoo.com"

# Deploy
fly deploy

# Verify
fly status
curl https://autoassist-api.fly.dev/health
```

---

## 🌐 Frontend Deployment (15 minutes)

### Step 1: Install Wrangler
```bash
npm install -g wrangler
wrangler login
```

### Step 2: Build Frontend
```bash
cd autoassist-frontend

# Create environment file
echo "VITE_API_URL=https://autoassist-api.fly.dev" > .env

# Build
npm ci
npm run build
```

### Step 3: Deploy to Cloudflare
```bash
wrangler pages deploy .output/public --project-name=autoassist
```

---

## ✅ Verify Deployment

### Test Backend
```bash
curl https://autoassist-api.fly.dev/health
```

### Test Form Submission
1. Visit your deployed site
2. Fill out contact form
3. Check `autoassist.contact@yahoo.com` for notification
4. Check test email for welcome message

---

## 🎉 You're Live!

**Backend:** https://autoassist-api.fly.dev
**Frontend:** https://[your-deployment].pages.dev

**Next Steps:**
1. Set up custom domain (see DEPLOYMENT_GUIDE.md)
2. Configure monitoring
3. Test all functionality

**Need Help?** See full guide in DEPLOYMENT_GUIDE.md
