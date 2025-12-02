# 🚀 تعليمات Deploy على Render

## ✅ الحل النهائي

### الطريقة 1: استخدام render.yaml (أوتوماتيكي) ⭐ الأفضل

الآن عندك ملف `render.yaml` في الريبو. هذا الملف بيخلي Render يعرف كيف يبني المشروع أوتوماتيكياً.

**الخطوات:**

1. **Push الملف الجديد للريبو:**
   ```bash
   git add render.yaml
   git commit -m "Add render.yaml for automatic deployment"
   git push origin main
   ```

2. **في Render Dashboard:**
   - اضغط على **New +** → **Blueprint**
   - اختار الريبو تبعك: `AutoAssistai/AutoAssist-Site`
   - Render بيقرأ ملف `render.yaml` أوتوماتيكياً
   - اضغط **Apply**
   - أضف Environment Variables المطلوبة:
     - `DATABASE_URL`: رابط قاعدة البيانات
     - `SENDGRID_API_KEY`: مفتاح SendGrid
   - اضغط **Deploy**

---

### الطريقة 2: Manual Configuration (يدوي)

إذا ما تبي تستخدم Blueprint:

1. **روح Render Dashboard**
2. **اضغط على السيرفس الموجود (أو New Web Service)**
3. **في Settings → Build & Deploy:**
   ```
   Root Directory: (خليه فارغ)
   Dockerfile Path: Dockerfile.render
   Docker Build Context Directory: .
   ```
4. **اضغط Save Changes**
5. **روح للـ Environment وتأكد من المتغيرات:**
   - `DATABASE_URL`
   - `SENDGRID_API_KEY`
   - `CONTACT_EMAIL`
   - `PORT` = 8080
6. **اضغط Manual Deploy → Deploy latest commit**

---

## 🔍 ليش كانت المشكلة؟

المشكلة كانت إن Render ما كان يعرف وين يلاقي الـ Dockerfile. 

**الحل:**
- ملف `render.yaml` يحدد بالضبط:
  - وين الـ Dockerfile: `./Dockerfile.render`
  - إن نوع البناء: `docker`
  - كل الإعدادات المطلوبة

---

## ✅ Checklist

- [ ] Push ملف `render.yaml` للريبو
- [ ] في Render: استخدم Blueprint أو ضبط Settings يدوياً
- [ ] أضف Environment Variables المطلوبة
- [ ] Deploy
- [ ] تأكد من Health Check: `https://your-app.onrender.com/health`

---

## 📝 ملاحظات

- الـ `Dockerfile.render` موجود في root المشروع ✅
- الملف مضبوط ويقرأ من `autoassist-api/` subdirectory ✅
- Health check endpoint: `/health` ✅
- Port: 8080 (Render بيستخدم متغير PORT) ✅

---

**🎯 النصيحة: استخدم الطريقة 1 (render.yaml) لأنها أسهل وأوتوماتيكية!**
