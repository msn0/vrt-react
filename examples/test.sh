#!/bin/sh

CURRENT_DIR=`dirname "$0"`
STATUS=0

find $CURRENT_DIR -depth 1 -type d -exec sh -c 'cd -- "{}" && npm i && npm t && STATUS=$(($STATUS+$?))' \;
