@echo off
docker-compose -f docker-compose.offline.yml up -d
echo Services started!
echo Frontend: http://localhost:1475 (or http://SERVER_IP:1475)
echo Admin: http://localhost:8081 (or http://SERVER_IP:8081)
pause
