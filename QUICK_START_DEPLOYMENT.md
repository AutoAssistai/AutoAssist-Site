# ⚡ Quick Start - Deploy AutoAssist.ai in 30 Minutes

## ✅ Email Already Configured!

Your Yahoo SMTP settings are ready:
- Email: autoassist.contact@yahoo.com
- Password: gjrmemjpcqwqiqft
- Port: 465 (SSL)

---

## 🚀 Deploy in 3 Steps

### Step 1: Test Locally (5 minutes)

```bash
# Validate everything is configured
./validate-deployment.sh

# Start backend
cd autoassist-api
cargo run

# In another terminal, test email
cd autoassist-api
./test-email.sh

# Check email at: autoassist.contact@yahoo.com
```

**Expected:** Admin notification email arrives within 30 seconds

---

### Step 2: Deploy Backend (15 minutes)

```bash
# Install Fly CLI (if needed)
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Create database
fly postgres create --name autoassist-db --region iad
# Save the DATABASE_URL provided!

# Deploy backend
cd autoassist-api
fly launch --no-deploy --name autoassist-api --region iad

# Set secrets (replace DATABASE_URL with your actual URL)
fly secrets set \
  DATABASE_URL="postgresql://user:pass@autoassist-db.internal:5432/autoassist" \
  SMTP_HOST="smtp.mail.yahoo.com" \
  SMTP_PORT="465" \
  SMTP_USERNAME="autoassist.contact@yahoo.com" \
  SMTP_PASSWORD="gjrmemjpcqwqiqft" \
  SMTP_FROM="autoassist.contact@yahoo.com" \
  ADMIN_EMAIL="autoassist.contact@yahoo.com"

# Deploy!
fly deploy

# Test
curl https://autoassist-api.fly.dev/health
```

---

### Step 3: Deploy Frontend (10 minutes)

```bash
# Install Wrangler (if needed)
npm install -g wrangler
wrangler login

# Build frontend
cd autoassist-frontend
echo "VITE_API_URL=https://autoassist-api.fly.dev" > .env
npm ci
npm run build

# Deploy
wrangler pages deploy .output/public --project-name=autoassist
```

---

## ✅ Verify Everything Works

```bash
# Test production form submission
curl -X POST https://autoassist-api.fly.dev/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Production Test",
    "company": "Test Co",
    "website": "test.com",
    "goal": "Testing",
    "budget": "under-1500",
    "email": "test@example.com",
    "phone": "",
    "consent": true,
    "utm_source": "",
    "utm_medium": "",
    "utm_campaign": "",
    "utm_content": "",
    "utm_term": ""
  }'
```

**Check:** Email should arrive at autoassist.contact@yahoo.com

---

## 🎉 You're Live!

Visit your deployed frontend and test the contact form.

**Deployed URLs:**
- Backend: https://autoassist-api.fly.dev
- Frontend: https://[your-deployment].pages.dev

**Need Help?** See `DEPLOYMENT_INSTRUCTIONS.md` for detailed guide.
