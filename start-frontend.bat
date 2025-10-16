@echo off
cls
echo ========================================
echo Starting Frontend with Production Backend
echo ========================================
echo.

cd /d "%~dp0"

echo [1] Checking .env file...
if exist .env (
    echo ✅ .env file exists
    echo.
    echo Content:
    type .env
    echo.
) else (
    echo ❌ .env file not found!
    echo Creating .env file...
    echo VITE_API_URL=https://vishnulogisticsbackend.onrender.com > .env
    echo ✅ .env file created
    echo.
)

echo [2] Clearing Vite cache...
if exist node_modules\.vite (
    rmdir /s /q node_modules\.vite
    echo ✅ Cache cleared
) else (
    echo ℹ️  No cache to clear
)
echo.

echo [3] Starting dev server...
echo.
echo ========================================
echo IMPORTANT:
echo ========================================
echo - Open: http://localhost:5173
echo - Check console for: "🔗 API URL configured"
echo - Should show your deployed backend URL
echo ========================================
echo.

npm run dev
