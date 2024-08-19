CREATE TABLE IF NOT EXISTS items(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT CHECK (length(description) <= 255),
    price REAL CHECK (price > 0)
)