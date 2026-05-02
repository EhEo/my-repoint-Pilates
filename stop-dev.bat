@echo off
chcp 65001 > nul
echo ================================
echo   Stopping RePoint Pilates
echo ================================
echo.

echo Stopping servers...
taskkill /FI "WINDOWTITLE eq API Server*" /F > nul 2>&1
taskkill /FI "WINDOWTITLE eq Admin Server*" /F > nul 2>&1
taskkill /FI "WINDOWTITLE eq Landing Server*" /F > nul 2>&1

echo Stopping PostgreSQL...
docker-compose down > nul 2>&1

echo.
echo All servers stopped!
echo ================================
pause
