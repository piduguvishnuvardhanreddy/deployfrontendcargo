@echo off
cls
echo ========================================
echo CREATING .env FILE
echo ========================================
echo.

cd /d "%~dp0"

echo Creating .env file...
echo VITE_API_URL=https://vishnulogisticsbackend.onrender.com > .env

echo.
echo ========================================
echo VERIFICATION
echo ========================================
echo.

if exist .env (
    echo ✅ .env file created successfully!
    echo.
    echo File content:
    type .env
    echo.
) else (
    echo ❌ ERROR: Failed to create .env file
    echo.
    pause
    exit /b 1
)

echo ========================================
echo NEXT STEPS
echo ========================================
echo.
echo 1. STOP the dev server (Press Ctrl+C)
echo 2. START again: npm run dev
echo 3. Open browser: http://localhost:5173
echo 4. Try to login
echo.
echo The error should be FIXED!
echo ========================================
echo.
pause
