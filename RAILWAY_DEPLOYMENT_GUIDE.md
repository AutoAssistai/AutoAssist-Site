# 🚀 دليل النشر على Railway - خطوة بخطوة

## طريقتان للنشر

### ⚡ الطريقة السريعة (موصى بها)

```bash
./deploy-backend-to-railway.sh
```

هذا السكربت سيقوم بكل شيء تلقائياً!

---

### 📝 الطريقة اليدوية (خطوة بخطوة)

إذا أردت فهم كل خطوة أو تنفيذها يدوياً:

#### 1️⃣ انتقل لمجلد Backend
```bash
cd ~/Desktop/AutoAssist_site/autoassist-api
```

#### 2️⃣ تسجيل الدخول إلى Railway
```bash
# تثبيت Railway CLI (إن لم يكن مثبتاً)
curl -fsSL https://railway.app/install.sh | sh

# تسجيل الدخول
railway login
```

#### 3️⃣ ربط المشروع بـ Railway
```bash
# إنشاء مشروع جديد
railway init AutoAssist

# أو ربط مع مشروع موجود
railway link
```

#### 4️⃣ إضافة متغيرات قاعدة البيانات
```bash
railway variables set DATABASE_URL="postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway"
railway variables set DATABASE_PUBLIC_URL="postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway"
railway variables set PGUSER="postgres"
railway variables set PGPASSWORD="bpGdnlJNciDiREFjpuMAafmHCQuWnryg"
railway variables set PGHOST="postgres.railway.internal"
railway variables set PGPORT="5432"
railway variables set PGDATABASE="railway"
```

#### 5️⃣ إضافة متغيرات SMTP (البريد الإلكتروني)
```bash
railway variables set SMTP_HOST="smtp.mail.yahoo.com"
railway variables set SMTP_PORT="465"
railway variables set SMTP_USERNAME="autoassist.contact@yahoo.com"
railway variables set SMTP_PASSWORD="gjrmemjpcqwqiqft"
railway variables set SMTP_FROM="autoassist.contact@yahoo.com"
railway variables set ADMIN_EMAIL="autoassist.contact@yahoo.com"
```

#### 6️⃣ إضافة متغيرات التطبيق
```bash
railway variables set HOST="0.0.0.0"
railway variables set PORT="8080"
railway variables set RUST_LOG="info,sqlx=warn,tower_http=info"
```

#### 7️⃣ التحقق من المتغيرات
```bash
railway variables
```

#### 8️⃣ النشر
```bash
railway up
```

---

## 🔍 مراقبة النشر

### عرض الحالة
```bash
cd autoassist-api
railway status
```

### عرض Logs
```bash
railway logs

# أو للمتابعة المباشرة:
railway logs --follow
```

### فتح Dashboard
```bash
railway open
```

### الحصول على Domain
```bash
railway domain
```

---

## ✅ اختبار النشر

### 1. اختبار Health Endpoint
```bash
# احصل على URL أولاً
DEPLOY_URL=$(railway domain | head -1)

# اختبر
curl https://$DEPLOY_URL/health
```

**النتيجة المتوقعة:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-..."
}
```

### 2. اختبار إنشاء Lead
```bash
curl -X POST https://$DEPLOY_URL/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "اختبار إنتاج",
    "company": "شركة اختبار",
    "website": "test.com",
    "goal": "اختبار النشر",
    "budget": "$5,000+",
    "email": "test@example.com",
    "consent": true
  }'
```

### 3. التحقق من قاعدة البيانات
```bash
# الاتصال من المحلي (للتحقق)
psql postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway

# عرض البيانات
SELECT * FROM leads ORDER BY created_at DESC LIMIT 5;
```

---

## 🔄 تحديث النشر

عند إجراء تغييرات على الكود:

```bash
cd autoassist-api

# Commit التغييرات إلى git
git add .
git commit -m "Update backend"
git push

# إعادة النشر
railway up
```

أو:
```bash
# النشر مباشرة بدون git
cd autoassist-api
railway up
```

---

## 🐛 استكشاف الأخطاء

### المشكلة: "Name or service not known"
**السبب:** استخدام internal host من خارج Railway

**الحل:**
```bash
# تأكد من استخدام internal host في المتغيرات
railway variables set DATABASE_URL="postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway"
```

### المشكلة: "Migration failed"
**الحل:**
```bash
# عرض logs مفصلة
railway logs --follow

# أو تشغيل migrations يدوياً من المحلي
cd autoassist-api
sqlx migrate run --database-url "postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway"
```

### المشكلة: "Build failed"
**الحل:**
```bash
# تأكد من وجود Dockerfile
ls -la Dockerfile

# تأكد من railway.toml
ls -la railway.toml

# تحقق من logs
railway logs
```

### المشكلة: "Service not responding"
**الحل:**
```bash
# تحقق من الحالة
railway status

# أعد التشغيل
railway restart

# تحقق من logs
railway logs --follow
```

---

## 📊 مقارنة البيئات

| الجانب | Local Dev | Railway Production |
|--------|-----------|-------------------|
| **Host** | tramway.proxy.rlwy.net | postgres.railway.internal |
| **Port** | 55133 | 5432 |
| **DATABASE_URL** | يستخدم TCP proxy | يستخدم internal network |
| **ملف .env** | .env.local | متغيرات Railway Dashboard |
| **Migrations** | يدوية أو تلقائية | تلقائية عند البدء |
| **Logs** | terminal | railway logs |

---

## 🔐 الأمان

### ⚠️ ملاحظات مهمة:
1. **لا تضع كلمات مرور في git**
   - ملف `.env` موجود في `.gitignore`
   - استخدم Railway Dashboard للأسرار

2. **استخدم متغيرات Railway Dashboard**
   - أضف المتغيرات في Dashboard
   - لا تعتمد على ملفات .env في الإنتاج

3. **دوّر كلمات المرور بانتظام**
   - غيّر كلمات المرور من Railway Dashboard
   - حدّث المتغيرات في التطبيق

---

## 📱 ربط Frontend

بعد نشر Backend، حدّث Frontend:

```bash
cd ../autoassist-frontend

# عدّل .env
echo "VITE_API_URL=https://YOUR_RAILWAY_DOMAIN" > .env

# أو عدّل يدوياً
nano .env
```

ثم انشر Frontend (Cloudflare Pages، Vercel، إلخ)

---

## ✅ Checklist النشر

قبل النشر:
- [ ] تم تسجيل الدخول إلى Railway
- [ ] تم ربط المشروع
- [ ] تم تكوين جميع المتغيرات
- [ ] تم اختبار المشروع محلياً

بعد النشر:
- [ ] اختبار health endpoint
- [ ] اختبار API endpoints
- [ ] التحقق من logs
- [ ] التحقق من قاعدة البيانات
- [ ] تحديث Frontend URL

---

## 🎯 الأوامر الأكثر استخداماً

```bash
# النشر
cd autoassist-api && railway up

# عرض logs
railway logs --follow

# عرض الحالة
railway status

# إعادة التشغيل
railway restart

# فتح Dashboard
railway open

# عرض المتغيرات
railway variables

# الحصول على Domain
railway domain
```

---

## 🚀 النشر التلقائي من Git

لتفعيل النشر التلقائي عند push:

1. اذهب إلى Railway Dashboard
2. اختر مشروعك
3. Settings → Deploy
4. Enable "Deploy on Git Push"
5. اختر الـ branch (مثلاً: main)

الآن كل push سيؤدي لنشر تلقائي!

---

## 📚 مراجع إضافية

- [Railway Documentation](https://docs.railway.app)
- [Railway CLI Reference](https://docs.railway.app/develop/cli)
- [Railway PostgreSQL](https://docs.railway.app/databases/postgresql)

---

**🎉 مبروك! Backend جاهز للنشر على Railway!**

**للنشر الآن:**
```bash
./deploy-backend-to-railway.sh
```
