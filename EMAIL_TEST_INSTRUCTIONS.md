# 📧 Email Testing Instructions

## Quick Email Test (2 Minutes)

### Prerequisites
- Backend code downloaded/cloned
- Rust installed (`cargo --version`)
- `.env` file configured (already done ✅)

---

## Test Method 1: Automated Script (Easiest)

```bash
# Step 1: Start the backend
cd autoassist-api
cargo run

# Step 2: In a NEW terminal, run test script
cd autoassist-api
./test-email.sh
```

**Expected Output:**
```
🧪 Testing SMTP Email Configuration...

Configuration:
  SMTP Host: smtp.mail.yahoo.com
  SMTP Port: 465 (SSL)
  From/To: autoassist.contact@yahoo.com

1️⃣ Testing backend health...
{"status":"healthy","version":"1.0.0","timestamp":"..."}

2️⃣ Sending test email via API...
{
  "success": true,
  "message": "Thank you! We'll send your free homepage preview within 24-48 hours.",
  "lead_id": "..."
}

✅ Test complete!
```

**Check Your Inbox:**
- Go to: autoassist.contact@yahoo.com
- Look for: "[New Lead] Test User — Test Company — under-1500"
- Should arrive within 30 seconds

---

## Test Method 2: Manual cURL (If Script Fails)

```bash
# Step 1: Start backend
cd autoassist-api
cargo run

# Step 2: In another terminal, send test request
curl -X POST http://localhost:8080/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "company": "Test Company",
    "website": "test.com",
    "goal": "Testing email system",
    "budget": "under-1500",
    "email": "your.email@example.com",
    "phone": "+1234567890",
    "consent": true,
    "utm_source": "test",
    "utm_medium": "test",
    "utm_campaign": "test",
    "utm_content": "",
    "utm_term": ""
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Thank you! We'll send your free homepage preview within 24-48 hours.",
  "lead_id": "uuid-here"
}
```

---

## Test Method 3: From Frontend (Full Stack Test)

```bash
# Step 1: Start backend
cd autoassist-api
cargo run

# Step 2: In another terminal, start frontend
cd autoassist-frontend
npm run dev

# Step 3: Open browser
# Go to: http://localhost:3000
# Fill out contact form
# Submit
# Check email at: autoassist.contact@yahoo.com
```

---

## What Emails to Expect

### Email 1: Admin Notification
**To:** autoassist.contact@yahoo.com  
**Subject:** [New Lead] Test User — Test Company — under-1500  
**Content:**
```
New preview request submitted:

CONTACT:
- Name: Test User
- Company: Test Company
- Email: your.email@example.com
- Phone: +1234567890

PROJECT:
- Website/Instagram: test.com
- Goal: Testing email system
- Budget: under-1500

TRACKING:
UTM Source: test
UTM Medium: test
...
```

### Email 2: Welcome Email (to user)
**To:** your.email@example.com  
**Subject:** Your Free Homepage Preview is Coming (24–48 hours)  
**Content:**
```
Hi Test User,

Thanks for requesting a free homepage preview from AutoAssist.ai!

What happens next:
1. We'll review your brief and current online presence
2. Our design team will create a custom homepage concept for Test Company
3. You'll receive the full mockup (desktop + mobile) within 24–48 hours
...
```

---

## Troubleshooting

### Problem: Backend Won't Start

**Error:** `DATABASE_URL must be set`
**Solution:** 
```bash
cd autoassist-api
# Check if .env exists
ls -la .env
# If missing, it should have been created. Check content:
cat .env
```

**Error:** `SMTP_HOST must be set`
**Solution:** Same as above - verify .env file exists and has correct values

---

### Problem: Email Not Sending

**Check 1: Verify Configuration**
```bash
cd autoassist-api
grep SMTP .env

# Should show:
# SMTP_HOST=smtp.mail.yahoo.com
# SMTP_PORT=465
# SMTP_USERNAME=autoassist.contact@yahoo.com
# SMTP_PASSWORD=gjrmemjpcqwqiqft
```

**Check 2: Look at Backend Logs**
```bash
cd autoassist-api
RUST_LOG=debug cargo run

# Look for lines like:
# "Email sent successfully"
# OR error messages
```

**Check 3: Test SMTP Connection**
```bash
# Test if port 465 is accessible
telnet smtp.mail.yahoo.com 465

# If connection refused, your firewall may block port 465
# Try changing to port 587 in .env:
# SMTP_PORT=587
```

**Check 4: Verify Yahoo App Password**
- Password: `gjrmemjpcqwqiqft`
- If expired, generate new at: https://login.yahoo.com/account/security
- Update in `.env` file

---

### Problem: Email Goes to Spam

**Solutions:**
1. Check Yahoo Mail spam folder
2. Add `autoassist.contact@yahoo.com` to contacts
3. Mark previous emails as "Not Spam"
4. Yahoo may flag first few emails - this is normal

---

### Problem: Rate Limit Hit

**Error:** "Too many requests"
**Solution:** Backend limits to 5 submissions per hour per IP
- Wait 1 hour
- OR restart backend to reset counter (dev only)
- OR test from different IP address

---

## Backend Logs to Watch For

### Success Messages:
```
✓ "Configuration loaded"
✓ "Database connected"  
✓ "Database migrations completed"
✓ "Server listening on 0.0.0.0:8080"
✓ "Creating new lead"
✓ "Lead created successfully"
✓ "Welcome email sent successfully"
✓ "Admin notification sent successfully"
```

### Error Messages:
```
✗ "SMTP relay error" - Check SMTP host/port
✗ "Authentication failed" - Check username/password
✗ "Failed to send email" - Check connection/firewall
✗ "Invalid from email" - Check SMTP_FROM in .env
✗ "Database connection failed" - Check DATABASE_URL
```

---

## Quick Verification Checklist

Before testing:
- [ ] Backend `.env` file exists
- [ ] SMTP_HOST = smtp.mail.yahoo.com
- [ ] SMTP_PORT = 465
- [ ] SMTP_USERNAME = autoassist.contact@yahoo.com
- [ ] SMTP_PASSWORD = gjrmemjpcqwqiqft
- [ ] Backend starts without errors
- [ ] Health endpoint responds: `curl http://localhost:8080/health`

After testing:
- [ ] API returns success message
- [ ] Admin email arrives at autoassist.contact@yahoo.com
- [ ] Welcome email sent to test address
- [ ] No errors in backend logs
- [ ] Both emails arrive within 30 seconds

---

## Production Testing (After Deployment)

```bash
# Test production API
curl -X POST https://autoassist-api.fly.dev/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Production Test",
    "company": "Test Co",
    "website": "test.com",
    "goal": "Testing production",
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

**Check:** Email at autoassist.contact@yahoo.com

---

## Email Delivery Times

| Environment | Expected Time | Typical Time |
|-------------|---------------|--------------|
| Local | 2-5 seconds | 3 seconds |
| Production | 5-30 seconds | 10 seconds |
| Peak Hours | 10-60 seconds | 20 seconds |

**Note:** First email may take longer as connections are established.

---

## Support

If emails still not working after troubleshooting:

1. **Check Yahoo Account**
   - Login at mail.yahoo.com
   - Verify account not locked/suspended
   - Check if 2FA enabled
   - Verify App Password is active

2. **Test Alternative Port**
   - Change `SMTP_PORT=587` in .env
   - Restart backend
   - Try again

3. **Check Firewall**
   - Ensure ports 465 or 587 not blocked
   - Check corporate/network firewalls
   - Try different network if possible

4. **Review Full Logs**
   ```bash
   RUST_LOG=debug cargo run 2>&1 | tee backend.log
   # Send test email
   # Review backend.log for detailed errors
   ```

---

## Success! 🎉

When you see:
- ✅ "Admin notification sent successfully" in logs
- ✅ Email in autoassist.contact@yahoo.com inbox
- ✅ No errors in backend

**You're ready to deploy to production!**

Follow: `QUICK_START_DEPLOYMENT.md`
