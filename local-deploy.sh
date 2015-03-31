#sudo mount -t vboxsf
#docker exec -it b81cd8fcb479 bash

docker build -t agile-dev-class-image .
docker run -d -p 8080:8080 -v /agile-dev-class/src:/src agile-dev-class-image
