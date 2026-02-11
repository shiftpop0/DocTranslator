docker build -t doctranslator-local ../backend
docker pull nginx:stable-alpine
docker save -o images.tar doctranslator-local nginx:stable-alpine
