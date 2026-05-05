@echo off
title App Blocker - Frontend Server
cd /d "%~dp0frontend"
echo.
echo ========================================
echo Starting Frontend Server...
echo ========================================
echo.
color 0B
call npm run dev
pause
