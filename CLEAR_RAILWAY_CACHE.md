# 🔧 حل مشكلة Railway Cache

## المشكلة:
Railway يستخدم Dockerfile القديم من الـ cache

## الحل:

### في Railway Dashboard:

#### الخطوة 1: اذهب إلى service "AutoAssist"

#### الخطوة 2: اذهب إلى Settings → Builder
- تأكد من:
  - **Builder:** Dockerfile
  - **Dockerfile Path:** `Dockerfile` (بدون autoassist-api/)

#### الخطوة 3: احذف الـ cache
في Settings → General → **"Clear Build Cache"**
ثم اضغط "Save"

#### الخطوة 4: Redeploy
اضغط "Deploy" أو "Redeploy"

---

## البديل: استخدام Railway CLI مباشرة

```bash
cd ~/Desktop/AutoAssist_site
railway up --no-cache
```

لكن قد تحتاج لاختيار service يدوياً.

---

## التحقق:

Dockerfile الحالي يجب أن يحتوي على:
```dockerfile
COPY autoassist-api/Cargo.toml autoassist-api/Cargo.lock ./
COPY autoassist-api/src ./src
COPY autoassist-api/migrations ./migrations
```

---

## إذا استمرت المشكلة:

### الحل الأخير: أنشئ service جديد

1. في Railway Dashboard
2. "New Service"
3. "Empty Service"
4. Settings → اضبط:
   - Source: Local
   - Builder: Dockerfile
   - Dockerfile Path: `Dockerfile`
5. أضف Variables (DATABASE_URL, SMTP_*, etc)
6. Deploy

---

**🎯 جرب "Clear Build Cache" أولاً!**
