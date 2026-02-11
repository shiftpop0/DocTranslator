# 1. Ask for Build
$choice = Read-Host "Do you want to build the frontend and admin projects before packaging? (Y/N)"
if ($choice -eq 'Y' -or $choice -eq 'y') {
    Write-Host "Building Frontend..."
    Push-Location "..\frontend"
    npm run build:prod
    if ($LASTEXITCODE -ne 0) { Write-Error "Frontend build failed!"; exit 1 }
    Pop-Location

    Write-Host "Building Admin..."
    Push-Location "..\admin"
    npm run build:prod
    if ($LASTEXITCODE -ne 0) { Write-Error "Admin build failed!"; exit 1 }
    Pop-Location
}

# 2. Export Images
Write-Host "2. Building and Exporting Images (this may take a while)..."
.\export_images.ps1

# 2. Prepare Update Folder
$updateDir = "..\DocTranslator_Update"
Write-Host "3. Preparing Update Package in $updateDir..."

if (Test-Path $updateDir) { Remove-Item -Recurse -Force $updateDir }
New-Item -ItemType Directory -Path $updateDir | Out-Null

# 4. Copy Folders
# Function to copy with exclusion
function Copy-With-Exclude ($src, $dest) {
    New-Item -ItemType Directory -Path $dest -Force | Out-Null
    Copy-Item -Recurse -Path "$src\*" -Destination $dest -Exclude ".git", "__pycache__", "venv", "node_modules", ".idea", ".vscode"
}

Write-Host "   - Copying Backend..."
Copy-With-Exclude "..\backend" "$updateDir\backend"

Write-Host "   - Copying Frontend (dist only)..."
if (Test-Path "..\frontend\dist") {
    Copy-Item -Recurse -Path "..\frontend\dist" -Destination "$updateDir\frontend\dist"
} else {
    Write-Warning "Frontend dist folder not found! Please build frontend first."
}

Write-Host "   - Copying Admin (dist only)..."
if (Test-Path "..\admin\dist") {
    Copy-Item -Recurse -Path "..\admin\dist" -Destination "$updateDir\admin\dist"
} else {
    Write-Warning "Admin dist folder not found! Please build admin first."
}

Write-Host "   - Copying Nginx Config..."
Copy-With-Exclude "..\nginx" "$updateDir\nginx"

Write-Host "   - Copying Deployment Scripts..."
Copy-With-Exclude "." "$updateDir\offline_deployment"

# 4. Instructions
$instructions = @"
=========================================
DocTranslator Update Instructions
=========================================

1. Stop the existing services on the server:
   cd DocTranslator/offline_deployment
   docker-compose -f docker-compose.offline.yml down

2. Backup your existing data (Optional but Recommended):
   - Backup 'backend/db' and 'backend/storage' if you have important data.

3. Copy the contents of this 'DocTranslator_Update' folder to your server's 'DocTranslator' folder.
   - Allow overwriting of files.
   - WARNING: This will overwrite 'backend/db/prod.db'. If you want to keep the server's existing database, DO NOT overwrite the 'db' folder, OR manually merge the database files.

4. Re-load the images (in case of dependency changes):
   cd offline_deployment
   ./install_server.sh (Linux) or install_windows.bat (Windows)

5. Start the services:
   ./run_server.sh (Linux) or run_windows.bat (Windows)

"@
Set-Content -Path "$updateDir\UPDATE_GUIDE.txt" -Value $instructions

Write-Host "Done! The update package is ready at: $updateDir"
Write-Host "You can now copy the '$updateDir' folder to your offline server."
