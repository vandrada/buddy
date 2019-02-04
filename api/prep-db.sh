#!/usr/bin/env bash

createdb -e buddy
alembic upgrade head
