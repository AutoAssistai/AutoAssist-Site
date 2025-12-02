# 🚀 النشر النهائي - خطوات يدوية

## المشكلة:
Railway service غير مربوط مع المجلد `autoassist-api`

---

## ✅ الحل (خطوات يدوية):

### 1. افتح Railway Dashboard:
```bash
railway open
```

أو اذهب إلى: https://railway.app/project/bd2109f7-6af8-4557-a71a-ef63055f3044

---

### 2. في Dashboard:

#### أ. اذهب إلى service "AutoAssist"

#### ب. في Settings → Variables، أضف:
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

#### ج. في Settings → Deployment:
- **Builder:** Dockerfile
- **Dockerfile Path:** `autoassist-api/Dockerfile`
- **Root Directory:** اتركه فارغ أو `/`

#### د. اضغط "Deploy" أو "Redeploy"

---

### 3. مراقبة النشر:

```bash
cd autoassist-api
railway logs
```

---

## 🎯 الطريقة البديلة (CLI):

إذا أردت استخدام CLI:

```bash
cd autoassist-api

# اختر service يدوياً
railway service

# اختر: AutoAssist

# ثم انشر
railway up
```

---

## ✅ بعد نجاح النشر:

### اختبار:
```bash
curl https://autoassist-production.up.railway.app/health
```

### النتيجة المتوقعة:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "..."
}
```

---

## 📊 إذا فشل النشر:

### راجع Logs في Dashboard:
1. افتح Railway Dashboard
2. اذهب إلى service "AutoAssist"
3. اضغط "Deployments"
4. اختر آخر deployment
5. راجع logs

### الأخطاء الشائعة:

#### خطأ: "DATABASE_URL not set"
**الحل:** أضف DATABASE_URL في Variables

#### خطأ: "SMTP variables missing"
**الحل:** أضف SMTP_* variables في Variables

#### خطأ: "Build failed"
**الحل:** تحقق من Dockerfile path

---

## 🎯 ملخص الخطوات السريعة:

1. **افتح Dashboard:** `railway open`
2. **اختر service "AutoAssist"**
3. **أضف Variables** (DATABASE_URL, SMTP_*)
4. **اضبط Dockerfile path:** `autoassist-api/Dockerfile`
5. **Deploy/Redeploy**
6. **راقب logs**

---

## 💡 نصيحة:

استخدم Railway Dashboard للنشر الأول، ثم CLI للتحديثات المستقبلية.

---

**🚀 ابدأ الآن:**
```bash
railway open
```
