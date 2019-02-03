#!/usr/bin/env bash

docker build -t buddy .
docker run -it --rm --net=host buddy
