from aenum import Enum

import sqlalchemy as db
from sqlalchemy_utils import ArrowType

metadata = db.MetaData()


class Department(Enum):
    Produce = "Produce"
    Grocery = "Grocery"
    Pharmacy = "Pharmacy"


class Unit(Enum):
    Pound = "lb"
    Each = "Each"


Product = db.Table(
    "product",
    metadata,
    db.Column("id", db.Integer, primary_key=True, autoincrement=True, nullable=False),
    db.Column("product_id", db.Integer, primary_key=True),
    db.Column("description", db.String),
    db.Column("last_sold", ArrowType),
    db.Column("shelf_life", db.Integer, comment="shelf life in days"),
    db.Column("department", db.Enum(Department)),
    db.Column("price", db.BigInteger, comment="price in cents"),
    db.Column("unit", db.Enum(Unit)),
    db.Column("x_for", db.Integer),
    db.Column("cost", db.BigInteger, comment="cost in cents"),
    db.UniqueConstraint("product_id", "department", name="product_unique_idx"),
)
