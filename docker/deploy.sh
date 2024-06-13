#!/bin/sh
# echo "Please enter ARC password to login the registry"
# docker login -u=mdude@aliyun.com registry.cn-hangzhou.aliyuncs.com

# docker compose pull

# docker compose build --no-cache --force-rm
docker-compose build

docker-compose down

docker-compose up -d
