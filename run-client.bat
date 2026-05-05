@echo off
cd /d "%~dp0client"
python -m pip install psutil requests customtkinter
python client.py
