FROM base/archlinux

#update & utilitiess
RUN pacman -Syyy --noconfirm
RUN pacman -S --noconfirm zsh

#mongo setup
RUN pacman -S --noconfirm community/mongodb
RUN mkdir /db

#nodejs setup
RUN pacman -S --noconfirm nodejs

#volumes
VOLUME /www_root/server
VOLUME /www_root/server/logs
VOLUME /www_root/client

#start up
RUN touch /todo
RUN echo 'LAUNCH_TIME=`date +"%H-%M-%S_%m-%d-%y"`' >> /todo
RUN echo 'LOGS_ROOT="/www_root/server/logs/$LAUNCH_TIME"' >> /todo

RUN echo 'mkdir $LOGS_ROOT' >> /todo
RUN echo 'cd /www_root/server' >> /todo

RUN echo 'echo "                                     "' >> /todo
RUN echo 'echo " ____                                "' >> /todo
RUN echo 'echo "|    \ ___ ___ ___ ___ ___           "' >> /todo
RUN echo 'echo "|  |  | -_| . |  _| -_| -_|          "' >> /todo
RUN echo 'echo "|____/|___|_  |_| |___|___|          "' >> /todo
RUN echo 'echo "          |___|                      "' >> /todo
RUN echo 'echo "                                     "' >> /todo
RUN echo 'echo " _____                 _             "' >> /todo
RUN echo 'echo "|     |_ _ ___ ___ _ _|_|___ _ _ _   "' >> /todo
RUN echo 'echo "|  |  | | | -_|  _| | | | -_| | | |  "' >> /todo
RUN echo 'echo "|_____|\_/|___|_|  \_/|_|___|_____|  "' >> /todo
RUN echo 'echo "                                     "' >> /todo

RUN echo 'echo Installing npm modules...' >> /todo

RUN echo 'npm install . --save-dev --no-bin-links 2>&1 1>$LOGS_ROOT/npm.log' >> /todo
RUN echo 'npm install -g nodemon 2>&1 1>$LOGS_ROOT/npm-nodemon.log' >> /todo

RUN echo 'echo Done.' >> /todo
RUN echo 'echo Starting mongodb...' >> /todo

RUN echo 'mongod --dbpath /db --port 27017 --nojournal 1>$LOGS_ROOT/mongo.out.log 2>$LOGS_ROOT/mongo.err.log &' >> /todo
RUN echo 'ping 127.0.0.1 -c 4 1> /dev/null 2>/dev/null' >> /todo

RUN echo 'echo Done.' >> /todo
RUN echo 'echo Populating database...' >> /todo

RUN echo 'node createDB.js 1>$LOGS_ROOT/node-createDB.out.log 2>$LOGS_ROOT/node-createDB.err.log' >> /todo

RUN echo 'echo Done.' >> /todo

RUN echo 'echo All staff was started. Enjoy! Use stop.cmd to stop docker and VM' >> /todo
RUN echo '/usr/bin/nodemon -w /www_root ./src/main/js/app.js 1>$LOGS_ROOT/node.out.log 2>$LOGS_ROOT/node.err.log' >> /todo
ENTRYPOINT ["/bin/bash", "/todo"]
