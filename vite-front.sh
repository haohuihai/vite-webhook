#!/bin/bash
WORK_PATH='/root/project/vite-project/vite-front'
cd $WORK_PATH

echo '清理代码'
git reset --hard origin/master
git clean -f
echo '拉取最新代码'
git pull origin master

echo "打包最新代码"
npm run build
echo '开始构建镜像'
docker build -t vite-front:1.0 .
echo '删除旧容器'
docker stop vite-front-container
docker rm vite-front-container
echo '启动新容器'
docker container run -p 3000:80 -d --name vite-front-container vite-front:1.0