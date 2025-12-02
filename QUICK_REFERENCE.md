# 🚀 Quick Reference - Railway PostgreSQL

## Connection Strings

### Local Development
```
postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway
```

### Production (Railway)
```
postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway
```

---

## Quick Commands

### Setup
```bash
./setup-railway-connection.sh    # Interactive setup
./test-railway-connection.sh     # Test connection
./deploy-to-railway.sh           # Deploy to Railway
```

### Local Development
```bash
cp autoassist-api/.env.local autoassist-api/.env
cd autoassist-api && cargo run
curl http://localhost:8080/health
```

### Production Deployment
```bash
cp autoassist-api/.env.railway autoassist-api/.env
cd autoassist-api && railway up
```

---

## Important Files

| File | Purpose |
|------|---------|
| `autoassist-api/.env` | Active configuration (DO NOT COMMIT) |
| `autoassist-api/.env.local` | Local development config |
| `autoassist-api/.env.railway` | Production config |
| `autoassist-api/src/db.rs` | Database connection logic |

---

## Troubleshooting

### Connection Failed
```bash
# Check environment
cat autoassist-api/.env | grep DATABASE_URL

# Test connection
./test-railway-connection.sh

# Use correct config
cp autoassist-api/.env.local autoassist-api/.env  # For local
cp autoassist-api/.env.railway autoassist-api/.env  # For production
```

### Migration Failed
```bash
cd autoassist-api
cargo sqlx migrate run --database-url "postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway"
```

---

## Documentation

- 🇸🇦 **Arabic Guide**: `COMPLETE_RAILWAY_INTEGRATION.md`
- 🇬🇧 **English Guide**: `RAILWAY_SETUP_COMPLETE.md`
- 🎯 **Start Here**: `START_HERE_RAILWAY.md`
- 📋 **Summary**: `FINAL_DELIVERY_SUMMARY.md`

---

## Railway CLI

```bash
railway login        # Login to Railway
railway status       # Check status
railway logs         # View logs
railway open         # Open dashboard
railway domain       # Get deployment URL
```

---

**🎉 Everything is ready! Just run the setup script.**
