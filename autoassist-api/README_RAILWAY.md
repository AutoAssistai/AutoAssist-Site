# Railway PostgreSQL Integration - AutoAssist.ai Backend

## Quick Start

### Local Development
```bash
# From project root
cp autoassist-api/.env.local autoassist-api/.env

# Or use setup wizard
../setup-railway-connection.sh  # Choose option 1

# Run the application
cargo run
```

### Production Deployment
```bash
# From project root
../deploy-to-railway.sh

# Or manually
railway up
```

## Database Connection

### Local Development (TCP Proxy)
```
Host: tramway.proxy.rlwy.net
Port: 55133
Database: railway
User: postgres
Password: bpGdnlJNciDiREFjpuMAafmHCQuWnryg
```

### Production (Internal Network)
```
Host: postgres.railway.internal
Port: 5432
Database: railway
User: postgres
Password: bpGdnlJNciDiREFjpuMAafmHCQuWnryg
```

## Environment Variables

See `.env.local` for local development or `.env.railway` for production.

## Testing

```bash
# Test database connection
../test-railway-connection.sh

# Test API
cargo run
# In another terminal:
curl http://localhost:8080/health
```

## Documentation

- Full guide (English): `../RAILWAY_SETUP_COMPLETE.md`
- Full guide (Arabic): `../COMPLETE_RAILWAY_INTEGRATION.md`
- Start here: `../START_HERE_RAILWAY.md`
