import json
from flask.json import JSONEncoder
import arrow

from aenum import Enum


class BuddyEncoder(JSONEncoder):
    def default(jself, obj):
        if isinstance(obj, Enum):
            return obj.name
        elif isinstance(obj, arrow.Arrow):
            return obj.format("YYYY-MM-DD HH:mm:ss ZZ")
        else:
            return json.JSONEncoder.default(self, obj)


class EnumEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Enum):
            return obj.name
        return json.JSONEncoder.default(self, obj)


class ArrowJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        try:
            if isinstance(obj, arrow.Arrow):
                return obj.format("YYYY-MM-DD HH:mm:ss ZZ")
            iterable = iter(obj)
        except TypeError:
            pass
        else:
            return list(iterable)
        return JSONEncoder.default(self, obj)
