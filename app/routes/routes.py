from flask import Blueprint, request, jsonify
import os
import requests
from dotenv import load_dotenv

load_dotenv()

main = Blueprint("main", __name__)
POLYGON_KEY = os.getenv("POLYGON_API_KEY")

@main.route("/api/stock", methods=["GET"])
def get_stock_data():
    ticker = request.args.get("ticker", "").upper()
    if not ticker:
        return jsonify({"error": "Ticker symbol is required"}), 400

    url = f"https://api.polygon.io/v3/reference/tickers/{ticker}?apiKey={POLYGON_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json().get("results", {})
        return jsonify({
            "ticker": data.get("ticker"),
            "name": data.get("name"),
            "market": data.get("market"),
            "locale": data.get("locale"),
            "primary_exchange": data.get("primary_exchange"),
            "updated": data.get("updated")
        })
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500
