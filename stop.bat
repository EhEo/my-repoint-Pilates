@echo off
chcp 65001 >nul
title RePoint Pilates - Stopping...

echo.
echo ============================================================
echo                RePoint Pilates System Stop
echo ============================================================
echo.

echo Stopping all services...
docker-compose -f docker-compose.prod.yml down

echo.
echo All services stopped.
echo.
pause
