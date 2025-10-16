# 🚀 Deployment Guide

## ✅ Backend Already Deployed
**URL**: https://vishnulogisticsbackend.onrender.com

---

## 📝 Setup Frontend with Production Backend

### Quick Setup (Windows)

Just run the setup script:
```bash
setup-production.bat
```

Or manually:

### Manual Setup

1. **Create .env file**
```bash
cd frontend-cargo
echo VITE_API_URL=https://vishnulogisticsbackend.onrender.com > .env
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:5173
```

---

## 🌐 Deploy Frontend to Vercel

### Step 1: Build the Project
```bash
npm run build
```

### Step 2: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 3: Deploy
```bash
vercel
```

### Step 4: Set Environment Variable
In Vercel dashboard:
- Go to Project Settings
- Environment Variables
- Add: `VITE_API_URL` = `https://vishnulogisticsbackend.onrender.com`

---

## 🌐 Deploy Frontend to Netlify

### Step 1: Build the Project
```bash
npm run build
```

### Step 2: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 3: Deploy
```bash
netlify deploy --prod
```

### Step 4: Set Environment Variable
In Netlify dashboard:
- Go to Site Settings
- Build & Deploy → Environment
- Add: `VITE_API_URL` = `https://vishnulogisticsbackend.onrender.com`

---

## 🔧 Update Backend CORS

Make sure your backend allows your frontend domain.

Update `backend/.env`:
```env
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

Or allow multiple origins in `backend/server.js`:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-frontend-domain.vercel.app',
  'https://your-frontend-domain.netlify.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
```

---

## ✅ Testing Checklist

### Local Testing with Production Backend

- [ ] Update .env with production URL
- [ ] Run `npm run dev`
- [ ] Sign up as customer
- [ ] Create delivery order
- [ ] Sign up as driver
- [ ] Sign up as admin
- [ ] Admin assigns driver
- [ ] Driver updates status
- [ ] Customer tracks order
- [ ] All API calls work
- [ ] No CORS errors

### Production Testing

- [ ] Frontend deployed
- [ ] Environment variables set
- [ ] Can access frontend URL
- [ ] Sign up works
- [ ] Login works
- [ ] All features work
- [ ] No console errors

---

## 🔍 Troubleshooting

### Issue: CORS Error
**Solution**: Update backend CORS to allow your frontend domain

### Issue: API calls fail
**Solution**: Check environment variable is set correctly
```bash
# In browser console
console.log(import.meta.env.VITE_API_URL)
```

### Issue: 404 on refresh
**Solution**: Add `_redirects` file for Netlify or `vercel.json` for Vercel

For Netlify, create `public/_redirects`:
```
/*    /index.html   200
```

For Vercel, create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 📊 Architecture

```
User Browser
    ↓
Frontend (Vercel/Netlify)
    ↓ HTTPS
Backend (Render)
https://vishnulogisticsbackend.onrender.com
    ↓
MongoDB Atlas
vishnu.tczcu.mongodb.net
```

---

## 🎯 Production URLs

### Backend
```
https://vishnulogisticsbackend.onrender.com
```

### Frontend (After Deployment)
```
https://your-app-name.vercel.app
or
https://your-app-name.netlify.app
```

---

## 📝 Environment Variables Summary

### Frontend (.env)
```env
VITE_API_URL=https://vishnulogisticsbackend.onrender.com
```

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://Vishnu:Vishnu%409@vishnu.tczcu.mongodb.net/delivery_system
JWT_SECRET=your-secret-key
PORT=5000
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

---

## 🚀 Quick Deploy Commands

```bash
# Build frontend
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod

# Test production build locally
npm run preview
```

---

## ✅ Success!

Your backend is already deployed at:
**https://vishnulogisticsbackend.onrender.com**

Now just:
1. Update frontend .env
2. Test locally
3. Deploy frontend
4. Update backend CORS
5. Test production

---

*Deployment guide complete!* 🎉
