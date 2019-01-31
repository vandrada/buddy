import os
from api.db import Connection


def test_default_pass():
    os.environ["DB_PASS"] = "supersecret"
    connection = Connection()
    assert connection.db_pass == "supersecret"


def test_default_host():
    os.environ["DB_HOST"] = "superlocalhost"
    connection = Connection()
    assert connection.db_host == "superlocalhost"


def test_default_user():
    connection = Connection()
    assert connection.db_user == os.getenv("USER")


def test_default_user_env():
    new_user = f"{os.getenv('USER')}_updated"
    os.environ["DB_USER"] = new_user
    connection = Connection()
    assert connection.db_user == new_user


def test_default_db_name():
    connection = Connection()
    assert connection.db_name == "buddy"


def test_default_db_name_env():
    os.environ["DB_NAME"] = "super_prod"
    connection = Connection()
    assert connection.db_name == "super_prod"


def test_no_leaky_str():
    connection = Connection()
    assert ":*******@" in str(connection)
