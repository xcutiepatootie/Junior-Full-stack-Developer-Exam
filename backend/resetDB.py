import os

# Define the path to your SQLite database file
DATABASE_PATH = "db_items.db"


def reset_database():
    if os.path.exists(DATABASE_PATH):
        os.remove(DATABASE_PATH)
        print(f"{DATABASE_PATH} has been deleted.")
    else:
        print(f"{DATABASE_PATH} does not exist.")

    # Optionally, you can recreate the database here by running initialization code or migrations.
    # For example:
    # import your_database_setup_module
    # your_database_setup_module.initialize_database()

    print("Database reset complete.")


if __name__ == "__main__":
    reset_database()
