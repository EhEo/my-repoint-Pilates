@echo off
chcp 65001 >nul
title RePoint Pilates - Starting...

echo.
echo ============================================================
echo                RePoint Pilates System Start
echo ============================================================
echo.

:: Check Docker
docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running.
    echo Please start Docker Desktop first.
    echo.
    pause
    exit /b 1
)

echo [1/4] Docker OK
echo.

:: Clean existing containers
echo [2/4] Cleaning existing containers...
docker-compose -f docker-compose.prod.yml down >nul 2>&1

:: Build and start
echo [3/4] Building and starting services... (2-5 min)
echo.
docker-compose -f docker-compose.prod.yml up --build -d

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to start services.
    pause
    exit /b 1
)

echo.
echo [4/4] Services started!
echo.

:: Wait for services
timeout /t 5 /nobreak >nul

echo ============================================================
echo                   Service URLs
echo ============================================================
echo.
echo   Landing Page:     http://localhost:3000
echo   Admin Dashboard:  http://localhost:4173
echo   API Server:       http://localhost:8080
echo.
echo ============================================================
echo                   Admin Login
echo ============================================================
echo.
echo   Email:    admin@repoint.local
echo   Password: admin1234
echo.
echo ============================================================

:: Open browser
echo.
echo Open browser? (Y/N)
set /p open_browser="> "
if /i "%open_browser%"=="Y" (
    start http://localhost:3000
    timeout /t 2 /nobreak >nul
    start http://localhost:4173
)

echo.
echo To stop services, run stop.bat
echo.
pause
