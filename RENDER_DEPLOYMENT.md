# 🚀 نشر AutoAssist.ai على Render.com

## ✅ المشروع على GitHub:
```
https://github.com/AutoAssistai/AutoAssist-Site
```

---

## 📋 خطوات النشر على Render.com (5 دقائق):

### 1. افتح Render:
```
https://render.com
```

### 2. سجل دخول:
- Sign up with GitHub (موصى به)
- أو Email

### 3. New Web Service:
- Dashboard → **New** → **Web Service**

### 4. Connect Repository:
- **Connect** GitHub
- اختر: `AutoAssistai/AutoAssist-Site`
- اضغط **Connect**

---

## ⚙️ الإعدادات (Settings):

### Basic Settings:
```
Name: autoassist-backend
Region: Oregon (US West) أو أقرب منطقة
Branch: main
```

### Build Settings:
```
Root Directory: (اتركه فارغاً)
Environment: Docker
Dockerfile Path: ./Dockerfile
Docker Build Context Directory: ./
Docker Command: (اتركه فارغاً - سيستخدم CMD من Dockerfile)
```

### Instance Settings:
```
Instance Type: Free
```

---

## 🔐 Environment Variables:

اضغط **Add Environment Variable** لكل متغير:

```
DATABASE_URL
postgresql://postgres:bpGdnlJNciDiREFjpuMAafmHCQuWnryg@tramway.proxy.rlwy.net:55133/railway

SMTP_HOST
smtp.mail.yahoo.com

SMTP_PORT
465

SMTP_USERNAME
autoassist.contact@yahoo.com

SMTP_PASSWORD
gjrmemjpcqwqiqft

SMTP_FROM
autoassist.contact@yahoo.com

ADMIN_EMAIL
autoassist.contact@yahoo.com

HOST
0.0.0.0

PORT
8080

RUST_LOG
info,sqlx=warn
```

**⚠️ مهم:** استخدم `tramway.proxy.rlwy.net:55133` (external) وليس `postgres.railway.internal`

---

## 🚀 Deploy:

بعد إضافة كل الإعدادات:
- اضغط **Create Web Service**
- سيبدأ البناء تلقائياً (10-15 دقيقة)

---

## 📊 مراقبة النشر:

### في Render Dashboard:
- **Logs** → شاهد عملية البناء
- **Events** → تتبع الأحداث

### النتيجة المتوقعة:
```
Building...
Deploying...
Live
```

---

## 🧪 الاختبار:

بعد اكتمال النشر، ستحصل على URL مثل:
```
https://autoassist-backend.onrender.com
```

### اختبار:
```bash
curl https://autoassist-backend.onrender.com/health
```

**النتيجة المتوقعة:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "..."
}
```

---

## 🔗 بعد النشر:

### حدّث Frontend:
```bash
cd autoassist-frontend
echo "VITE_API_URL=https://autoassist-backend.onrender.com" > .env
```

### ثم انشر Frontend على:
- Vercel
- Netlify  
- Cloudflare Pages

---

## ⚠️ ملاحظات مهمة:

### 1. Cold Start:
Render Free tier ينام بعد 15 دقيقة من عدم النشاط.
أول request بعد النوم قد يستغرق 30-60 ثانية.

### 2. Database Connection:
استخدمنا `tramway.proxy.rlwy.net` (external) لأن Render لا يستطيع الوصول لـ Railway internal network.

### 3. Build Time:
البناء الأول يستغرق 10-15 دقيقة (Rust يحتاج وقت).

---

## 🎯 Checklist:

- [ ] Render account جاهز
- [ ] Repository متصل
- [ ] Settings مضبوطة
- [ ] Environment Variables مضافة
- [ ] Deploy بدأ
- [ ] Logs تظهر بناء ناجح
- [ ] Health endpoint يعمل

---

## 🆘 إذا فشل البناء:

### تحقق من:
1. **Dockerfile Path:** يجب أن يكون `./Dockerfile`
2. **Environment Variables:** تأكد من جميع المتغيرات
3. **DATABASE_URL:** يستخدم external URL (tramway.proxy.rlwy.net)

### راجع Logs:
```
Dashboard → Service → Logs
```

---

**🎉 جاهز للنشر! اتبع الخطوات أعلاه!**
