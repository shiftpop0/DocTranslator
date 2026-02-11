@echo off
echo ==========================================
echo       DocTranslator Launcher
echo ==========================================
echo.
echo Starting services...
docker-compose -f docker-compose.offline.yml up -d

if %errorlevel% neq 0 (
    echo Error starting services!
    pause
    exit /b %errorlevel%
)

echo.
echo Services started successfully!
echo Frontend: http://localhost:1475 (or http://SERVER_IP:1475)
echo Admin: http://localhost:8081 (or http://SERVER_IP:8081)
echo Backend: http://localhost:5000
echo.
pause
