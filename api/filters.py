from aenum import Enum


def dict_filter(dictionary, key, target):
    dict_value = dictionary.get(key)
    if not dict_value:
        return False

    if type(dict_value) == int:
        return dict_value == int(target)
    if type(dict_value) == str:
        return dict_value == target
    if type(dict_value) == float:
        return dict_value == float(target)
    if issubclass(type(dict_value), Enum):
        enum_type = type(dict_value)
        try:
            return enum_type(dict_value) == enum_type(target)
        except ValueError:
            return False
    return dict_value == target
