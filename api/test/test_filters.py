from api.filters import dict_filter
from api.models import Department


def test_string():
    d = {"hello": "world"}
    assert dict_filter(d, "hello", "world") is True


def test_string_space():
    d = {"hello": "world wide"}
    assert dict_filter(d, "hello", "world wide") is True


def test_string_negative():
    d = {"hello": "mundo"}
    assert dict_filter(d, "hello", "world") is False


def test_int():
    d = {"hello": 23}
    assert dict_filter(d, "hello", 23) is True


def test_int_negative():
    d = {"hello": 23}
    assert dict_filter(d, "hello", 42) is False


def test_float():
    d = {"hello": 2.3}
    assert dict_filter(d, "hello", 2.3) is True


def test_float_negative():
    d = {"hello": 2.4}
    assert dict_filter(d, "hello", 2.3) is False


def test_enum():
    d = {"hello": Department.Grocery}
    assert dict_filter(d, "hello", Department.Grocery) is True


def test_enum_negative():
    d = {"hello": Department.Pharmacy}
    assert dict_filter(d, "hello", Department.Grocery) is False


def test_enum_freeform():
    d = {"hello": Department.Produce}
    assert dict_filter(d, "hello", "world") is False
