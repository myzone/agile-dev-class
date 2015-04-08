mkdir -p ~/project_root
sudo mount -t vboxsf degree ~/project_root
cd ~/project_root
docker build -t server-image ~/project_root
docker run --rm=true -i -p 8080:8080 -v ~/project_root/src:/src -v ~/project_root/logs:/logs server-image