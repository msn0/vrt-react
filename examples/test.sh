#!/bin/sh

STATUS=0

find ./examples -depth 1 -type d -exec sh -c 'cd -- "{}" && npm i && npm t && STATUS=$(($STATUS+$?))' \;
