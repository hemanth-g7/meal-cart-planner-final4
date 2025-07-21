import sqlite3
import json

def get_db_connection():
    conn = sqlite3.connect('grocery.db')
    conn.row_factory = sqlite3.Row
    return conn

# Save grocery list (store as JSON string)
def save_grocery_list(user_id: int, grocery_list: list[str]):
    conn = get_db_connection()
    conn.execute(
        "INSERT INTO grocery_lists (user_id, list) VALUES (?, ?)",
        (user_id, json.dumps(grocery_list))  # Save as JSON string
    )
    conn.commit()
    conn.close()

# Get all saved lists for a user, return string[][]
def get_grocery_lists(user_id: int):
    conn = get_db_connection()
    cursor = conn.execute(
        "SELECT list FROM grocery_lists WHERE user_id = ?", (user_id,)
    )
    raw_lists = cursor.fetchall()
    conn.close()

    formatted_lists = []
    for row in raw_lists:
        try:
            parsed = json.loads(row["list"])  # Parse JSON string back to Python list
            if isinstance(parsed, list):
                formatted_lists.append(parsed)
        except Exception:
            continue  # Skip malformed rows

    return formatted_lists
