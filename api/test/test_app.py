import json

import api.loader as loader
import pytest
from api.controllers import ProductController


@pytest.fixture()
def test_app(mocker):
    from api.app import app

    records = loader.read_csv("./resources/initial.csv")

    client = app.test_client()
    mocker = mocker.patch.object(ProductController, "_list_all")
    mocker.return_value = records
    yield client


def test_inventory_list(test_app):
    response = test_app.get("/inventory")
    data = json.loads(response.data)
    assert response.status_code == 200
    assert len(data) == 20


def test_inventory_list_produce(test_app):
    response = test_app.get("/inventory?department=Produce")
    data = json.loads(response.data)

    assert response.status_code == 200
    assert len(data) == 7


def test_inventory_list_grocery(test_app):
    response = test_app.get("/inventory?department=Grocery")
    data = json.loads(response.data)

    assert response.status_code == 200
    assert len(data) == 8


def test_inventory_list_pharmacy(test_app):
    response = test_app.get("/inventory?department=Pharmacy")
    data = json.loads(response.data)

    assert response.status_code == 200
    assert len(data) == 5


def test_inventory_list_various(test_app):
    response = test_app.get("/inventory?department=Pharmacy&product_id=9000005")
    data = json.loads(response.data)
    assert response.status_code == 200
    assert len(data) == 1

    # the e disappeared
    response = test_app.get(
        "/inventory?department=Grocery&cost=0.19&description=canned vegtables"
    )
    data = json.loads(response.data)
    assert response.status_code == 200
    assert len(data) == 1

    response = test_app.get("/inventory?product_id=753542&department=Produce")
    data = json.loads(response.data)
    assert response.status_code == 200
    assert len(data) == 1
