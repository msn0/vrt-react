#!/bin/sh

for dir in `ls -d $PWD/examples/*/`;
do
    cd $dir
    npm i && npm t -- --fail
    STATUS=$?
    if [ $STATUS -ne 0 ]; then
        exit $STATUS
    fi
done