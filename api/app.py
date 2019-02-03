from flask import Flask, jsonify, request

from flask_cors import CORS

from .controllers import ProductController
from .encoders import BuddyEncoder

app = Flask("buddy")
CORS(app)
app.json_encoder = BuddyEncoder


@app.route("/inventory", methods=["GET"])
def list_products():
    controller = ProductController()
    filters = request.args
    return jsonify(controller.list(filters=filters))
