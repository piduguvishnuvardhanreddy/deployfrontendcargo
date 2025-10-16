@echo off
cls
echo ========================================
echo DIAGNOSTIC CHECK
echo ========================================
echo.

cd /d "%~dp0"

echo [1] Checking if .env file exists...
if exist .env (
    echo ✅ .env file EXISTS
) else (
    echo ❌ .env file NOT FOUND
    echo Creating .env file now...
    echo VITE_API_URL=https://vishnulogisticsbackend.onrender.com > .env
    echo ✅ .env file created
)

echo.
echo [2] Checking .env file content...
type .env
echo.

echo [3] Checking if backend is accessible...
curl -s https://vishnulogisticsbackend.onrender.com/api/health
echo.

echo ========================================
echo INSTRUCTIONS
echo ========================================
echo.
echo If .env shows the correct URL:
echo   VITE_API_URL=https://vishnulogisticsbackend.onrender.com
echo.
echo Then you MUST:
echo   1. STOP dev server (Ctrl+C)
echo   2. START again: npm run dev
echo   3. HARD REFRESH browser (Ctrl+Shift+R)
echo.
echo If backend test shows "success: true":
echo   ✅ Backend is working
echo.
echo If you still get "failed to fetch":
echo   - Clear browser cache
echo   - Check browser console for actual error
echo   - Make sure dev server was restarted
echo.
echo ========================================
pause
