# 🚨 URGENT FIX - ERR_CONNECTION_REFUSED

## ❌ Problem
Frontend is connecting to `localhost:5000` instead of your deployed backend.

## ✅ Solution

### Step 1: Create .env File

**IMPORTANT**: The file must be named exactly `.env` (with the dot at the start)

```bash
cd frontend-cargo
```

Then create the file:

**Option A - Using Command Prompt:**
```cmd
echo VITE_API_URL=https://vishnulogisticsbackend.onrender.com > .env
```

**Option B - Using Notepad:**
1. Open Notepad
2. Type: `VITE_API_URL=https://vishnulogisticsbackend.onrender.com`
3. Save As → File name: `.env` (with quotes!)
4. Save in `frontend-cargo` folder

**Option C - Using VS Code:**
1. In VS Code, right-click `frontend-cargo` folder
2. New File
3. Name it: `.env`
4. Add: `VITE_API_URL=https://vishnulogisticsbackend.onrender.com`
5. Save

### Step 2: Verify .env File

```bash
cd frontend-cargo
dir .env
```

Should show `.env` file exists.

Check content:
```bash
type .env
```

Should show:
```
VITE_API_URL=https://vishnulogisticsbackend.onrender.com
```

### Step 3: RESTART Dev Server

**CRITICAL**: You MUST restart the dev server!

```bash
# Press Ctrl+C to stop
# Then start again:
npm run dev
```

### Step 4: Verify in Browser

Open browser console (F12) and type:
```javascript
console.log(import.meta.env.VITE_API_URL)
```

Should show:
```
https://vishnulogisticsbackend.onrender.com
```

If it shows `undefined` or `localhost:5000`, the .env file isn't loaded!

---

## 🔍 Why This Happens

1. `.env` file doesn't exist
2. `.env` file is in wrong location
3. Dev server wasn't restarted after creating .env
4. File is named wrong (e.g., `env.txt` instead of `.env`)

---

## ✅ Verification Checklist

- [ ] `.env` file exists in `frontend-cargo` folder (not in root!)
- [ ] File is named exactly `.env` (with dot at start)
- [ ] File contains: `VITE_API_URL=https://vishnulogisticsbackend.onrender.com`
- [ ] Dev server was restarted (Ctrl+C then `npm run dev`)
- [ ] Browser console shows correct URL
- [ ] No more `localhost:5000` errors

---

## 🧪 Test Commands

```bash
# 1. Check file exists
cd frontend-cargo
dir .env

# 2. Check file content
type .env

# 3. Restart dev server
npm run dev

# 4. In browser console (F12):
console.log(import.meta.env.VITE_API_URL)
```

---

## 📱 Expected Results

### Before Fix:
```
POST http://localhost:5000/api/auth/login net::ERR_CONNECTION_REFUSED
```

### After Fix:
```
POST https://vishnulogisticsbackend.onrender.com/api/auth/login
Status: 200 OK
```

---

**Follow these steps exactly and the error will be fixed!** ✅
