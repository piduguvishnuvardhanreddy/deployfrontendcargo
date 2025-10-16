# 🔧 Update Backend URL

## ✅ Your Deployed Backend
**URL**: https://vishnulogisticsbackend.onrender.com

---

## 📝 How to Update

### Step 1: Update .env File

Open or create `.env` file in `frontend-cargo` folder:

```bash
cd frontend-cargo
```

Create/Edit `.env` file with:

```env
VITE_API_URL=https://vishnulogisticsbackend.onrender.com
```

### Step 2: Restart Frontend

```bash
# Stop the dev server (Ctrl+C)
# Start again
npm run dev
```

---

## 🔄 Switch Between Local and Production

### For Local Development
```env
VITE_API_URL=http://localhost:5000
```

### For Production
```env
VITE_API_URL=https://vishnulogisticsbackend.onrender.com
```

---

## ✅ Verify It's Working

1. Start frontend: `npm run dev`
2. Open browser: http://localhost:5173
3. Try to sign up
4. Check browser console - should see API calls to:
   ```
   https://vishnulogisticsbackend.onrender.com/api/auth/register
   ```

---

## 🚀 Deploy Frontend

### Option 1: Vercel
```bash
npm run build
# Deploy dist folder to Vercel
```

### Option 2: Netlify
```bash
npm run build
# Deploy dist folder to Netlify
```

### Environment Variable on Hosting
Set this in your hosting platform:
```
VITE_API_URL=https://vishnulogisticsbackend.onrender.com
```

---

## 🧪 Test API Connection

Open browser console and run:

```javascript
fetch('https://vishnulogisticsbackend.onrender.com/api/health')
  .then(r => r.json())
  .then(d => console.log(d))
```

Should return:
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## 📋 Quick Commands

```bash
# Update .env file
echo "VITE_API_URL=https://vishnulogisticsbackend.onrender.com" > .env

# Restart dev server
npm run dev

# Build for production
npm run build

# Test API
curl https://vishnulogisticsbackend.onrender.com/api/health
```

---

## ⚠️ Important Notes

1. **CORS**: Make sure your backend has CORS enabled for your frontend domain
2. **HTTPS**: Your backend is using HTTPS (✅ Good!)
3. **Environment Variables**: Must start with `VITE_` to be accessible in React
4. **Restart Required**: Always restart dev server after changing .env

---

## 🔐 Backend CORS Configuration

Make sure your backend `.env` includes:

```env
FRONTEND_URL=http://localhost:5173
# Or your deployed frontend URL
# FRONTEND_URL=https://your-frontend.vercel.app
```

And in `backend/server.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
```

---

**✅ Backend URL Updated!**

Just update your `.env` file and restart the dev server!

---

*Updated: 2025-10-15*
