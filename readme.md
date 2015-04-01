DegreeOverview
======================

Docker usage
======================
* install [boot2docker](http://boot2docker.io/) according to you host OS. __note: be careful with its installation, it may cause a lot of strange problems__.
* setup Virtual Box's folder sharing. you should share your project root.
* connect to boot2docker VM via `boot2docker ssh`
* run `mkdir /agile-dev-class` and `sudo mount -t vboxsf __your_shared_folder_name__ /agile-dev-class` to connect you host FS to VM's one.
* run `cd /agile-dev-class`
* run `docker build -t agile-dev-class-image` to build our container image according to our `Dockerfile`
* run `docker run -d -p 8080:8080 -v /agile-dev-class/src:/src agile-dev-class-image` to run container with our image

Some of these commands are also specified in local-deploy.sh file.

Local deploy (without docker)
======================
* install Node.JS
    **Windows, mac os, linux:** https://nodejs.org/download
* install MongoDB
    **Windows, mac os, linux:** https://www.mongodb.org/downloads
* in command line run **mongod.exe** from root *MongoDB/Server/3.0/bin*
* create in root C: (Windows) new folder **data/db**
* clone repository
* run `cd src/js && npm install && node createDB.js && npm start` (node should be in Path environment)
* localhost:8080 in browser
