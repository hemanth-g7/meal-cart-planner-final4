from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
import json
from grocery import save_grocery_list, get_grocery_lists
import hashlib

app = Flask(__name__)
CORS(app)

# Reusable DB connection
def get_db_connection():
    conn = sqlite3.connect('grocery.db')
    conn.row_factory = sqlite3.Row
    return conn

# 🔐 Register route
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    password = generate_password_hash(data['password'])

    conn = get_db_connection()
    try:
        conn.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        return jsonify({'message': 'User registered successfully'})
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Username already exists'}), 400
    finally:
        conn.close()

# 🔐 Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
    conn.close()

    if user and check_password_hash(user['password'], data['password']):
        return jsonify({'message': 'Login successful', 'user_id': user['id']})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

from flask import Flask, request, jsonify
import sqlite3
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ Save grocery list
@app.route('/save-grocery', methods=['POST'])
def save_grocery():
    data = request.get_json()
    user_id = data.get("user_id")
    grocery_list = data.get("grocery_list")  # Expecting array of { name, quantity }

    if not user_id or not grocery_list:
        return jsonify({"message": "Missing user_id or grocery list"}), 400

    try:
        save_grocery_list(user_id, grocery_list)
        return jsonify({"message": "Saved successfully!"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

# ✅ Test connection
@app.route("/test_connection")
def test_connection():
    return "Connected Successfully"

# ✅ Fetch grocery list
@app.route('/get_lists/<int:user_id>', methods=['GET'])
def get_lists(user_id):
    try:
        return jsonify(get_grocery_lists(user_id))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ Fetch all saved lists for user
@app.route('/get_grocery_lists', methods=['GET'])
def get_all_grocery_lists():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    conn = get_db_connection()
    c = conn.cursor()
    c.execute('SELECT id, list FROM grocery_lists WHERE user_id = ?', (user_id,))
    lists = c.fetchall()
    conn.close()

    result = [{'id': row[0], 'list': json.loads(row[1])} for row in lists]
    return jsonify(result)

# ✅ Delete grocery list
@app.route('/delete_grocery_list', methods=['DELETE'])
def delete_grocery_list():
    data = request.get_json()
    user_id = data.get('user_id')
    list_id = data.get('list_id')
    if not user_id or not list_id:
        return jsonify({'error': 'user_id and list_id are required'}), 400
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('DELETE FROM grocery_lists WHERE id = ? AND user_id = ?', (list_id, user_id))
    conn.commit()
    deleted = c.rowcount
    conn.close()
    if deleted:
        return jsonify({'message': 'List deleted successfully'})
    else:
        return jsonify({'error': 'List not found or not owned by user'}), 404

# ✅ Update grocery list
@app.route('/update_grocery_list', methods=['PUT'])
def update_grocery_list():
    data = request.get_json()
    user_id = data.get('user_id')
    list_id = data.get('list_id')
    grocery_list = data.get('grocery_list')
    if not user_id or not list_id or grocery_list is None:
        return jsonify({'error': 'user_id, list_id, and grocery_list are required'}), 400
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('UPDATE grocery_lists SET list = ? WHERE id = ? AND user_id = ?', (json.dumps(grocery_list), list_id, user_id))
    conn.commit()
    updated = c.rowcount
    conn.close()
    if updated:
        return jsonify({'message': 'List updated successfully'})
    else:
        return jsonify({'error': 'List not found or not owned by user'}), 404

# ✅ Change password
@app.route('/change_password', methods=['POST'])
def change_password():
    data = request.get_json()
    user_id = data.get('user_id')
    old_password = data.get('old_password')
    new_password = data.get('new_password')
    if not user_id or not old_password or not new_password:
        return jsonify({'error': 'user_id, old_password, and new_password are required'}), 400
    conn = get_db_connection()
    c = conn.cursor()
    user = c.execute('SELECT password FROM users WHERE id = ?', (user_id,)).fetchone()
    if not user or not check_password_hash(user['password'], old_password):
        conn.close()
        return jsonify({'error': 'Old password is incorrect'}), 400
    new_hash = generate_password_hash(new_password)
    c.execute('UPDATE users SET password = ? WHERE id = ?', (new_hash, user_id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Password changed successfully'})

# ✅ Update profile
@app.route('/update_profile', methods=['POST'])
def update_profile():
    data = request.get_json()
    user_id = data.get('user_id')
    username = data.get('username')
    family_size = data.get('family_size')
    if not user_id or not username or not family_size:
        return jsonify({'error': 'user_id, username, and family_size are required'}), 400
    conn = get_db_connection()
    c = conn.cursor()
    # Check if username is taken by another user
    existing = c.execute('SELECT id FROM users WHERE username = ? AND id != ?', (username, user_id)).fetchone()
    if existing:
        conn.close()
        return jsonify({'error': 'Username already taken'}), 400
    # Update username (family_size is not in users table, but you may want to add it)
    c.execute('UPDATE users SET username = ? WHERE id = ?', (username, user_id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Profile updated successfully'})

# ✅ Root
@app.route("/")
def index():
    return jsonify({"message": "✅ Backend is working!"})

if __name__ == "__main__":
    app.run(debug=True)
