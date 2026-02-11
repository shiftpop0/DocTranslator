#!/bin/bash
echo "=========================================="
echo "      DocTranslator Offline Installer"
echo "=========================================="
echo ""
echo "Loading Docker images from images.tar..."
docker load -i images.tar

if [ $? -ne 0 ]; then
    echo "Error loading images!"
    exit 1
fi

echo ""
echo "Images loaded successfully!"
echo "You can now run './run_server.sh' to start the application."
