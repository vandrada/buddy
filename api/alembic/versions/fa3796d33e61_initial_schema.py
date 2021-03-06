"""initial schema

Revision ID: fa3796d33e61
Revises:
Create Date: 2019-01-30 21:01:40.858596

"""
from alembic import op
import sqlalchemy as sa

from sqlalchemy_utils import ArrowType

from models import Department, Unit

# revision identifiers, used by Alembic.
revision = "fa3796d33e61"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.get_bind().execute("CREATE ROLE buddy WITH LOGIN")

    op.create_table(
        "product",
        sa.Column(
            "id", sa.Integer, primary_key=True, autoincrement=True, nullable=False
        ),
        sa.Column("product_id", sa.Integer, primary_key=True),
        sa.Column("description", sa.String),
        sa.Column("last_sold", ArrowType),
        sa.Column("shelf_life", sa.Integer, comment="shelf life in days"),
        sa.Column("department", sa.Enum(Department)),
        sa.Column("price", sa.Float, comment="price in cents"),
        sa.Column("unit", sa.Enum(Unit)),
        sa.Column("x_for", sa.Integer),
        sa.Column("cost", sa.Float, comment="cost in cents"),
        sa.UniqueConstraint("product_id", "department", name="product_unique_idx"),
    )

    op.get_bind().execute("GRANT ALL PRIVILEGES ON product TO buddy")
    op.get_bind().execute("GRANT ALL PRIVILEGES ON product_id_seq TO buddy")


def downgrade():
    op.drop_table("product")
    op.get_bind().execute("DROP ROLE buddy")
