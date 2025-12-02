# Cloudflare Pages Deployment Guide

This guide covers deploying the AutoAssist.ai frontend to Cloudflare Pages.

## Prerequisites

- Cloudflare account
- Wrangler CLI installed (`npm install -g wrangler`)
- GitHub repository connected to Cloudflare Pages

## Method 1: Automatic Deployment (Recommended)

### Setup

1. **Connect GitHub to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to Pages
   - Click "Create a project"
   - Select "Connect to Git"
   - Authorize GitHub and select your repository

2. **Configure Build Settings:**
   ```
   Framework preset: None
   Build command: cd autoassist-frontend && npm install && npm run build
   Build output directory: autoassist-frontend/.output/public
   Root directory: /
   ```

3. **Set Environment Variables:**
   - `VITE_API_URL`: Your API URL (e.g., `https://api.autoassist.ai`)
   - `VITE_PLAUSIBLE_DOMAIN`: `autoassist.ai`
   - `VITE_HCAPTCHA_SITE_KEY`: Your hCaptcha site key

4. **Deploy:**
   - Push to `main` branch for production
   - Push to `develop` branch for staging

## Method 2: Manual Deployment via CLI

### Initial Setup

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Navigate to frontend directory
cd autoassist-frontend
```

### Deploy to Production

```bash
# Build
npm run build

# Deploy
wrangler pages deploy .output/public --project-name=autoassist --branch=main
```

### Deploy to Staging

```bash
# Build
npm run build

# Deploy
wrangler pages deploy .output/public --project-name=autoassist-staging --branch=develop
```

### Using the Deploy Script

```bash
# Make script executable
chmod +x deploy/cloudflare/deploy.sh

# Deploy to staging
./deploy/cloudflare/deploy.sh staging

# Deploy to production
./deploy/cloudflare/deploy.sh production
```

## Method 3: GitHub Actions (Automated CI/CD)

The project includes GitHub Actions workflows in `ci/frontend.yml`:

1. **Copy workflows to `.github/workflows/`:**
   ```bash
   mkdir -p .github/workflows
   cp ci/frontend.yml .github/workflows/
   ```

2. **Add GitHub Secrets:**
   - Go to repository Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
     - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
     - `VITE_API_URL`: Your API URL

3. **Automatic Deployment:**
   - Push to `develop` → deploys to staging
   - Push to `main` → deploys to production

## Custom Domain Setup

### 1. Add Domain to Cloudflare

- Go to your Cloudflare Pages project
- Navigate to "Custom domains"
- Add your domain (e.g., `autoassist.ai`)
- Add `www` subdomain if desired

### 2. Update DNS Records

Cloudflare will automatically create DNS records:

```
Type: CNAME
Name: autoassist.ai (or @)
Content: autoassist.pages.dev
Proxy: Enabled (orange cloud)
```

### 3. SSL/TLS Configuration

- Go to SSL/TLS → Overview
- Set encryption mode to "Full (strict)"
- Enable "Always Use HTTPS"

## Environment Variables

Set these in Cloudflare Pages dashboard:

| Variable                | Production Value           | Staging Value                     |
| ----------------------- | -------------------------- | --------------------------------- |
| VITE_API_URL            | https://api.autoassist.ai  | https://api-staging.autoassist.ai |
| VITE_PLAUSIBLE_DOMAIN   | autoassist.ai              | staging.autoassist.ai             |
| VITE_HCAPTCHA_SITE_KEY  | your_production_key        | your_staging_key                  |

## Performance Optimization

Cloudflare Pages automatically provides:

- **Global CDN**: Content served from 200+ data centers
- **HTTP/3**: Latest protocol support
- **Brotli Compression**: Automatic compression
- **Smart Caching**: Intelligent edge caching
- **DDoS Protection**: Built-in protection

## Monitoring

### Analytics

- Go to Cloudflare Pages → Analytics
- View requests, bandwidth, and errors

### Real User Monitoring (RUM)

Enable Web Analytics:
- Go to Analytics → Web Analytics
- Add your site
- Copy the tracking code (already configured if using Plausible)

## Rollback

To rollback to a previous deployment:

1. Go to Cloudflare Pages dashboard
2. Navigate to "Deployments"
3. Find the previous successful deployment
4. Click "..." → "Rollback to this deployment"

## Troubleshooting

### Build Fails

**Check build logs:**
- Go to Cloudflare Pages → Deployments
- Click on the failed deployment
- Review the build log

**Common issues:**
- Node version mismatch (specify in `.nvmrc` or environment variable)
- Missing dependencies (check `package.json`)
- Build command incorrect

### 404 Errors

Ensure build output directory is correct:
```
autoassist-frontend/.output/public
```

### Environment Variables Not Working

- Double-check variable names (case-sensitive)
- Redeploy after updating environment variables
- Variables are only available at build time (must start with `VITE_`)

### Custom Domain Not Working

- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct
- Check SSL/TLS settings
- Clear browser cache

## Cost Estimation

Cloudflare Pages Free Tier:
- 500 builds per month
- Unlimited requests
- Unlimited bandwidth
- 100 custom domains

Typical usage for AutoAssist.ai: **$0/month** (within free tier)

## Support

- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **Community**: https://community.cloudflare.com/
- **Status**: https://www.cloudflarestatus.com/

## Additional Resources

- [Cloudflare Pages Pricing](https://pages.cloudflare.com/#pricing)
- [Deploy a SolidStart site](https://developers.cloudflare.com/pages/framework-guides/deploy-a-solidstart-site/)
- [Custom domains](https://developers.cloudflare.com/pages/platform/custom-domains/)
