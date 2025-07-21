import sqlite3
import json

# Connect to the SQLite database (creates if not exists)
conn = sqlite3.connect('grocery.db')
c = conn.cursor()

# Create users table
c.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
''')

# Create grocery_lists table
c.execute('''
CREATE TABLE IF NOT EXISTS grocery_lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    list TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
''')

# Create user_ingredients table
c.execute('''
CREATE TABLE IF NOT EXISTS user_ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    ingredients TEXT NOT NULL
);
''')    

# Commit and close
conn.commit()
conn.close()
