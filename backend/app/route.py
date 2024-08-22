import os
import sqlite3
import time
import bcrypt
import jwt
import re
from flask import Blueprint, jsonify, request
from .database import connect_db
from dotenv import load_dotenv


bp = Blueprint("main", __name__)
load_dotenv()

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")


@bp.route("/")
def hello_world():
    return "<h1>Hello World!!!</h1><br/><h1>This is a REST api endpoint for my Junior Full-stack developer techincal examination.<h1>"


# Main Tasks
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

    if not name:
        return jsonify({"error": "Name is required"})

    if not isinstance(price, (int, float)):
        return jsonify({"error": "Price must be a number"})

    if price <= 0:
        return jsonify({"error": "Price must be greater than zero"})

    conn = connect_db()
    try:
        conn.execute(
            "INSERT INTO items(name, description, price) VALUES(?, ?, ?)",
            (name, description, price),
        )
        conn.commit()
        conn.close()
        return jsonify({"success": "Item Added"}), 201
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({"error": "Something went Wrong"})


@bp.route("/api/items/<int:item_id>", methods=["PUT"])
def update_item(item_id):
    update_request = request.json
    name = update_request.get("name")
    description = update_request.get("description")
    price = update_request.get("price")

    if not name:
        return jsonify({"error": "Name is required"})

    if not isinstance(price, (int, float)):
        return jsonify({"error": "Price must be a number"})

    if price <= 0:
        return jsonify({"error": "Price must be greater than zero"})

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
    return jsonify({"success": "Item Updated"})


@bp.route("/api/items/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM items where id = ?", (item_id,))
    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        return jsonify({"error": "Item not found"}), 404

    return jsonify({"success": "Item Deleted"})


# Bonus Tasks
@bp.route("/api/users", methods=["GET"])
def get_users():
    conn = connect_db()
    items = conn.execute("SELECT * FROM users").fetchall()
    conn.close()
    return jsonify([dict(item) for item in items])


@bp.route("/auth/register", methods=["POST"])
def register_user():
    new_user = request.json
    name = new_user.get("name")
    username = new_user.get("username")
    email = new_user.get("email")
    password = new_user.get("password")

    # Define regular expressions for email and password
    email_pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    password_pattern = r"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&.,]{8,}$"

    # Validate email pattern
    if not re.match(email_pattern, email):
        return jsonify({"error": "Invalid email format"}), 400

    # Validate password pattern
    if not re.match(password_pattern, password):
        return jsonify(
            {
                "error": "Password must be at least 8 characters long, include at least one letter and one number"
            }
        ), 400

    if not name or not username or not email or not password:
        return jsonify(
            {"error": "Name, username, email, and password are required"}
        ), 400

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    conn = connect_db()
    try:
        conn.execute(
            "INSERT INTO users(name, username, email, password) VALUES(?, ?, ?, ?)",
            (name, username, email, hashed_password.decode("utf-8")),
        )
        conn.commit()
        conn.close()
        return jsonify({"success": "User Successfully Registered"}), 201
    except sqlite3.IntegrityError as err:
        conn.close()
        if "UNIQUE constraint failed" in str(err):
            return jsonify({"error": "Username or email already exists"}), 409
        return jsonify({"error": "Something went wrong"}), 500


@bp.route("/auth/login", methods=["POST"])
def login_user():
    login_request = request.json
    email = login_request.get("email")
    password = login_request.get("password")

    if not email or not password:
        return jsonify({"error": "Email, and Password are required"}), 400

    conn = connect_db()
    try:
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, password, username, name FROM users WHERE email = ?", (email,)
        )
        user = cursor.fetchone()

        if user is None:
            return jsonify({"error": "Invalid email or password"}), 401

        user_id, stored_password_hash, user_username, user_name = user

        # Verify the provided password
        if not bcrypt.checkpw(
            password.encode("utf-8"), stored_password_hash.encode("utf-8")
        ):
            return jsonify({"error": "Invalid email or password"}), 401

        # Generate JWT token
        access_token = jwt.encode(
            {
                "userId": user_id,
                "username": user_username,
                "name": user_name,
                "email": email,
                "iat": int(time.time()),
                "exp": int(time.time()) + 3600,
            },
            JWT_SECRET_KEY,
            algorithm="HS256",
        )

        return jsonify({"access_token": access_token}), 200
    except sqlite3.Error as e:
        # Handle SQLite errors
        return jsonify({"error": f"Database error: {str(e)}"}), 500


@bp.route("/auth/decode-token", methods=["POST"])
def decode_token():
    data = request.get_json()
    print(data)

    if not data or "value" not in data:
        return jsonify({"error": "No token provided"}), 400

    token = data["value"]

    try:
        # Decode the JWT using the secret key
        decoded = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        return jsonify({"valid": True, "decoded-user": decoded})
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401
