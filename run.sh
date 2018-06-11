#!/bin/bash
kill $(ps aux | grep 'node server' | awk '{print $2}')

cd  /home/azbyc/projects/Library/dist
git pull origin master
node server
