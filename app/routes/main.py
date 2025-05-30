from flask import Blueprint, render_template, request, jsonify
import requests
from dotenv import load_dotenv
import os
from app.utils.auth_utils import token_required

main = Blueprint("main", __name__)
load_dotenv()
POLYGON_KEY = os.getenv("POLYGON_API_KEY")


# === Home Page ===
@main.route("/", methods=["GET"])
#@token_required
def home():
    return render_template("index.html")

# === Get Stock Info (AJAX Fetch) ===
@main.route("/api/stock", methods=["GET"])
#@token_required
def get_stock_data():
    ticker = request.args.get("ticker", "").upper()
    if not ticker:
        return jsonify({"error": "Ticker is required"}), 400

    url = f"https://api.polygon.io/v3/reference/tickers/{ticker}"
    params = {
        "apiKey": POLYGON_KEY
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json().get("results", {})

        if not data:
            return jsonify({"error": "No data found for ticker"}), 404

        return jsonify({
            "ticker": data.get("ticker"),
            "name": data.get("name"),
            "market": data.get("market"),
            "locale": data.get("locale"),
            "primary_exchange": data.get("primary_exchange"),
            "updated": data.get("updated")
        })

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Request failed: {str(e)}"}), 500
    
@main.route("/login", methods=["GET"])
def login_page():
    return render_template("login.html")

