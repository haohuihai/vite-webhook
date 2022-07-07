#!/bin/bash
WORK_PATH='/root/project/vite-project/vite-back'
cd $WORK_PATH
echo "清理代码"
git reset --hard origin/main
git clean -f
echo "拉取最新代码"
git pull origin main
echo "开始构建镜像"
docker build -t vite-back .
echo "删除旧容器"
docker stop vite-back-container
docker rm vite-back-container
echo "启动新容器"
docker container run -p 10001:10001 -d --name vite-back-container vite-back