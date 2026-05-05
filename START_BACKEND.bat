@echo off
REM Run AppBlocker Backend Setup Script
REM Script ini menjalankan backend Node.js dengan PATH yang sudah diset

color 0A
cls
echo ==========================================
echo   AppBlocker - Backend Starter
echo ==========================================
echo.

set "PATH=C:\Program Files\nodejs;%PATH%"

cd /d "%~dp0backend"

echo Starting MongoDB check...
timeout /t 1 /nobreak

echo.
echo Starting backend server...
echo Server akan berjalan di http://localhost:5000
echo.

node server.js

pause
