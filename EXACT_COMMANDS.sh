#!/bin/bash
# الأوامر الدقيقة للنشر على Railway

echo "════════════════════════════════════════════════════════════"
echo "🚀 نشر AutoAssist على Railway - خطوة بخطوة"
echo "════════════════════════════════════════════════════════════"
echo ""

echo "⚠️  ملاحظة: بعض الخطوات تحتاج Railway Dashboard"
echo ""

echo "────────────────────────────────────────────────────────────"
echo "الخطوة 1: افتح Railway Dashboard في المتصفح"
echo "────────────────────────────────────────────────────────────"
echo ""
echo "انسخ هذا الرابط:"
echo "https://railway.app/project/c4a9addb-7399-45ee-9d60-ef19c83f316b"
echo ""
read -p "اضغط Enter بعد فتح الرابط..."

echo ""
echo "────────────────────────────────────────────────────────────"
echo "الخطوة 2: في Railway Dashboard"
echo "────────────────────────────────────────────────────────────"
echo ""
echo "1. اضغط زر 'New' (أزرق)"
echo "2. اختر 'Empty Service'"
echo "3. اكتب الاسم: Backend"
echo ""
read -p "اضغط Enter بعد إنشاء Service..."

echo ""
echo "────────────────────────────────────────────────────────────"
echo "الخطوة 3: اضبط Settings"
echo "────────────────────────────────────────────────────────────"
echo ""
echo "في service 'Backend':"
echo "  → اضغط Settings"
echo "  → قسم Deploy:"
echo "     - Builder: Dockerfile"
echo "     - Dockerfile Path: اكتب 'Dockerfile'"
echo "     - Start Command: اكتب './autoassist-api'"
echo "  → اضغط Save"
echo ""
read -p "اضغط Enter بعد حفظ Settings..."

echo ""
echo "────────────────────────────────────────────────────────────"
echo "الخطوة 4: أضف Variables"
echo "────────────────────────────────────────────────────────────"
echo ""
echo "في Settings → Variables → Add Variables:"
echo ""
echo "انسخ والصق هذه المتغيرات واحدة واحدة:"
echo ""
cat << 'VARS'
DATABASE_URL=postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=465
SMTP_USERNAME=autoassist.contact@yahoo.com
SMTP_PASSWORD=gjrmemjpcqwqiqft
SMTP_FROM=autoassist.contact@yahoo.com
ADMIN_EMAIL=autoassist.contact@yahoo.com
HOST=0.0.0.0
PORT=8080
RUST_LOG=info,sqlx=warn
VARS

echo ""
read -p "اضغط Enter بعد إضافة Variables..."

echo ""
echo "────────────────────────────────────────────────────────────"
echo "الخطوة 5: Deploy من Terminal"
echo "────────────────────────────────────────────────────────────"
echo ""
echo "الآن سأقوم بالنشر..."
echo ""

cd ~/Desktop/AutoAssist_site/autoassist-api

echo "ربط Service..."
echo ""
echo "⚠️  سيظهر لك قائمة - اختر Service 'Backend'"
echo ""

railway service || echo "يرجى تشغيل: railway service يدوياً واختيار Backend"

echo ""
echo "النشر الآن..."
railway up

echo ""
echo "════════════════════════════════════════════════════════════"
echo "✅ تم! انتظر 10 دقائق للبناء"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "لمراقبة العملية:"
echo "  railway logs"
echo ""
echo "للحصول على URL:"
echo "  railway domain"
echo ""
