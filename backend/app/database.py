import sqlite3


def init_db():
    with open("schema.sql", "r") as f:
        schema = f.read()
    db = sqlite3.connect("db_items.db")
    db.executescript(schema)
    db.close()


def connect_db():
    conn = sqlite3.connect("db_items.db")
    conn.row_factory = sqlite3.Row
    return conn


if __name__ == "__main__":
    init_db()
