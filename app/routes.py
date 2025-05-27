from flask import Blueprint, render_template, request
import pandas as pd
import numpy as np
import os
import datetime as dt
import requests
import glob

main = Blueprint("main", __name__)

DEFAULT_DATE = dt.date.today() - dt.timedelta(days=396)

def load_key():
    return open("api_token.txt").read().strip()

def get_sector_tickers(sector):
    df = pd.read_csv("sp500.csv")
    df_sector = df[df["Sector"] == sector]
    return df_sector["Symbol"].head(10).tolist(), sorted(df["Sector"].unique())

def download_data(tickers, key, folder="data_files"):
    if not os.path.exists(folder):
        os.makedirs(folder)
    for ticker in tickers:
        url = f"https://eodhd.com/api/eod/{ticker}.US"
        params = {"api_token": key, "from": DEFAULT_DATE.isoformat(), "fmt": "json"}
        try:
            r = requests.get(url, params=params)
            if r.status_code == 200:
                df = pd.DataFrame(r.json())
                if not df.empty:
                    df.index = pd.DatetimeIndex(df["date"])
                    df.drop(columns=["date"], inplace=True)
                    df.to_csv(f"{folder}/{ticker}.csv")
                    print(f"✅ Downloaded {ticker}")
                else:
                    print(f"⚠️ Empty data for {ticker}")
            else:
                print(f"❌ Failed to fetch {ticker}: {r.status_code}")
        except Exception as e:
            print(f"Error downloading {ticker}: {e}")

def get_closing_prices(folder="data_files"):
    closes = pd.DataFrame()
    for file in os.listdir(folder):
        if file.endswith(".csv"):
            symbol = file.replace(".csv", "")
            df = pd.read_csv(os.path.join(folder, file), index_col="date")
            closes[symbol] = df.get("close", df.get("adjusted_close"))
    return closes

@main.route("/", methods=["GET", "POST"])
def index():
    key = load_key()
    sector = request.form.get("sector", "Technology")
    start = request.form.get("start_date", "")
    end = request.form.get("end_date", "")
    
    # 💣 Clean old downloaded files
    for f in glob.glob("data_files/*.csv"):
        os.remove(f)

    tickers, sectors = get_sector_tickers(sector)
    download_data(tickers, key)
    df = get_closing_prices()
    df.index = pd.to_datetime(df.index)

    if start and end:
        df = df.loc[start:end]

    # 💥 Prevent math errors
    df = df.astype(float)

    returns = np.log(df / df.shift(1)).dropna()
    volatility = returns.std().sort_values(ascending=False).round(4)
    top5 = volatility.head(5).to_dict()

    return render_template("index.html",
        top5=top5,
        sectors=sectors,
        selected_sector=sector,
        start_date=start,
        end_date=end
    )
@main.route("/pfizer")
def pfizer():
    key = load_key()
    folder = "data_files"
    ticker = "PFE"
    filepath = f"{folder}/{ticker}.csv"

    # 📥 Download if not already there
    if not os.path.exists(filepath):
        url = f"https://eodhd.com/api/eod/{ticker}.US"
        params = {
            "api_token": key,
            "from": DEFAULT_DATE.isoformat(),
            "fmt": "json"
        }
        r = requests.get(url, params=params)
        if r.status_code == 200:
            df = pd.DataFrame(r.json())
            if not df.empty:
                df.index = pd.DatetimeIndex(df["date"])
                df.drop(columns=["date"], inplace=True)
                df.to_csv(filepath)
            else:
                return f"⚠️ No data available for {ticker}"
        else:
            return f"❌ Failed to download PFE: {r.status_code}"

    # 📊 Load data
    df = pd.read_csv(filepath)
    df["date"] = pd.to_datetime(df["date"])
    df.set_index("date", inplace=True)

    df["log_return"] = np.log(df["close"] / df["close"].shift(1))
    df["volatility"] = df["log_return"].rolling(window=21).std() * np.sqrt(252)
    df = df.dropna()

    chart_data = {
        "dates": df.index.strftime("%Y-%m-%d").tolist(),
        "prices": df["close"].tolist(),
        "volatility": df["volatility"].tolist()
    }

    return render_template("pfizer.html", data=chart_data)




