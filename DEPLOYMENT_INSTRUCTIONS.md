# 🚀 AutoAssist.ai - Complete Deployment Instructions

## ✅ Email Configuration Complete!

Your Yahoo SMTP credentials have been configured:
- **SMTP Host**: smtp.mail.yahoo.com
- **SMTP Port**: 465 (SSL)
- **Username**: autoassist.contact@yahoo.com
- **Password**: gjrmemjpcqwqiqft (Yahoo App Password)
- **Admin Email**: autoassist.contact@yahoo.com

---

## 🎯 Pre-Deployment Checklist

### Requirements
- [ ] Fly.io account: https://fly.io/signup
- [ ] Fly CLI installed: `curl -L https://fly.io/install.sh | sh`
- [ ] Node.js 18+ installed
- [ ] Rust 1.91+ installed (for local testing)

---

## 📦 Step 1: Test Email Locally (Recommended)

Before deploying, test that emails work:

```bash
# 1. Start the backend with your configured .env
cd autoassist-api
cargo run

# 2. In another terminal, run the test script
cd autoassist-api
./test-email.sh
```

**Expected Results:**
- ✅ Backend starts successfully on port 8080
- ✅ Test email sent successfully
- ✅ Admin notification arrives at autoassist.contact@yahoo.com
- ✅ Welcome email sent to test@example.com

**Troubleshooting:**
- If emails don't arrive, check spam folder
- Verify Yahoo App Password is correct
- Check backend logs for SMTP errors
- Ensure port 465 is not blocked by firewall

---

## 🚀 Step 2: Deploy Backend to Fly.io

### 2.1 Login to Fly.io
```bash
fly auth login
```

### 2.2 Create PostgreSQL Database
```bash
# Create a new Postgres cluster
fly postgres create --name autoassist-db --region iad

# Save the connection string provided
# Example: postgresql://user:pass@autoassist-db.internal:5432/autoassist
```

### 2.3 Deploy Backend Application

```bash
cd autoassist-api

# First time launch (creates app)
fly launch --no-deploy --name autoassist-api --region iad

# Set all environment variables as secrets
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

# Check status
fly status

# View logs
fly logs
```

### 2.4 Test Backend Health
```bash
# Test health endpoint
curl https://autoassist-api.fly.dev/health

# Expected response:
# {"status":"healthy","version":"1.0.0","timestamp":"..."}
```

### 2.5 Test Email on Production
```bash
# Send test email via production API
curl -X POST https://autoassist-api.fly.dev/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Production Test",
    "company": "Test Company",
    "website": "test.com",
    "goal": "Testing production email",
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

**Check**: Email should arrive at autoassist.contact@yahoo.com within 1-2 minutes

---

## 🌐 Step 3: Deploy Frontend to Cloudflare Pages

### 3.1 Install Wrangler CLI
```bash
npm install -g wrangler
wrangler login
```

### 3.2 Update Frontend Environment
```bash
cd autoassist-frontend

# Update .env for production
echo "VITE_API_URL=https://autoassist-api.fly.dev" > .env
```

### 3.3 Build Frontend
```bash
# Install dependencies
npm ci

# Build for production
npm run build

# Verify build output
ls -la .output/public
```

### 3.4 Deploy to Cloudflare Pages
```bash
# Deploy to Cloudflare Pages
wrangler pages deploy .output/public --project-name=autoassist

# Or use Cloudflare dashboard:
# 1. Go to https://dash.cloudflare.com/
# 2. Pages → Create a project → Connect Git
# 3. Set build command: npm run build
# 4. Set build output: .output/public
# 5. Add environment variable: VITE_API_URL=https://autoassist-api.fly.dev
```

---

## ✅ Step 4: Verify Full System

### 4.1 Test Frontend Form Submission
1. Visit your deployed frontend URL
2. Fill out the contact form
3. Submit
4. Verify success message appears

### 4.2 Verify Emails
- [ ] Check autoassist.contact@yahoo.com for admin notification
- [ ] Check test email inbox for welcome email
- [ ] Verify both emails contain correct information

### 4.3 Test All Forms
- [ ] Hero section "Get Free Preview" button
- [ ] Navigation "Get Started" button
- [ ] Contact form submission
- [ ] Sticky CTA (appears after scrolling)
- [ ] Exit intent popup

---

## 🔧 Configuration Files Summary

### Backend (.env)
```env
HOST=0.0.0.0
PORT=8080
DATABASE_URL=postgresql://user:pass@host:5432/autoassist
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=465
SMTP_USERNAME=autoassist.contact@yahoo.com
SMTP_PASSWORD=gjrmemjpcqwqiqft
SMTP_FROM=autoassist.contact@yahoo.com
ADMIN_EMAIL=autoassist.contact@yahoo.com
RUST_LOG=autoassist_api=info,tower_http=info
```

### Frontend (.env)
```env
VITE_API_URL=https://autoassist-api.fly.dev
```

### Fly.io Secrets (set via CLI)
```bash
fly secrets set \
  DATABASE_URL="..." \
  SMTP_HOST="smtp.mail.yahoo.com" \
  SMTP_PORT="465" \
  SMTP_USERNAME="autoassist.contact@yahoo.com" \
  SMTP_PASSWORD="gjrmemjpcqwqiqft" \
  SMTP_FROM="autoassist.contact@yahoo.com" \
  ADMIN_EMAIL="autoassist.contact@yahoo.com"
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend won't start
```bash
# Check logs
fly logs

# Common causes:
# - DATABASE_URL not set correctly
# - SMTP credentials invalid
# - Port conflicts
```

**Problem**: Emails not sending
```bash
# Check if SMTP secrets are set
fly secrets list

# Verify credentials
# - Username: autoassist.contact@yahoo.com
# - Password: gjrmemjpcqwqiqft
# - Port: 465
# - Host: smtp.mail.yahoo.com

# Check logs for SMTP errors
fly logs | grep -i smtp
fly logs | grep -i email
```

**Problem**: Database connection failed
```bash
# Verify Postgres is running
fly postgres list

# Check connection string format
# Should be: postgresql://user:pass@host.internal:5432/dbname

# Attach to database to test
fly postgres connect -a autoassist-db
```

### Frontend Issues

**Problem**: API calls failing (CORS errors)
- Verify VITE_API_URL is set correctly
- Check backend CORS configuration allows your domain
- Verify backend is actually running: `fly status`

**Problem**: Form submission returns 404
- Ensure backend endpoint is `/api/lead` (not `/api/contact`)
- Check VITE_API_URL doesn't include `/api` at the end
- Test backend directly: `curl https://autoassist-api.fly.dev/health`

**Problem**: Build fails
```bash
# Clear and rebuild
rm -rf node_modules .output
npm install
npm run build
```

### Email Issues

**Problem**: Emails going to spam
- Check Yahoo Mail settings
- Ensure "From" address matches SMTP username
- Add SPF/DKIM records to your domain (advanced)

**Problem**: Yahoo blocking emails
- Verify App Password is recent and valid
- Check Yahoo account is not locked
- Ensure less than 500 emails per day (Yahoo limit)
- Try port 587 with STARTTLS if 465 fails

**Problem**: Rate limiting triggered
- Backend limits to 5 submissions per IP per hour
- Wait 1 hour or test from different IP
- Check rate limit logs: `fly logs | grep -i rate`

---

## 📊 Monitoring

### View Backend Logs
```bash
# Real-time logs
fly logs

# Filter for errors
fly logs | grep -i error

# Filter for email activity
fly logs | grep -i email
```

### Check Application Status
```bash
# Backend status
fly status

# Database status
fly postgres list

# Check secrets (names only, not values)
fly secrets list
```

### Monitor Email Delivery
- Check autoassist.contact@yahoo.com inbox regularly
- Monitor Yahoo Mail spam folder
- Track delivery failures in backend logs

---

## 🎯 Post-Deployment Checklist

- [ ] Backend deployed and healthy
- [ ] Frontend deployed and accessible
- [ ] Test form submission successful
- [ ] Admin emails arriving at autoassist.contact@yahoo.com
- [ ] Welcome emails being sent to users
- [ ] All navigation links working
- [ ] Mobile responsive verified
- [ ] No console errors in browser
- [ ] SSL certificates active (HTTPS)
- [ ] Rate limiting tested

---

## 💰 Free Tier Limits

### Fly.io Free Tier
- ✅ 1 shared CPU, 256MB RAM (backend)
- ✅ 3GB PostgreSQL storage
- ✅ 160GB bandwidth/month
- ✅ Perfect for AutoAssist.ai launch!

### Cloudflare Pages Free Tier
- ✅ Unlimited bandwidth
- ✅ Unlimited requests
- ✅ 500 builds/month
- ✅ More than enough!

### Yahoo Mail Limits
- ⚠️ ~500 emails/day maximum
- ⚠️ Rate limiting if too many emails too fast
- ✅ Perfect for lead generation site

**Total Monthly Cost**: $0 🎉

---

## 🔐 Security Notes

- ✅ SMTP password stored as Fly.io secret (encrypted)
- ✅ Database connection secured
- ✅ HTTPS enforced on both frontend and backend
- ✅ Rate limiting prevents abuse (5 req/hour per IP)
- ✅ Input validation on all form fields
- ✅ CORS configured

**Recommendations:**
- Rotate Yahoo App Password every 90 days
- Monitor logs for suspicious activity
- Set up uptime monitoring (UptimeRobot, free)
- Keep dependencies updated

---

## 📞 Quick Reference

### Important URLs
- Backend API: https://autoassist-api.fly.dev
- Backend Health: https://autoassist-api.fly.dev/health
- Frontend: https://autoassist.pages.dev (or custom domain)

### Email Configuration
- Admin Email: autoassist.contact@yahoo.com
- SMTP Host: smtp.mail.yahoo.com
- SMTP Port: 465 (SSL)

### Key Commands
```bash
# Backend
fly logs                    # View logs
fly status                  # Check status
fly restart                 # Restart app
fly secrets list            # List secrets

# Frontend
npm run build               # Build
wrangler pages deploy       # Deploy

# Testing
./test-email.sh            # Test email locally
curl /health               # Test backend health
```

---

## 🎉 Success Criteria

Your deployment is successful when:
1. ✅ Backend returns 200 on /health endpoint
2. ✅ Frontend loads without errors
3. ✅ Form submission returns success message
4. ✅ Admin email arrives at autoassist.contact@yahoo.com
5. ✅ Welcome email sent to user
6. ✅ No errors in browser console
7. ✅ Mobile responsive works correctly

---

## 🚀 Next Steps After Launch

1. **Monitor for 24 hours**
   - Check logs regularly
   - Verify email delivery
   - Test from different devices

2. **Set up monitoring**
   - UptimeRobot for uptime checks
   - Plausible or Google Analytics
   - Error tracking (Sentry)

3. **Optimize**
   - Convert images to WebP
   - Add custom domain
   - Set up email automation

4. **Scale** (when needed)
   - Upgrade Fly.io resources
   - Add CDN caching
   - Implement email queuing

---

**🎊 You're ready to launch! Follow the steps above to deploy AutoAssist.ai with fully working email notifications.**

For questions or issues, check the troubleshooting section above.
