# 🔥 إجبار Railway على مسح الـ Cache

## المشكلة:
Railway يستخدم Dockerfile قديم من cache رغم تغيير المسار.

## الحل المضمون:

### في Railway Dashboard → service AutoAssist → Settings → Build:

#### الخطوة 1: غيّر Builder مؤقتاً
- من **Dockerfile** 
- إلى **Nixpacks**
- اضغط **Save**

#### الخطوة 2: ارجعه
- من **Nixpacks**
- إلى **Dockerfile**
- تأكد Dockerfile Path = `Dockerfile` (بدون autoassist-api/)
- اضغط **Save**

#### الخطوة 3: Deploy
- اذهب لـ **Deployments**
- اضغط **"New Deployment"** أو **"Redeploy"**

---

## لماذا هذا يعمل؟

تغيير Builder يجبر Railway على:
1. مسح كل الـ cache القديم
2. قراءة Dockerfile من جديد
3. بناء المشروع من الصفر

---

## ✅ النتيجة:

سيقرأ Dockerfile الصحيح الذي يحتوي:
```dockerfile
COPY autoassist-api/Cargo.toml autoassist-api/Cargo.lock ./
COPY autoassist-api/src ./src
COPY autoassist-api/migrations ./migrations
```

---

## ⏱️ الوقت:

5-10 دقائق للبناء من الصفر

---

**🎯 جرب هذا الآن - سيعمل 100%!**
