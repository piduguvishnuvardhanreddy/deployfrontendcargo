@echo off
echo ========================================
echo Fixing CORS / Failed to Fetch Error
echo ========================================
echo.

echo Step 1: Creating .env file...
echo VITE_API_URL=https://vishnulogisticsbackend.onrender.com > .env
echo ✅ .env file created

echo.
echo Step 2: Verifying .env file content...
type .env
echo.

echo ✅ Configuration complete!
echo.
echo ========================================
echo IMPORTANT NEXT STEPS:
echo ========================================
echo.
echo 1. REDEPLOY YOUR BACKEND ON RENDER
echo    - Go to: https://dashboard.render.com
echo    - Find your backend service
echo    - Click "Manual Deploy"
echo    - Wait for deployment to complete
echo.
echo 2. RESTART FRONTEND
echo    - Stop dev server (Ctrl+C)
echo    - Run: npm run dev
echo.
echo 3. TEST
echo    - Open: http://localhost:5173
echo    - Try to sign up
echo.
echo ========================================
echo.
pause
