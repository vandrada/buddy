# Buddy

## API
The api is built using Flask and alembic to manage the database migrations.

### Database
The api assumes a PostgreSQL database

### Environment Variables
The api is largely driven by environment variables. The following are the ones
that important:

* `DB_NAME`: the name of the database to connect to, assumes `buddy`
* `DB_HOST`: the db cluster host, assumes `localhost`
* `DB_USER`: the user to connect as, assumes $USER or, `buddy`
* `DB_PASS`: the password the database, if required. Makes no assumptions

### Up and Running

To install the dependencies into whichever virtualenv you have set up, run

```
$ pip install -r requirements.txt
```

To get your local database started

```
$ createdb buddy
$ alembic upgrade head
```

To run the tests,

```
$ python -m pytest
```

Finally, to run the app proper, run

```
$ cd api
$ FLASK_APP=app.py flask run
```

After this, the api should be running on :5000

### Endpoints
The api exposes one endpoint `/inventory`, by default it lists all products.
Searching can be enabled with url parameters.

For example, getting `/inventory?department=Grocery` will return products in the
Grocery department.

Getting `/inventory?department=Produce&unit=lb` will list all products in the
Produce inventory that are sold by the pound

## UI
The UI is build using React and Typescript.

To install the dependencies, run

```
$ cd ui
$ yarn install
```

To run the tests

```
$ yarn test
````

To run the app, run

```
$ cd ui
$ yarn start
```

Or to build a production release,

```
$ cd ui
$ yarn build
$ yarn add serve
$ serve -s build
```

The UI has two ways to filter/search:

Client-side searching via filters included in the table and server side
searching via the "Advanced Search" button.
