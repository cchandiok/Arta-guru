import jwt
from functools import wraps
from flask import request, jsonify
import os

SECRET_KEY = os.getenv("SECRET_KEY", "mysecret")


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if not token:
            return jsonify({"message": "Token is missing"}), 401
        try:
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token expired"}), 403
        except jwt.InvalidTokenError as e:
            return jsonify({"message": f"Invalid token: {e}"}), 403
        return f(*args, **kwargs)
    return decorated