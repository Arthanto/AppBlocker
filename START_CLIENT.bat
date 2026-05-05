@echo off
REM Run AppBlocker Client (Python GUI)
REM Script ini menjalankan client Python dengan setup dependencies

color 0A
cls
echo ==========================================
echo   AppBlocker - Client Starter (Python GUI)
echo ==========================================
echo.

cd /d "%~dp0client"

echo Installing Python dependencies...
echo (psutil, requests, customtkinter)
echo.

python -m pip install psutil requests customtkinter

echo.
echo Starting GUI client...
echo Client akan terbuka sebagai window aplikasi
echo.

python client.py

echo.
echo Client telah ditutup.
pause
