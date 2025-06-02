from flask import Blueprint, request, jsonify, render_template
import datetime
import jwt
import os
from app.utils.auth_utils import token_required

auth = Blueprint("auth", __name__)

# Mock user data (in production, use a database)
users = {
    "admin": "password123",
    "user1": "secretpass",
    "chahal": "secret123"
}


@auth.route("/login", methods=["GET"])
def login_page():
    return render_template("login.html")


@auth.route("/api/login", methods=["POST"])
def login():
    auth_data = request.get_json()
    username = auth_data.get("username")
    password = auth_data.get("password")

    if username and password:  # accept anything for now
        token = jwt.encode({
            'user': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=12)
        }, os.getenv("SECRET_KEY", "mysecret"), algorithm="HS256")

        return jsonify({"token": token})
    
    return jsonify({"message": "Invalid credentials"}), 401
