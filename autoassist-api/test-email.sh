#!/bin/bash
# Test email sending script for AutoAssist.ai

echo "🧪 Testing SMTP Email Configuration..."
echo ""
echo "Configuration:"
echo "  SMTP Host: smtp.mail.yahoo.com"
echo "  SMTP Port: 465 (SSL)"
echo "  From/To: autoassist.contact@yahoo.com"
echo ""

# Test the API health endpoint first
echo "1️⃣ Testing backend health..."
curl -s http://localhost:8080/health | jq . || echo "⚠️  Backend not running. Start with: cargo run"
echo ""

# Test email sending via API
echo "2️⃣ Sending test email via API..."
curl -X POST http://localhost:8080/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "company": "Test Company",
    "website": "test.com",
    "goal": "Testing email configuration",
    "budget": "under-1500",
    "email": "test@example.com",
    "phone": "+1234567890",
    "consent": true,
    "utm_source": "test",
    "utm_medium": "test",
    "utm_campaign": "test",
    "utm_content": "",
    "utm_term": ""
  }' | jq .

echo ""
echo "✅ Test complete!"
echo ""
echo "📧 Check your inbox at: autoassist.contact@yahoo.com"
echo "   - Admin notification with test lead details"
echo "   - Welcome email sent to test@example.com"
echo ""
echo "⚠️  If emails don't arrive:"
echo "   1. Check spam folder"
echo "   2. Verify Yahoo App Password is correct"
echo "   3. Check backend logs: cargo run (look for email errors)"
echo "   4. Ensure port 465 is not blocked by firewall"
