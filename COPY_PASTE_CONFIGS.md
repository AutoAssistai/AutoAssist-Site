# 📋 نسخ ولصق مباشر - Railway PostgreSQL مع متغيراتك

## ملف .env للتطوير المحلي

```env
# Server Configuration
HOST=0.0.0.0
PORT=8080

# Railway PostgreSQL - External Connection (TCP Proxy for Local Dev)
DATABASE_URL=postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway

# PostgreSQL Variables
PGUSER=postgres
PGPASSWORD=bpGdnlJNciDiREFjpuMAafmHCQuWnryg
PGDATABASE=railway
PGHOST=tramway.proxy.rlwy.net
PGPORT=55133
PGDATA=/var/lib/postgresql/data/pgdata

# Logging (verbose for development)
RUST_LOG=debug,sqlx=debug,tower_http=debug
```

**استخدام:** انسخ هذا إلى `autoassist-api/.env` للتطوير المحلي

---

## ملف .env.railway للإنتاج

```env
# Server Configuration
HOST=0.0.0.0
PORT=8080

# Railway PostgreSQL - Internal Network (Production Only)
DATABASE_URL=postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway

# PostgreSQL Variables
PGUSER=postgres
PGPASSWORD=bpGdnlJNciDiREFjpuMAafmHCQuWnryg
PGDATABASE=railway
PGHOST=postgres.railway.internal
PGPORT=5432
PGDATA=/var/lib/postgresql/data/pgdata

# Logging (production level)
RUST_LOG=info,sqlx=warn,tower_http=info
```

**استخدام:** انسخ هذا إلى `autoassist-api/.env` قبل النشر على Railway

---

## أمر اختبار الاتصال بـ psql

```bash
# اختبار الاتصال الخارجي (للتطوير المحلي)
PGPASSWORD=bpGdnlJNciDiREFjpuMAafmHCQuWnryg psql \
  -h tramway.proxy.rlwy.net \
  -p 55133 \
  -U postgres \
  -d railway \
  -c "SELECT version();"
```

---

## متغيرات Railway Dashboard (للنسخ واللصق)

انسخ هذه المتغيرات إلى Railway Dashboard → Variables:

```
HOST=0.0.0.0
PORT=8080
DATABASE_URL=postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway
PGUSER=postgres
PGPASSWORD=bpGdnlJNciDiREFjpuMAafmHCQuWnryg
PGDATABASE=railway
PGHOST=postgres.railway.internal
PGPORT=5432
RUST_LOG=info,sqlx=warn
```

---

## اختبار سريع (نسخ ولصق)

```bash
# 1. إعداد للتطوير المحلي
cp autoassist-api/.env.local autoassist-api/.env

# 2. تشغيل المشروع
cd autoassist-api
cargo run

# 3. في نافذة أخرى - اختبار API
curl http://localhost:8080/health

# 4. اختبار إنشاء lead
curl -X POST http://localhost:8080/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "اختبار",
    "company": "شركة اختبار",
    "website": "test.com",
    "goal": "اختبار الاتصال",
    "budget": "$5,000+",
    "email": "test@test.com",
    "consent": true
  }'
```

---

## sqlx-cli commands (للاستخدام المباشر)

```bash
# تثبيت sqlx-cli
cargo install sqlx-cli --no-default-features --features postgres

# إنشاء migration جديد
sqlx migrate add create_new_table

# تشغيل migrations يدوياً
sqlx migrate run --database-url "postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway"

# التراجع عن آخر migration
sqlx migrate revert --database-url "postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway"

# عرض حالة migrations
sqlx migrate info --database-url "postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway"
```

---

## استعلامات PostgreSQL مباشرة

```bash
# الاتصال بقاعدة البيانات
psql postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway

# بعد الاتصال، استخدم هذه الأوامر:
```

```sql
-- عرض جميع الجداول
\dt

-- عرض structure جدول leads
\d leads

-- عرض جميع السجلات
SELECT * FROM leads;

-- عدد السجلات
SELECT COUNT(*) FROM leads;

-- آخر 10 سجلات
SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;

-- البحث بالإيميل
SELECT * FROM leads WHERE email = 'test@example.com';

-- حذف بيانات الاختبار
DELETE FROM leads WHERE email LIKE '%test%';

-- الخروج
\q
```

---

## Docker commands (للتطوير المحلي)

```bash
# بناء الصورة
docker build -t autoassist-api .

# تشغيل مع .env.local
docker run -p 8080:8080 --env-file autoassist-api/.env.local autoassist-api

# تشغيل مع متغيرات مباشرة
docker run -p 8080:8080 \
  -e DATABASE_URL="postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway" \
  -e HOST="0.0.0.0" \
  -e PORT="8080" \
  autoassist-api
```

---

## Railway CLI commands

```bash
# تثبيت Railway CLI
curl -fsSL https://railway.app/install.sh | sh

# تسجيل الدخول
railway login

# ربط مع مشروع موجود
railway link

# عرض المتغيرات
railway variables

# تعيين متغير
railway variables set DATABASE_URL="postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway"

# النشر
railway up

# عرض Logs
railway logs

# عرض الحالة
railway status

# فتح Dashboard
railway open

# الحصول على domain
railway domain
```

---

## Git commands (للحفاظ على الأمان)

```bash
# التأكد من أن .env في .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore

# التحقق من الملفات التي سيتم رفعها
git status

# إضافة الملفات (بدون .env)
git add .
git commit -m "Add Railway PostgreSQL integration"
git push origin main
```

---

## أوامر Cargo مفيدة

```bash
# بناء للإنتاج
cargo build --release

# تشغيل مع release mode
cargo run --release

# فحص الأخطاء بدون بناء
cargo check

# تحديث dependencies
cargo update

# عرض شجرة dependencies
cargo tree

# فحص الأمان
cargo audit
```

---

## استكشاف الأخطاء - أوامر سريعة

```bash
# مشكلة: Connection refused
# الحل: تحقق من استخدام الـ host الصحيح
grep DATABASE_URL autoassist-api/.env

# مشكلة: Migration failed
# الحل: تشغيل يدوياً
cd autoassist-api
sqlx migrate run

# مشكلة: Port already in use
# الحل: إيجاد وإيقاف العملية
lsof -ti:8080 | xargs kill -9

# مشكلة: SSL connection error
# الحل: تحقق من certificates
openssl version
curl -I https://tramway.proxy.rlwy.net:55133

# عرض logs مفصلة
RUST_LOG=debug cargo run
```

---

## Benchmarking & Testing

```bash
# تشغيل الاختبارات
cargo test

# Benchmark سرعة الاتصال
time curl http://localhost:8080/health

# اختبار الحمل مع wrk (إن كان مثبتاً)
wrk -t4 -c100 -d30s http://localhost:8080/health

# اختبار الحمل مع hey
hey -n 1000 -c 10 http://localhost:8080/health
```

---

## Monitoring commands

```bash
# عرض استهلاك الذاكرة
ps aux | grep autoassist-api

# عرض اتصالات قاعدة البيانات
# (من داخل psql)
SELECT count(*) FROM pg_stat_activity;

# عرض Slow queries
SELECT pid, now() - pg_stat_activity.query_start AS duration, query 
FROM pg_stat_activity 
WHERE state = 'active' 
ORDER BY duration DESC;
```

---

## 🎯 الأوامر الأكثر استخداماً

```bash
# التطوير اليومي
./setup-railway-connection.sh    # مرة واحدة
cd autoassist-api && cargo run   # كل مرة تطور
curl http://localhost:8080/health # للاختبار

# قبل النشر
./test-railway-connection.sh     # اختبار
./deploy-to-railway.sh           # نشر

# استكشاف المشاكل
railway logs                      # عرض logs
psql postgresql://...             # فحص قاعدة البيانات
```

---

**💡 نصيحة:** احفظ هذا الملف كمرجع سريع لكل أوامرك اليومية!
