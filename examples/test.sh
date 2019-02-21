#!/bin/sh

npm link

for dir in `ls -d $PWD/examples/*/`;
do
    cd $dir
    npm i && npm link @vrt/react && npm t
    STATUS=$?
    if [ $STATUS -ne 0 ]; then
        exit $STATUS
    fi
done
