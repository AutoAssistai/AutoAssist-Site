# 🎉 حساب Railway جديد - البداية من الصفر

## الموقف:
- ✅ حساب Railway جديد
- ✅ لا يوجد projects أو services
- ✅ نحتاج إنشاء كل شيء من الصفر

---

## 🚀 الحل الكامل (10 دقائق):

### الطريقة 1: من Railway Dashboard (أسهل) ⭐

#### 1. افتح Railway:
```
https://railway.app
```

#### 2. أنشئ Project جديد:
- اضغط **"New Project"**
- اختر **"Empty Project"**
- اسمه: `AutoAssist`

#### 3. أضف PostgreSQL (اختياري - عندك database جاهز):
- يمكنك تخطي هذا لأن عندك Railway PostgreSQL جاهز

#### 4. أنشئ Service:
- داخل Project → اضغط **"New"**
- اختر **"Empty Service"**
- اسمه: `Backend`

#### 5. اضبط Service:

**Settings → Deploy:**
```
Builder: Dockerfile
Dockerfile Path: Dockerfile
Root Directory: (فارغ)
Start Command: ./autoassist-api
```

**Settings → Variables:**
انسخ والصق (كل سطر متغير منفصل):
```
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
```

#### 6. Deploy:

**في Terminal:**
```bash
cd ~/Desktop/AutoAssist_site/autoassist-api
railway link
# اختر Project: AutoAssist
# اختر Service: Backend
railway up
```

---

### الطريقة 2: من Terminal (أسرع)

```bash
cd ~/Desktop/AutoAssist_site/autoassist-api

# إنشاء project جديد
railway init
# سيسألك عن الاسم - اكتب: AutoAssist

# رفع المشروع
railway up

# بعد الرفع، أضف المتغيرات في Dashboard
# ثم Redeploy
```

---

## 🔗 ربط Database الموجود:

إذا كان عندك PostgreSQL من حساب قديم على Railway:

### في Dashboard:
1. Project AutoAssist → Settings → Variables
2. أضف `DATABASE_URL` يدوياً
3. أو في Terminal:
```bash
railway variables set DATABASE_URL="postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@postgres.railway.internal:5432/railway"
```

---

## ✅ بعد النشر:

```bash
# احصل على URL
railway domain

# راقب logs
railway logs

# اختبر
curl https://YOUR_DOMAIN/health
```

---

## 📝 ملاحظات مهمة:

### الـ Database:
- ✅ عندك Railway PostgreSQL من قبل
- ✅ استخدم نفس الـ credentials
- ✅ يمكنك ربطه من أي project

### الملفات:
- ✅ `Dockerfile` موجود في المجلد الرئيسي
- ✅ `railway.toml` موجود
- ✅ جميع الملفات صحيحة

---

## 🎯 التوصية:

**استخدم Railway Dashboard:**
1. أنشئ Project
2. أنشئ Service
3. اضبط Settings
4. أضف Variables
5. Deploy من Terminal: `railway up`

---

**أسهل طريقة: افتح Dashboard وأنشئ Project جديد!**
