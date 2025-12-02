# Fly.io Deployment Guide (Rust API)

This guide covers deploying the AutoAssist.ai Rust backend API to Fly.io.

## Prerequisites

- Fly.io account (sign up at https://fly.io)
- Fly CLI installed
- Docker installed (for local testing)

## Initial Setup

### 1. Install Fly CLI

**macOS/Linux:**
```bash
curl -L https://fly.io/install.sh | sh
```

**Windows (PowerShell):**
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

### 2. Login to Fly.io

```bash
fly auth login
```

### 3. Create Fly.io App

```bash
cd autoassist-api
fly launch --no-deploy
```

Answer the prompts:
- App name: `autoassist-api` (or your preferred name)
- Region: Choose closest to your users (e.g., `iad` for US East)
- PostgreSQL: Yes (or use external database)
- Redis: No

## Database Setup

### Option 1: Fly.io Postgres (Recommended)

```bash
# Create Postgres cluster
fly postgres create --name autoassist-db --region iad

# Attach to your app
fly postgres attach autoassist-db --app autoassist-api
```

This automatically sets the `DATABASE_URL` secret.

### Option 2: External Database

Use a managed Postgres service (AWS RDS, Supabase, Neon, etc.):

```bash
fly secrets set DATABASE_URL="postgresql://user:pass@host:5432/dbname"
```

## Set Secrets

Set all required environment variables:

```bash
fly secrets set \
  SMTP_HOST="smtp.sendgrid.net" \
  SMTP_PORT="587" \
  SMTP_USERNAME="apikey" \
  SMTP_PASSWORD="your_sendgrid_api_key" \
  SMTP_FROM="hello@autoassist.ai" \
  ADMIN_EMAIL="hello@autoassist.ai"
```

## Deploy

### First Deployment

```bash
fly deploy
```

This will:
1. Build Docker image
2. Push to Fly.io registry
3. Run database migrations
4. Deploy to production

### Subsequent Deployments

```bash
fly deploy
```

## Custom Domain Setup

### 1. Add Certificate

```bash
fly certs add api.autoassist.ai
```

### 2. Update DNS Records

Add the following DNS records to your domain:

```
Type: CNAME
Name: api
Content: autoassist-api.fly.dev
TTL: Auto
```

### 3. Verify Certificate

```bash
fly certs show api.autoassist.ai
```

Wait for certificate to be issued (usually < 5 minutes).

## Scaling

### Vertical Scaling (Increase Resources)

```bash
# Increase memory
fly scale memory 1024

# Increase CPU
fly scale vm shared-cpu-2x
```

### Horizontal Scaling (More Instances)

```bash
# Scale to 2 instances
fly scale count 2

# Scale to 3 instances in specific regions
fly scale count 3 --region iad,lhr
```

### Auto-scaling

```bash
# Scale between 1-5 instances based on load
fly autoscale set min=1 max=5
```

## Monitoring

### View Logs

```bash
# Real-time logs
fly logs

# Last 100 lines
fly logs --tail 100
```

### Check Status

```bash
fly status
```

### View Metrics

```bash
fly dashboard
```

Or visit: https://fly.io/apps/autoassist-api/metrics

## Database Management

### Run Migrations

Migrations run automatically on deploy, but you can run manually:

```bash
fly ssh console --app autoassist-api
./autoassist-api # migrations run on startup
```

### Access Database

```bash
# Connect to Postgres
fly postgres connect --app autoassist-db

# Run psql commands
\dt    # List tables
SELECT COUNT(*) FROM leads;
```

### Backup Database

```bash
# Create backup
fly postgres backup create --app autoassist-db

# List backups
fly postgres backup list --app autoassist-db
```

## Health Checks

Health checks are configured in `fly.toml`:

```toml
[[services.http_checks]]
  interval = "10s"
  timeout = "2s"
  method = "get"
  path = "/health"
```

Test manually:
```bash
curl https://autoassist-api.fly.dev/health
```

## Secrets Management

### List Secrets

```bash
fly secrets list
```

### Update Secret

```bash
fly secrets set SMTP_PASSWORD="new_password"
```

### Remove Secret

```bash
fly secrets unset SECRET_NAME
```

## Staging Environment

### Create Staging App

```bash
fly apps create autoassist-api-staging --org personal
```

### Deploy to Staging

```bash
fly deploy --app autoassist-api-staging --config fly.staging.toml
```

### Staging Secrets

```bash
fly secrets set --app autoassist-api-staging \
  DATABASE_URL="postgresql://..." \
  SMTP_PASSWORD="staging_key"
```

## Troubleshooting

### Deployment Fails

**Check build logs:**
```bash
fly logs
```

**Common issues:**
- Database connection failed (check `DATABASE_URL`)
- Migration errors (verify migration files)
- Build timeout (increase resources temporarily)

### High Memory Usage

```bash
# Check current usage
fly status

# Scale memory
fly scale memory 1024
```

### Connection Refused

- Verify app is running: `fly status`
- Check health endpoint: `fly checks list`
- Review logs: `fly logs`

### SSL Certificate Issues

```bash
# Check certificate status
fly certs show api.autoassist.ai

# Remove and re-add certificate
fly certs remove api.autoassist.ai
fly certs add api.autoassist.ai
```

## Cost Estimation

Fly.io Pricing (as of 2024):

**Free Tier Allowances:**
- 3 shared-cpu-1x 256MB VMs
- 160GB storage
- 160GB outbound data transfer

**Typical Production Setup:**
- API: 1x shared-cpu-1x 512MB ($3.50/month)
- Postgres: 1x shared-cpu-1x 256MB ($0/month, within free tier)
- Storage: 10GB ($0.15/GB/month = $1.50)
- Bandwidth: ~50GB/month ($0/month, within free tier)

**Total: ~$5/month**

For higher traffic:
- 2x shared-cpu-2x 1GB: ~$25/month
- Load balancing: Included
- SSL certificates: Free

## Performance Tips

1. **Enable Connection Pooling:**
   - Already configured in `src/db.rs`
   - Max 10 connections by default

2. **Use Fly Regions Wisely:**
   - Deploy in multiple regions for global users
   - `fly regions add lhr syd` (London, Sydney)

3. **Cache Static Assets:**
   - Already handled by frontend CDN
   - API focuses on dynamic requests

4. **Monitor Performance:**
   ```bash
   fly dashboard
   ```

## CI/CD Integration

The project includes GitHub Actions workflow in `ci/backend.yml`:

1. **Copy workflow:**
   ```bash
   mkdir -p .github/workflows
   cp ci/backend.yml .github/workflows/
   ```

2. **Add GitHub Secret:**
   - Go to repository Settings → Secrets
   - Add `FLY_API_TOKEN`
   - Get token: `fly auth token`

3. **Automatic Deployment:**
   - Push to `main` → deploys to production
   - Push to `develop` → deploys to staging

## Rollback

### Rollback to Previous Version

```bash
# List deployments
fly releases

# Rollback to previous version
fly releases rollback
```

### Deploy Specific Version

```bash
fly deploy --image-label v123
```

## Support Resources

- **Fly.io Docs**: https://fly.io/docs/
- **Community**: https://community.fly.io/
- **Status**: https://status.fly.io/

## Additional Commands

```bash
# Open app in browser
fly open

# SSH into machine
fly ssh console

# Restart app
fly apps restart

# Destroy app (careful!)
fly apps destroy autoassist-api
```

## Alternative: Render Deployment

If you prefer Render over Fly.io:

1. Connect GitHub repository
2. Create "Web Service"
3. Settings:
   - Build Command: `cargo build --release`
   - Start Command: `./target/release/autoassist-api`
   - Environment: Add all secrets
4. Deploy

Render pricing: Free tier available, $7/month for production.
