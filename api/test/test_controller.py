from api.controllers import ProductController


def test_list_connects_to_db(mocker):
    controller = ProductController()
    mocker.spy(controller.db, "connect")
    mocker.patch.object(controller.db, "connect")
    controller.list()
    assert controller.db.connect.call_count == 1
