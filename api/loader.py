import csv

import db
from models import Product, Department, Unit


def parse_csv(csv_record):
    """
    Parsing may be a little too strong of a description
    """
    # I'm not sure if this is a mistake in the csv file, the fact that it
    # was embedded in the PDF, or if it's just a gotcha
    price = float(csv_record[" Price "].strip().split("$")[1]) * 100
    cost = float(csv_record[" Cost"].strip().split("$")[1]) * 100
    shelf_life = csv_record["ShelfLife"].split("d")[0]

    return {
        "product_id": csv_record["ID"],
        "description": csv_record["Description"],
        "last_sold": csv_record["lastSold"],
        "shelf_life": shelf_life,
        "department": Department(csv_record["Department"]),
        "price": price,
        "unit": Unit(csv_record["Unit"]),
        "x_for": csv_record["xFor"],
        "cost": cost,
    }


def read_csv(file):
    with open(file) as input_csv:
        reader = csv.DictReader(input_csv)
        return [parse_csv(line) for line in reader]


def add(conn, record):
    ins = Product.insert(record)
    conn.execute(ins)


def main():
    records = read_csv("./resources/initial.csv")
    connection = db.Connection()
    with connection.connect() as conn:
        for record in records:
            add(conn, record)


if __name__ == "__main__":
    main()
