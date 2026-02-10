#!/bin/bash
echo "=========================================="
echo "      DocTranslator Launcher"
echo "=========================================="
echo ""
echo "Starting services..."
docker-compose -f docker-compose.offline.yml up -d

if [ $? -ne 0 ]; then
    echo "Error starting services!"
    exit 1
fi

echo ""
echo "Services started successfully!"
echo "Frontend: http://localhost:1475"
echo "Admin: http://localhost:8081"
echo "Backend: http://localhost:5000"
