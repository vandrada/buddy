FROM python:3.6-alpine

RUN apk update && apk add libpq postgresql-libs postgresql-dev gcc musl-dev
COPY . /mnt

ENV DB_NAME="buddy"
ENV DB_HOST="localhost"
ENV DB_USER="buddy"
ENV DB_PASS=""

WORKDIR /mnt
RUN pip install -r requirements.txt
ENV FLASK_APP=/mnt/app.py

CMD ["flask", "run", "--host=0.0.0.0"]
