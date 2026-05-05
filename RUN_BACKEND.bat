@echo off
title App Blocker - Backend Server
cd /d "%~dp0backend"
echo.
echo ========================================
echo Starting Backend Server...
echo ========================================
echo.
color 0A
node server.js
pause
