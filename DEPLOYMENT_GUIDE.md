# 🚀 AutoAssist.ai - Production Deployment Guide

## ✅ Pre-Deployment Checklist

All critical fixes have been implemented:
- ✅ Email addresses standardized to `autoassist.contact@yahoo.com`
- ✅ Dockerfile port updated to 8080 for Fly.io compatibility
- ✅ Features section has `id="services"` for navigation
- ✅ Meta tags updated with robots, theme-color
- ✅ URLs updated from autoassist.com to autoassist.ai
- ✅ robots.txt and sitemap.xml created

---

## 🔧 Environment Variables Setup

### Backend (Fly.io)

**Required Secrets:**
```bash
fly secrets set DATABASE_URL="postgresql://user:password@host:5432/autoassist"
fly secrets set SMTP_HOST="smtp.mail.yahoo.com"
fly secrets set SMTP_PORT="587"
fly secrets set SMTP_USERNAME="autoassist.contact@yahoo.com"
fly secrets set SMTP_PASSWORD="your_yahoo_app_password"
fly secrets set SMTP_FROM="autoassist.contact@yahoo.com"
fly secrets set ADMIN_EMAIL="autoassist.contact@yahoo.com"
```

**Note**: Generate Yahoo App Password at https://login.yahoo.com/account/security

### Frontend (Cloudflare Pages)

**Environment Variable:**
```bash
VITE_API_URL=https://your-backend-url.fly.dev
```

Set this in Cloudflare Pages dashboard under Settings → Environment Variables

---

## 🐳 Backend Deployment (Fly.io)

### Step 1: Install Fly CLI
```bash
curl -L https://fly.io/install.sh | sh
```

### Step 2: Login to Fly.io
```bash
fly auth login
```

### Step 3: Create PostgreSQL Database
```bash
fly postgres create --name autoassist-db --region iad
```

Save the connection string provided.

### Step 4: Deploy Backend
```bash
cd autoassist-api

# First time setup
fly launch --no-deploy

# Set secrets (use connection string from Step 3)
fly secrets set DATABASE_URL="postgresql://..."
fly secrets set SMTP_HOST="smtp.mail.yahoo.com"
fly secrets set SMTP_PORT="587"
fly secrets set SMTP_USERNAME="autoassist.contact@yahoo.com"
fly secrets set SMTP_PASSWORD="your_app_password"
fly secrets set SMTP_FROM="autoassist.contact@yahoo.com"
fly secrets set ADMIN_EMAIL="autoassist.contact@yahoo.com"

# Deploy
fly deploy
```

### Step 5: Verify Backend Health
```bash
fly status
fly logs

# Test health endpoint
curl https://your-app-name.fly.dev/health
```

Expected response:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-12-03T..."
}
```

---

## ☁️ Frontend Deployment (Cloudflare Pages)

### Method 1: Using Wrangler CLI (Recommended)

#### Step 1: Install Wrangler
```bash
npm install -g wrangler
```

#### Step 2: Login to Cloudflare
```bash
wrangler login
```

#### Step 3: Build and Deploy
```bash
cd autoassist-frontend

# Create .env file
echo "VITE_API_URL=https://your-backend-url.fly.dev" > .env

# Build
chmod +x deploy.sh
./deploy.sh

# Deploy
wrangler pages deploy .output/public --project-name=autoassist
```

### Method 2: Using Cloudflare Dashboard

1. Go to https://dash.cloudflare.com/
2. Navigate to **Pages** → **Create a project**
3. Connect your Git repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.output/public`
   - **Root directory**: `autoassist-frontend`
5. Add environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.fly.dev`
6. Click **Save and Deploy**

---

## 🌐 Custom Domain Setup

### Backend Domain (api.autoassist.ai)

```bash
cd autoassist-api
fly certs add api.autoassist.ai
```

Then add DNS records:
```
CNAME  api  your-app-name.fly.dev
```

### Frontend Domain (autoassist.ai)

In Cloudflare Pages:
1. Go to your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter `autoassist.ai` and `www.autoassist.ai`
4. Cloudflare will automatically configure DNS

---

## 🧪 Post-Deployment Testing

### 1. Backend Health Check
```bash
curl https://api.autoassist.ai/health
```

### 2. Test Form Submission
```bash
curl -X POST https://api.autoassist.ai/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "company": "Test Company",
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

Expected response:
```json
{
  "success": true,
  "message": "Thank you! We'll send your free homepage preview within 24-48 hours.",
  "lead_id": "uuid-here"
}
```

### 3. Verify Email Delivery
- Check `autoassist.contact@yahoo.com` for admin notification
- Check test email inbox for welcome email
- **Important**: Check spam folder if not received

### 4. Frontend Verification
Visit https://autoassist.ai and verify:
- [ ] All sections load properly
- [ ] Navigation smooth scrolls work
- [ ] Contact form submits successfully
- [ ] Success message displays
- [ ] No console errors (F12 → Console)
- [ ] Mobile responsive (F12 → Toggle device toolbar)

### 5. Lighthouse Audit
```bash
cd autoassist-frontend
npm run lighthouse
```

Target scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

---

## 🔒 Security Hardening (Optional but Recommended)

### Update CORS in Production

Edit `autoassist-api/src/main.rs` line 56-59:

```rust
let cors = CorsLayer::new()
    .allow_origin("https://autoassist.ai".parse::<HeaderValue>().unwrap())
    .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
    .allow_headers([CONTENT_TYPE]);
```

Then redeploy:
```bash
cd autoassist-api
fly deploy
```

---

## 📊 Monitoring Setup

### Backend Monitoring
```bash
# View real-time logs
fly logs

# Check metrics
fly dashboard
```

### Set Up Uptime Monitoring
Use services like:
- UptimeRobot (free): https://uptimerobot.com
- Pingdom
- StatusCake

Monitor:
- `https://api.autoassist.ai/health` (every 5 minutes)
- `https://autoassist.ai` (every 5 minutes)

---

## 🐛 Troubleshooting

### Backend Issues

**Issue**: Backend won't start
```bash
# Check logs
fly logs

# Common issues:
# - DATABASE_URL not set
# - SMTP credentials incorrect
# - Port mismatch (should be 8080)
```

**Issue**: Database connection failed
```bash
# Verify DATABASE_URL
fly secrets list

# Test database connection
fly postgres connect -a autoassist-db
```

**Issue**: Emails not sending
```bash
# Verify SMTP settings
fly secrets list | grep SMTP

# Test with curl (see Testing section above)
# Check Yahoo App Password is correct
```

### Frontend Issues

**Issue**: API calls failing (CORS errors)
- Verify `VITE_API_URL` is set correctly
- Check browser console for exact error
- Verify backend CORS allows your domain

**Issue**: Build fails
```bash
# Clear cache and rebuild
rm -rf node_modules .output
npm install
npm run build
```

**Issue**: 404 errors on routes
- Verify `app.config.ts` preset is `cloudflare-pages`
- Check `.output/public` directory exists after build

---

## 🎯 Performance Optimization

### Backend
- ✅ Database connection pooling (max 10)
- ✅ Rate limiting (5 req/hour per IP)
- ✅ Gzip compression enabled
- ✅ Async email sending

### Frontend
- ✅ Vite code splitting
- ✅ Image lazy loading
- ✅ CSS/JS minification
- ✅ Cloudflare global CDN

### Further Optimizations (Optional)
```bash
# Convert images to WebP
cd autoassist-frontend/public/assets
cwebp logo.jpg -o logo.webp
cwebp demo_chat1.png -o demo_chat1.webp
cwebp email_ai.png -o email_ai.webp
```

---

## 📈 Analytics Setup (Optional)

### Plausible Analytics
```bash
# Add to .env
VITE_PLAUSIBLE_DOMAIN=autoassist.ai
```

### Google Analytics
Add to `autoassist-frontend/src/routes/index.tsx`:
```tsx
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</script>
```

---

## 💰 Cost Estimates

### Current Free Tier Setup
| Service | Cost | Limits |
|---------|------|--------|
| Fly.io Backend | $0 | 1 shared CPU, 256MB RAM |
| Fly.io PostgreSQL | $0 | 1GB storage |
| Cloudflare Pages | $0 | Unlimited bandwidth |
| **Total Monthly** | **$0** | Perfect for launch |

### At Scale (1000+ leads/month)
| Service | Cost |
|---------|------|
| Fly.io Backend | $5-10 |
| Fly.io PostgreSQL | $7-15 |
| Cloudflare Pages | $0 |
| **Total Monthly** | **$15-25** |

---

## 🎉 Launch Checklist

### Pre-Launch
- [ ] Backend deployed to Fly.io
- [ ] Frontend deployed to Cloudflare Pages
- [ ] Custom domains configured (api.autoassist.ai, autoassist.ai)
- [ ] SSL certificates active
- [ ] Environment variables set
- [ ] Database migrations run successfully

### Testing
- [ ] Health endpoint returns 200
- [ ] Form submission works end-to-end
- [ ] Welcome email received
- [ ] Admin notification received at autoassist.contact@yahoo.com
- [ ] Mobile responsive verified
- [ ] All navigation links work
- [ ] No console errors

### Monitoring
- [ ] Uptime monitoring configured
- [ ] Log aggregation enabled (Fly.io dashboard)
- [ ] Email deliverability tested
- [ ] Analytics installed (optional)

### Documentation
- [ ] API credentials saved securely
- [ ] Database backup strategy defined
- [ ] Team access configured

---

## 🆘 Support Resources

### Documentation
- Fly.io Docs: https://fly.io/docs/
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- SolidStart: https://start.solidjs.com/

### Commands Reference
```bash
# Backend
fly logs                    # View logs
fly status                  # Check status
fly secrets list            # List secrets
fly deploy                  # Deploy updates
fly postgres connect        # Connect to database

# Frontend
wrangler pages list         # List projects
wrangler pages deployment list  # List deployments
npm run build               # Build locally
npm run dev                 # Test locally
```

### Emergency Rollback
```bash
# Backend
fly releases                # List releases
fly deploy --image <previous-image>  # Rollback

# Frontend
# Use Cloudflare dashboard to rollback to previous deployment
```

---

## ✅ Success Metrics

After deployment, you should see:
- ✅ Backend uptime: 99.9%
- ✅ Page load time: < 1.5s
- ✅ Form conversion rate tracking
- ✅ Email delivery rate: 95%+
- ✅ Zero critical security vulnerabilities
- ✅ Lighthouse scores: 95+ across all categories

---

**Deployment Status**: Ready for Production 🚀

**Estimated Deployment Time**: 1-2 hours (first time)

**Questions?** Review the troubleshooting section or check service documentation.
