from .db import Connection
from .models import Product
from sqlalchemy.sql import select

from .filters import dict_filter


class ProductController:
    def __init__(self):
        self.db = Connection()

    def _filtered(self, results, filters):
        for key, value in filters.items():
            results = list(filter(lambda d: dict_filter(d, key, value), results))
        return list(results)

    # TODO move to model?
    def _list_all(self):
        with self.db.connect() as conn:
            query = select([Product])
            result = conn.execute(query)
            results = [dict(row) for row in result]
            return results

    def list(self, filters=None):
        results = self._list_all()
        # I assume using SQL is using a third-party searching algorithm
        if filters:
            return self._filtered(results, filters)
        return results
