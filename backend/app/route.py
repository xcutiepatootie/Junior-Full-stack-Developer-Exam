import sqlite3
from flask import Blueprint, jsonify, request
from .database import connect_db

bp = Blueprint("main", __name__)


@bp.route("/")
def hello_world():
    return "<h1>Hello World!!!</h1>"


@bp.route("/api/items", methods=["GET"])
def get_items():
    conn = connect_db()
    items = conn.execute("SELECT * FROM items").fetchall()
    conn.close()
    return jsonify([dict(item) for item in items])


@bp.route("/api/items/<int:item_id>", methods=["GET"])
def get_itemByID(item_id):
    conn = connect_db()
    item = conn.execute("SELECT * FROM items where id = ?", (item_id,)).fetchone()
    conn.close()
    if item is None:
        return jsonify({"error": "Item Not Found"}), 404
    return jsonify(dict(item))


@bp.route("/api/items", methods=["POST"])
def add_item():
    new_item = request.json
    name = new_item.get("name")
    description = new_item.get("description")
    price = new_item.get("price")
    conn = connect_db()
    try:
        conn.execute(
            "INSERT INTO items(name, description, price) VALUES(?, ?, ?)",
            (name, description, price),
        )
        conn.commit()
        conn.close()
        return jsonify({"status": "Item Added"}), 201
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({"error": "Something went Wrong"})


@bp.route("/api/items/<int:item_id>", methods=["PUT"])
def update_item(item_id):
    update_request = request.json
    name = update_request.get("name")
    description = update_request.get("description")
    price = update_request.get("price")
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?",
        (name, description, price, item_id),
    )
    conn.commit()
    if cursor.rowcount == 0:
        conn.close()
        return jsonify({"error": "Item not found"}), 404
    conn.close()
    return jsonify({"status": "Item Updated"})


@bp.route("/api/items/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM items where id = ?", (item_id))
    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        return jsonify({"error": "Item not found"}), 404

    return jsonify({"status": "Item Deleted"})


