import api.loader as loader

from collections import OrderedDict


def test_csv_parser():
    grocery = OrderedDict()
    grocery["ID"] = "1123123"
    grocery["Description"] = "test item"
    grocery["lastSold"] = "12/12/2012"
    grocery["ShelfLife"] = "45d"
    grocery["Department"] = "Grocery"
    grocery[" Price "] = "$4.99"
    grocery["Unit"] = "lb"
    grocery["xFor"] = 1
    grocery[" Cost"] = "$1.99"

    parsed = loader.parse_csv(grocery)
    assert parsed
    assert parsed["cost"] == 1.99
    assert parsed["price"] == 4.99
    assert parsed["shelf_life"] == 45
