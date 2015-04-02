mkdir project_root
sudo mount -t vboxsf degree ./project_root
cd project_root
docker build -t agile-dev-class-image .
docker run -d -p 8080:8080 -v ~/project_root/src:/src agile-dev-class-image
