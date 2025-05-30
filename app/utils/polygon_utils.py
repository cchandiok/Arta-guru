import requests
import os
import datetime as dt
import pandas as pd

def load_key():
    return os.getenv("POLYGON_API_KEY", open("api_token.txt").read().strip())

DEFAULT_DATE = (dt.date.today() - dt.timedelta(days=396)).isoformat()
TODAY = dt.date.today().isoformat()

def get_live_sector_tickers(sector=None, limit=50):
    url = "https://api.polygon.io/v3/reference/tickers"
    params = {
        "market": "stocks",
        "active": "true",
        "order": "asc",
        "limit": limit,
        "sort": "ticker",
        "apiKey": load_key()
    }
    try:
        r = requests.get(url, params=params)
        r.raise_for_status()
        data = r.json().get("results", [])
        if sector:
            data = [d for d in data if sector.lower() in (d.get("sic_description") or "").lower()]
        symbols = [item["ticker"] for item in data]
        sectors = sorted(set(d.get("sic_description", "Unknown") for d in data))
        return symbols[:10], sectors
    except Exception as e:
        print(f"❌ Error fetching tickers: {e}")
        return [], []

def download_polygon_data(tickers, folder="data_files"):
    if not os.path.exists(folder):
        os.makedirs(folder)
    for ticker in tickers:
        url = f"https://api.polygon.io/v2/aggs/ticker/{ticker}/range/1/day/{DEFAULT_DATE}/{TODAY}"
        params = {
            "adjusted": "true",
            "sort": "asc",
            "limit": "5000",
            "apiKey": load_key()
        }
        try:
            r = requests.get(url, params=params)
            r.raise_for_status()
            results = r.json().get("results", [])
            if results:
                df = pd.DataFrame(results)
                df["date"] = pd.to_datetime(df["t"], unit="ms")
                df.rename(columns={"c": "close"}, inplace=True)
                df = df[["date", "close"]]
                df.set_index("date", inplace=True)
                df.to_csv(f"{folder}/{ticker}.csv")
                print(f"✅ Saved {ticker}")
        except Exception as e:
            print(f"❌ Failed for {ticker}: {e}")