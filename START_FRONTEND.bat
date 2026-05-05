@echo off
REM Run AppBlocker Frontend Setup Script
REM Script ini menjalankan frontend Next.js dengan PATH yang sudah diset

color 0A
cls
echo ==========================================
echo   AppBlocker - Frontend Starter
echo ==========================================
echo.

set "PATH=C:\Program Files\nodejs;%PATH%"

cd /d "%~dp0frontend"

echo Installing/updating dependencies...
call npm install

echo.
echo Starting frontend server...
echo Frontend akan berjalan di http://localhost:3000 (atau 3001)
echo.

npm run dev

pause
