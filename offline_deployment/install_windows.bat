@echo off
echo ==========================================
echo       DocTranslator Offline Installer
echo ==========================================
echo.
echo Loading Docker images from images.tar...
docker load -i images.tar

if %errorlevel% neq 0 (
    echo Error loading images!
    pause
    exit /b %errorlevel%
)

echo.
echo Images loaded successfully!
echo You can now run 'run_windows.bat' to start the application.
echo.
pause
