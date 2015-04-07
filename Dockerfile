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
VOLUME /src
VOLUME /logs

#start up
RUN touch /todo
RUN echo 'LAUNCH_TIME=`date +"%H-%M-%S_%m-%d-%y"`' >> /todo
RUN echo 'LOGS_ROOT="/logs/$LAUNCH_TIME"' >> /todo

RUN echo 'cd /src/js' >> /todo
RUN echo 'mkdir $LOGS_ROOT' >> /todo

RUN echo 'npm install . --save-dev --no-bin-links 2>&1 1>$LOGS_ROOT/npm.log' >> /todo
RUN echo 'npm install -g nodemon 2>&1 1>$LOGS_ROOT/npm-nodemon.log' >> /todo

RUN echo 'mongod --dbpath /db --port 27017 --nojournal 1>$LOGS_ROOT/mongo.out.log 2>$LOGS_ROOT/mongo.err.log &' >> /todo
RUN echo 'ping 127.0.0.1 -c 10 1> /dev/null 2>/dev/null' >> /todo
RUN echo 'node createDB.js 1>$LOGS_ROOT/node-createDB.out.log 2>$LOGS_ROOT/node-createDB.err.log' >> /todo
RUN echo '/usr/bin/nodemon -w . bin/www.js 1>$LOGS_ROOT/node.out.log 2>$LOGS_ROOT/node.err.log' >> /todo
RUN echo 'echo All the staff were started! Enjoy!' >> /todo
#RUN echo 'node bin/www.js 1>$LOGS_ROOT/node.out.log 2>$LOGS_ROOT/node.err.log' >> /todo

ENTRYPOINT ["/bin/bash", "/todo"]
