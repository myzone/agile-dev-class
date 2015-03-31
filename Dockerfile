FROM base/archlinux

#update
RUN pacman -Syy --noconfirm

#volume
VOLUME /src

#mongo setup
RUN pacman -S --noconfirm mongodb
RUN mkdir /db

#nodejs setup
RUN pacman -S --noconfirm nodejs

RUN touch todo
RUN echo "cd /src/js" >> todo

RUN echo "rm -rf logs " >> todo
RUN echo "mkdir logs" >> todo

RUN echo "npm install . --save-dev --no-bin-links 2>&1 1>logs/npm.log" >> todo

RUN echo "mongod --dbpath /db --port 27017 1>logs/mongo.log.out 2>logs/mongo.err.log &" >> todo
RUN echo "node createDB.js 1>logs/node-createDB.log.out 2>logs/node-createDB.err.log" >> todo
RUN echo "node bin/www.js 1>logs/node.log.out 2>logs/node.err.log" >> todo

ENTRYPOINT ["/bin/bash", "todo"]