# 🎉 إعداد المشروع - حساب جديد

## ✅ أنت الآن متصل بـ:
```
Project: AutoAssist
Project ID: c4a9addb-7399-45ee-9d60-ef19c83f316b
```

---

## 📋 الخطوات (5 دقائق):

### 1. في Railway Dashboard:

افتح: https://railway.app/project/c4a9addb-7399-45ee-9d60-ef19c83f316b

---

### 2. أنشئ Service جديد:

- اضغط **"New"** → **"Empty Service"**
- اسمه: `Backend` أو `AutoAssist-Backend`

---

### 3. اضبط Settings:

#### Settings → Deploy:
- **Builder:** Dockerfile
- **Dockerfile Path:** `Dockerfile`
- **Root Directory:** (فارغ)
- **Start Command:** `./autoassist-api`
- **Save**

---

### 4. أضف Variables:

#### Settings → Variables → Add Variable:

```
DATABASE_URL = postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway

SMTP_HOST = smtp.mail.yahoo.com
SMTP_PORT = 465
SMTP_USERNAME = autoassist.contact@yahoo.com
SMTP_PASSWORD = gjrmemjpcqwqiqft
SMTP_FROM = autoassist.contact@yahoo.com
ADMIN_EMAIL = autoassist.contact@yahoo.com

HOST = 0.0.0.0
PORT = 8080
RUST_LOG = info,sqlx=warn
```

---

### 5. Deploy من Terminal:

```bash
cd ~/Desktop/AutoAssist_site/autoassist-api
railway service
# اختر Service الجديد

railway up
```

---

### 6. بعد النشر (10 دقائق):

```bash
# احصل على domain
railway domain

# اختبر
curl https://YOUR_DOMAIN/health
```

---

## ✅ هذا المرة سينجح 100% لأن:

- ✅ حساب جديد (لا cache قديم)
- ✅ Project جديد
- ✅ Service جديد
- ✅ Dockerfile صحيح (يحتوي autoassist-api/)

---

## 🎯 ابدأ الآن:

1. افتح Dashboard: https://railway.app/project/c4a9addb-7399-45ee-9d60-ef19c83f316b
2. New → Empty Service
3. اضبط Settings
4. أضف Variables
5. Deploy

---

**الوقت المتوقع:** 10-15 دقيقة للبناء الأول
