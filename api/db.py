import os

from sqlalchemy import create_engine

_defaults = {
    "db_pass": os.getenv("DB_PASS", ""),
    "db_host": os.getenv("DB_HOST", "localhost"),
    "db_name": os.getenv("DB_NAME", "buddy"),
    # $DB_USER, or $USER, or buddy
    "db_user": os.getenv("DB_USER", os.getenv("USER", "buddy")),
}


class Connection:
    """
    Wrapper around SQLAlchemy's Core API. Connection options can come from three
    places in order of decreasing priority:
    * passed to the constructor
    * sourced from the enviornment
    * defaults that try to be sensible
    """

    def __init__(self, db_host=None, db_name=None, db_user=None, db_pass=None):
        self.db_host = db_host
        self.db_name = db_name
        self.db_user = db_user
        self.db_pass = db_pass
        self._configure()
        self.engine = None

    def connect(self):
        url = self._connect_str(with_password=True)
        self.engine = create_engine(url, echo=os.getenv("DB_ECHO", False))
        return self.engine.connect()

    def _configure(self):
        """
        Configures the database using some of Python's built-in introspection
        features. While the code may be kinda funky, it allows the for the
        `_defaults` dict to above to drive everything
        """
        for k, v in _defaults.items():
            if getattr(self, k) is None:
                setattr(self, k, v)

    def _connect_str(self, with_password=False):
        password = self.db_pass if with_password else "*******"
        return f"postgresql://{self.db_user}:{password}@{self.db_host}/{self.db_name}"

    def _str_(self):
        return self._connect_str()
