import requests
from pymongo import MongoClient

API_KEY = "FOoc9GYAN7h2dLRnrtPBlpnolOXbczQZ"
MONGO_URI = "mongodb+srv://cchandiok:Chahal310804@cluster-arta.omdjifg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-arta"

client = MongoClient(MONGO_URI)
db = client["arta"]
tickers_collection = db["tickers"]

url = "https://api.polygon.io/v3/reference/tickers"
params = {
    "market": "stocks",
    "active": "true",
    "order": "asc",
    "limit": 100,
    "sort": "ticker",
    "apiKey": API_KEY
}

response = requests.get(url, params=params)
data = response.json()

if "results" in data:
    tickers_collection.delete_many({})
    tickers_collection.insert_many(data["results"])
    print(f"✅ Inserted {len(data['results'])} tickers into MongoDB.")
else:
    print("❌ No data found or API failed.")
