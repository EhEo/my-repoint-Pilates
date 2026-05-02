@echo off
chcp 65001 > nul
echo ================================
echo   RePoint Pilates Dev Server
echo ================================
echo.

echo [1/4] Starting PostgreSQL (Docker)...
docker-compose up -d
if %errorlevel% neq 0 (
    echo [WARNING] Docker failed - DB features may not work
)
timeout /t 3 /nobreak > nul

echo [2/4] Starting API Server (localhost:4000)...
start "API Server" cmd /c "cd /d %~dp0 && npm run dev:api"
timeout /t 2 /nobreak > nul

echo [3/4] Starting Admin Page (localhost:5173)...
start "Admin Server" cmd /c "cd /d %~dp0 && npm run dev:admin"
timeout /t 2 /nobreak > nul

echo [4/4] Starting Landing Page (localhost:8080)...
start "Landing Server" cmd /c "cd /d %~dp0 && npx serve -l 8080"

echo.
echo ================================
echo   All servers started!
echo ================================
echo.
echo   Landing Page:  http://localhost:8080
echo   Admin Page:    http://localhost:5173
echo   API Server:    http://localhost:4000
echo.
echo   Login: admin@repoint.local / admin1234
echo.
echo ================================
pause
