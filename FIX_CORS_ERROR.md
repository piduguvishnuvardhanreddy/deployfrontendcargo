# 🔧 Fix "Failed to Fetch" Error

## ✅ Solution Steps

### Step 1: Create .env File

In the `frontend-cargo` folder, create a file named `.env` (no extension):

```env
VITE_API_URL=https://vishnulogisticsbackend.onrender.com
```

**Windows Command:**
```bash
cd frontend-cargo
echo VITE_API_URL=https://vishnulogisticsbackend.onrender.com > .env
```

### Step 2: Update Backend CORS (Already Done)

I've updated your backend `server.js` to allow all origins. 

**You need to redeploy your backend on Render** with the updated code!

### Step 3: Restart Frontend

```bash
# Stop the dev server (Ctrl+C)
npm run dev
```

---

## 🧪 Test Backend Connection

Open browser console (F12) and run:

```javascript
fetch('https://vishnulogisticsbackend.onrender.com/api/health')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error('Error:', e))
```

Should return:
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Failed to fetch"
**Cause**: CORS not configured or .env file not loaded

**Solution**:
1. Make sure `.env` file exists in `frontend-cargo` folder
2. Restart dev server: `npm run dev`
3. Check console: `console.log(import.meta.env.VITE_API_URL)`

### Issue 2: "CORS policy error"
**Cause**: Backend doesn't allow frontend domain

**Solution**:
1. Update backend CORS (already done in server.js)
2. **Redeploy backend on Render**
3. Wait for deployment to complete

### Issue 3: Backend URL wrong
**Cause**: .env file not created or wrong URL

**Solution**:
```bash
# Check if .env exists
dir .env

# If not, create it
echo VITE_API_URL=https://vishnulogisticsbackend.onrender.com > .env

# Verify content
type .env
```

---

## 📋 Complete Checklist

- [ ] `.env` file created in `frontend-cargo` folder
- [ ] `.env` contains: `VITE_API_URL=https://vishnulogisticsbackend.onrender.com`
- [ ] Backend `server.js` updated with new CORS config
- [ ] Backend redeployed on Render
- [ ] Frontend dev server restarted
- [ ] Test backend URL in browser console
- [ ] Try signing up

---

## 🔍 Debug Steps

### 1. Check .env File

```bash
cd frontend-cargo
type .env
```

Should show:
```
VITE_API_URL=https://vishnulogisticsbackend.onrender.com
```

### 2. Check Environment Variable Loaded

In browser console:
```javascript
console.log(import.meta.env.VITE_API_URL)
```

Should show:
```
https://vishnulogisticsbackend.onrender.com
```

### 3. Test Backend Directly

```bash
curl https://vishnulogisticsbackend.onrender.com/api/health
```

Should return JSON with success: true

### 4. Check Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Try to sign up
4. Look for failed requests
5. Check the request URL - should be `https://vishnulogisticsbackend.onrender.com/api/auth/register`

---

## 🚀 Quick Fix Script

Save this as `fix-cors.bat` in `frontend-cargo` folder:

```batch
@echo off
echo ========================================
echo Fixing CORS Error
echo ========================================
echo.

echo Step 1: Creating .env file...
echo VITE_API_URL=https://vishnulogisticsbackend.onrender.com > .env
echo ✅ Done

echo.
echo Step 2: Verifying .env file...
type .env
echo.

echo ========================================
echo Next Steps:
echo ========================================
echo 1. Redeploy your backend on Render
echo 2. Run: npm run dev
echo 3. Test in browser
echo ========================================
pause
```

Then run:
```bash
fix-cors.bat
```

---

## 🔄 Redeploy Backend on Render

1. Go to https://dashboard.render.com
2. Find your backend service
3. Click "Manual Deploy" → "Deploy latest commit"
4. Wait for deployment to complete
5. Test again

---

## ✅ Verify Everything Works

### Test 1: Backend Health
```bash
curl https://vishnulogisticsbackend.onrender.com/api/health
```

### Test 2: Frontend Environment
Browser console:
```javascript
console.log(import.meta.env.VITE_API_URL)
// Should show: https://vishnulogisticsbackend.onrender.com
```

### Test 3: Sign Up
1. Open http://localhost:5173
2. Try to sign up
3. Check Network tab - should see request to your backend
4. Should work without CORS error

---

## 📞 Still Not Working?

### Check These:

1. **Backend is running?**
   - Visit: https://vishnulogisticsbackend.onrender.com
   - Should see JSON response

2. **.env file exists?**
   ```bash
   cd frontend-cargo
   dir .env
   ```

3. **Dev server restarted?**
   - Stop with Ctrl+C
   - Run `npm run dev` again

4. **Browser cache cleared?**
   - Press Ctrl+Shift+Delete
   - Clear cache
   - Reload page

---

**After following these steps, your "Failed to fetch" error should be fixed!** ✅
