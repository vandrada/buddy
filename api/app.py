from flask import Flask, jsonify
from .models import Product
from .controllers import ProductController
from .encoders import BuddyEncoder

# from flask_sqlalchemy import SQLAlchemy
# db = SQLA

app = Flask("buddy")
app.json_encoder = BuddyEncoder


@app.route("/inventory", methods=["GET"])
def list_products():
    controller = ProductController()
    return jsonify(controller.list())
