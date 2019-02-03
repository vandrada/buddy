#!/usr/bin/env bash

createdb -e buddy
alembic upgrade head
echo "loading"
docker run -it --rm --net host buddy python /mnt/loader.py
