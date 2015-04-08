#!/usr/bin/env bash
mkdir -p ~/project_root
sudo mount -t vboxsf degree ~/project_root
cd ~/project_root
#docker rm $(docker ps -aq)
#docker rmi $(docker images | grep base -v | sed -n -r 's/^.*([0-9a-f]{12}).*$/\1/p')
docker build -t server-image ~/project_root
docker run --rm=true -i -p 8080:8080 \
  -v ~/project_root/server:/www_root/server \
  -v ~/project_root/client:/www_root/client \
  -v ~/project_root/server/logs:/www_root/server/logs \
  server-image