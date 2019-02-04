# Buddy

## API
The api is built using Flask, Python 3, and alembic to manage the database
migrations.

### Database
The api assumes a PostgreSQL database.

### Environment Variables
The api is largely driven by environment variables. The following are the ones
that are important:

* `DB_NAME`: the name of the database to connect to, assumes `buddy`
* `DB_HOST`: the db cluster host, assumes `localhost`
* `DB_USER`: the user to connect as, assumes $USER or, `buddy`
* `DB_PASS`: the password for the database, if required. Makes no assumptions

### Up and Running

#### Docker
If you don't want to run through the steps manually, there are two scripts
included in the API directory that get the database migrated and starts the
docker container. You can run the following commands in the `api` directory.

**Note**: if using `pyenv`, I had to run `pyenv rehash` after installing the
dependencies.

If running on anything besides Linux, you may need to pass the `DB_HOST`
variable.  On OS X, it needs to be `env DB_HOST=docker.for.mac.host.internal`.
There's also a separate script `run-docker-osx.sh` for running on OS X.

```
$ pip install -r requirements-minimal.txt
$ docker build -t buddy .
$ ./prep-db.sh
$ docker run -it --rm --net host [-e DB_HOST=docker.for.mac.host.internal] buddy python /mnt/loader.py
$ ./run-docker.sh # or ./run-docker-osx.sh
```

Or, you can follow the directions below to go step-by-step.

#### 100% On the Metal

To install the dependencies into whichever virtualenv you have set up, run the
following command in the `api` directory. 

```
$ pip install -r requirements.txt
```

To get your local database started

```
$ createdb buddy
$ alembic upgrade head
$ python loader.py
```

To run the tests,

```
$ python -m pytest
```

Finally, to run the app proper, run

```
$ FLASK_APP=app.py flask run
```

After this, the api should be running on :5000

### Endpoints
The api exposes one endpoint

* GET `/inventory`

by default it lists all products.  Searching can be enabled with url parameters.

For example, getting `/inventory?department=Grocery` will return products in the
Grocery department.

Getting `/inventory?department=Produce&unit=lb` will list all products in the
Produce department that are sold by the pound

### Docker
There's also an included Dockerfile, that can be built with

```
$ docker build -t buddy .
```

To run the container, you can use `run-docker.sh`. The script runs the
container on the host network for simplicity.

## UI
The UI is build using React and Typescript. Run the following commands in the
`ui` directory.

To install the dependencies, run

```
$ yarn install
```

To run the tests

```
$ yarn test
````

To run the app, run

```
$ yarn start
```

Or to build a production release,

```
$ yarn build
$ yarn add serve
$ serve -s build
```

The UI has two ways to filter/search:

Client-side searching via filters included in the table and server side
searching via the "Advanced Search" button.
