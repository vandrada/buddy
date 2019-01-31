from .db import Connection
from .models import Product
from sqlalchemy.sql import select


class ProductController:
    def __init__(self):
        self.db = Connection()

    def list(self):
        with self.db.connect() as conn:
            query = select([Product])
            result = conn.execute(query)
            return [dict(row) for row in result]
