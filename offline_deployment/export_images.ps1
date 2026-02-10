# Export Docker Images for Offline Deployment

Write-Host "Building backend image..."
docker build -t doctranslator-local ../backend

Write-Host "Pulling Nginx image..."
docker pull nginx:stable-alpine

Write-Host "Saving images to images.tar..."
docker save -o images.tar doctranslator-local nginx:stable-alpine

Write-Host "Export complete! File: offline_deployment/images.tar"
