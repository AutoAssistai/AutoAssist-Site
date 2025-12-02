#!/bin/bash
# Professional Email Template Testing Script

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║          AutoAssist.ai - Professional Email Testing                          ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if backend is running
if ! curl -s http://localhost:8080/health > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠${NC}  Backend not running. Please start it first:"
    echo "   cd autoassist-api && cargo run"
    exit 1
fi

echo -e "${GREEN}✓${NC} Backend is running"
echo ""

# Test email template
echo "Sending test email with professional HTML template..."
echo ""

curl -X POST http://localhost:8080/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User (Professional Template)",
    "company": "Test Company LLC",
    "website": "https://testcompany.com",
    "goal": "Testing the new professional HTML email template with beautiful design, responsive layout, and strong CTA",
    "budget": "1500-3000",
    "email": "test@example.com",
    "phone": "+1-555-0123",
    "consent": true,
    "utm_source": "email_test",
    "utm_medium": "test",
    "utm_campaign": "professional_template_test",
    "utm_content": "html_email",
    "utm_term": "test"
  }' | python3 -m json.tool

echo ""
echo ""
echo -e "${GREEN}✓${NC} Test email sent!"
echo ""
echo "📧 Check these inboxes:"
echo "   1. Admin: autoassist.contact@yahoo.com"
echo "      - Look for: [New Lead] Test User (Professional Template) — Test Company LLC — 1500-3000"
echo "      - Should have: Professional HTML with green gradient header"
echo ""
echo "   2. User: test@example.com"
echo "      - Look for: Your Free Homepage Preview is Coming! 🎉"
echo "      - Should have: Professional HTML with brand colors and CTA button"
echo ""
echo "✅ Email Features:"
echo "   • HTML + Plain text multipart"
echo "   • Responsive design (mobile + desktop)"
echo "   • Brand colors (#D6B56F gold, #0B0B0C black)"
echo "   • Strong CTA button (View Our Packages)"
echo "   • Professional formatting with tables"
echo "   • Timeline visualization"
echo "   • Project summary box"
echo "   • Anti-spam headers"
echo "   • Retry logic (3 attempts)"
echo ""
echo "⚠️  If emails don't arrive:"
echo "   1. Check spam/junk folder"
echo "   2. Check backend logs: tail -f backend.log"
echo "   3. Verify SMTP settings in .env"
echo "   4. Check Yahoo App Password is correct"
echo ""
