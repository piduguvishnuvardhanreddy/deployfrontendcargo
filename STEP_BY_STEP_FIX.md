# 🔧 Step-by-Step Fix for ERR_CONNECTION_REFUSED

## Current Problem
```
❌ POST http://localhost:5000/api/auth/login net::ERR_CONNECTION_REFUSED
```

Frontend is trying to connect to localhost instead of your deployed backend!

---

## ✅ SOLUTION (Follow Exactly)

### Step 1: Open Command Prompt

Press `Windows Key + R`, type `cmd`, press Enter

### Step 2: Navigate to Frontend Folder

```cmd
cd C:\Users\vishn\Loveabl1\frontend-cargo
```

### Step 3: Run the Fix Script

```cmd
create-env.bat
```

This will:
- Create `.env` file
- Add your backend URL
- Verify it worked

### Step 4: Stop Dev Server

In the terminal where `npm run dev` is running:
- Press `Ctrl + C`
- Type `Y` if asked to terminate

### Step 5: Start Dev Server Again

```cmd
npm run dev
```

### Step 6: Test in Browser

1. Open http://localhost:5173
2. Press `F12` to open DevTools
3. Go to Console tab
4. Type: `console.log(import.meta.env.VITE_API_URL)`
5. Press Enter

**Should show:**
```
https://vishnulogisticsbackend.onrender.com
```

**If it shows `undefined` or `localhost:5000`:**
- The .env file wasn't created correctly
- Run `create-env.bat` again
- Make sure to restart dev server

### Step 7: Try Login

1. Go to login page
2. Enter credentials
3. Click Login

**Should work now!** ✅

---

## 🔍 Visual Verification

### Before Fix:
```
Network Tab:
❌ POST http://localhost:5000/api/auth/login
   Status: (failed) net::ERR_CONNECTION_REFUSED
```

### After Fix:
```
Network Tab:
✅ POST https://vishnulogisticsbackend.onrender.com/api/auth/login
   Status: 200 OK
```

---

## 📋 Troubleshooting

### Issue: Script doesn't work

**Solution**: Create .env manually

1. Open VS Code
2. In `frontend-cargo` folder, create new file
3. Name it exactly: `.env`
4. Add this line:
   ```
   VITE_API_URL=https://vishnulogisticsbackend.onrender.com
   ```
5. Save (Ctrl+S)
6. Restart dev server

### Issue: Still shows localhost

**Solution**: Clear browser cache

1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Reload page (Ctrl+F5)

### Issue: Environment variable is undefined

**Solution**: Check file location

```cmd
cd frontend-cargo
dir .env
```

Should show `.env` file. If not, it's in wrong location!

---

## ✅ Success Indicators

You'll know it worked when:

1. ✅ Console shows: `https://vishnulogisticsbackend.onrender.com`
2. ✅ Network tab shows requests to `vishnulogisticsbackend.onrender.com`
3. ✅ No more `ERR_CONNECTION_REFUSED` errors
4. ✅ Login works
5. ✅ Can create deliveries

---

## 🎯 Quick Test

After fixing, run this in browser console:

```javascript
// Test 1: Check environment variable
console.log('API URL:', import.meta.env.VITE_API_URL);

// Test 2: Test backend connection
fetch('https://vishnulogisticsbackend.onrender.com/api/health')
  .then(r => r.json())
  .then(d => console.log('✅ Backend working:', d))
  .catch(e => console.error('❌ Backend error:', e));
```

Expected output:
```
API URL: https://vishnulogisticsbackend.onrender.com
✅ Backend working: {success: true, message: "Server is running"}
```

---

## 📞 Commands Summary

```cmd
# Navigate to folder
cd C:\Users\vishn\Loveabl1\frontend-cargo

# Run fix script
create-env.bat

# Verify .env exists
dir .env

# Check .env content
type .env

# Restart dev server
npm run dev
```

---

## ⚠️ Common Mistakes to Avoid

1. ❌ Creating .env in wrong folder (must be in `frontend-cargo`)
2. ❌ Not restarting dev server after creating .env
3. ❌ Typo in backend URL
4. ❌ File named `env.txt` instead of `.env`
5. ❌ Extra spaces in .env file

---

## ✅ Final Checklist

Before testing:

- [ ] `.env` file exists in `frontend-cargo` folder
- [ ] `.env` contains correct backend URL
- [ ] Dev server was stopped (Ctrl+C)
- [ ] Dev server was started again (`npm run dev`)
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] Console shows correct API URL

After testing:

- [ ] No `localhost:5000` in Network tab
- [ ] All requests go to `vishnulogisticsbackend.onrender.com`
- [ ] Login works
- [ ] No connection errors

---

**Follow these steps and your error will be fixed!** 🎉

---

*If still having issues, check URGENT_FIX.md for more details*
