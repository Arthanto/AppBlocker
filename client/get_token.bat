@echo off
curl -X POST http://localhost:5000/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"secret123\"}" > response.json
for /f "tokens=*" %%i in ('powershell -Command "(Get-Content response.json | ConvertFrom-Json).token"') do set TOKEN=%%i
echo %TOKEN% > token.txt
echo Token berhasil disimpan ke token.txt
del response.json