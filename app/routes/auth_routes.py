from flask import Blueprint, request, jsonify, render_template
from passlib.hash import scrypt  # ✅ Use scrypt for verification
import jwt
import datetime
import os
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash


auth = Blueprint("auth", __name__)

# MongoDB Atlas connection
MONGO_URI = "mongodb+srv://app_service:008rVThcsjmQjjFW@aws-mumbai.1hs8j.mongodb.net/arta_dev?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client["arta_dev"]
users_collection = db["users"]

SECRET_KEY = os.getenv("SECRET_KEY", "mysecret")

@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if users_collection.find_one({"username": data["username"]}):
        return jsonify({"message": "User already exists"}), 409

    hashed_pw = scrypt.hash(data["password"])  # ✅ Hash with scrypt
    users_collection.insert_one({
        "username": data["username"],
        "password": hashed_pw
    })
    return jsonify({"message": "User registered successfully"}), 201

@auth.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")

    try:
        data = request.get_json()
        if not data or "username" not in data or "password" not in data:
            return jsonify({"message": "Missing credentials"}), 400

        user = users_collection.find_one({"username": data["username"]})
        if not user or not check_password_hash(user["password"], data["password"]):
            return jsonify({"message": "Invalid credentials"}), 401

        token = jwt.encode({
            "username": data["username"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, SECRET_KEY, algorithm="HS256")

        return jsonify({"token": token})

    except Exception as e:
        return jsonify({"message": "Server error", "error": str(e)}), 500

