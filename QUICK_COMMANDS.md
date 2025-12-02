# ⚡ أوامر سريعة - AutoAssist.ai

## 🚀 تشغيل السيرفر

### الطريقة 1: السكربت (موصى به)
```bash
./start-server.sh
```

### الطريقة 2: يدوياً
```bash
cd autoassist-api
cargo run
```

---

## 🛑 إيقاف السيرفر

### الطريقة 1: السكربت (موصى به)
```bash
./stop-server.sh
```

### الطريقة 2: يدوياً
```bash
# إيقاف graceful
pkill -f autoassist-api

# أو إيقاف قوي
lsof -ti:8080 | xargs kill -9
```

---

## 🧪 اختبار السيرفر

### Health Check
```bash
curl http://localhost:8080/health
```

### إنشاء Lead
```bash
curl -X POST http://localhost:8080/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "اختبار",
    "company": "شركة",
    "website": "test.com",
    "goal": "اختبار",
    "budget": "$5,000+",
    "email": "test@test.com",
    "consent": true
  }'
```

---

## 🔍 استكشاف الأخطاء

### المشكلة: "Address already in use"
```bash
# إيقاف السيرفر القديم
./stop-server.sh

# أو يدوياً
lsof -ti:8080 | xargs kill -9
```

### المشكلة: "Name or service not known"
```bash
# تأكد من استخدام .env.local
cd autoassist-api
cp .env.local .env
```

### المشكلة: "Connection timeout"
```bash
# اختبر الاتصال
./test-railway-connection.sh
```

---

## 📊 مراقبة السيرفر

### عرض العمليات
```bash
ps aux | grep autoassist-api
```

### التحقق من المنفذ
```bash
lsof -i:8080
```

### عرض الاتصالات النشطة
```bash
netstat -an | grep 8080
```

---

## 🗄️ قاعدة البيانات

### الاتصال بـ psql
```bash
psql postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway
```

### استعلامات سريعة
```sql
-- عرض الجداول
\dt

-- عرض البيانات
SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;

-- عدد السجلات
SELECT COUNT(*) FROM leads;

-- حذف بيانات الاختبار
DELETE FROM leads WHERE email LIKE '%test%';
```

---

## 🚀 النشر على Railway

```bash
./deploy-backend-to-railway.sh
```

---

## 📝 ملخص الأوامر الأساسية

| الأمر | الوظيفة |
|-------|---------|
| `./start-server.sh` | تشغيل السيرفر |
| `./stop-server.sh` | إيقاف السيرفر |
| `./fix-and-run.sh` | إصلاح .env وتشغيل |
| `./test-railway-connection.sh` | اختبار الاتصال |
| `./deploy-backend-to-railway.sh` | النشر على Railway |
| `curl http://localhost:8080/health` | اختبار Health |

---

**💡 نصيحة:** استخدم `./start-server.sh` دائماً لتجنب مشاكل المنفذ المشغول!
