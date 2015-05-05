#!/bin/bash

if [[ "$(id -u)" != "0" && ! "$(groups)" =~ $(echo '\bdocker\b') ]]; then
    if [[ "$(groups)" =~ $(echo '\b(wheel|adm)\b') ]]; then
        exec sudo "$0"
    else
        exec su -c "$(pwd)/$0"
    fi
fi

projectDir="$(readlink -f "$(dirname "$0")")"

docker rm degree-overview 1>/dev/null 2>&1

docker build -t server-image "$projectDir" \
        && docker run --name=degree-overview --rm -t -i -p 8080:8080 \
                  -v "$projectDir/server:/www_root/server" \
                  -v "$projectDir/client:/www_root/client" \
                  -v "$projectDir/server/logs:/www_root/server/logs" \
                  server-image
