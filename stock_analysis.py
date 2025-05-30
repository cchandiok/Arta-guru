import os
import pandas as pd
import numpy as np
import datetime as dt
import requests

DEFAULT_DATE = dt.date.today() - dt.timedelta(396)
API_KEY = open("api_token.txt").read().strip()
TICKERS = ["AAPL", "GOOG", "MSFT", "META", "TSLA"]
DATA_FOLDER = "data_files"

def fetch_data(ticker, key, folder):
    if not os.path.exists(folder):
        os.makedirs(folder)

    url = f"https://eodhd.com/api/eod/{ticker}.US"
    params = {
        'api_token': key,
        'from': DEFAULT_DATE.isoformat(),
        'fmt': 'json'
    }

    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            df = pd.DataFrame(response.json())
            df.index = pd.DatetimeIndex(df['date'])
            df.drop(columns=['date'], inplace=True)
            df.to_csv(f"{folder}/{ticker}.csv")
            print(f"✅ Downloaded {ticker}")
        else:
            print(f"❌ Failed to fetch {ticker} - {response.status_code}")
    except Exception as e:
        print(f"Error downloading {ticker}: {e}")

def build_closing_price_matrix(folder, tickers):
    closes = pd.DataFrame()
    for ticker in tickers:
        file_path = os.path.join(folder, f"{ticker}.csv")
        if os.path.exists(file_path):
            df = pd.read_csv(file_path, index_col='date')
            if 'close' in df.columns:
                closes[ticker] = df['close']
    return closes

def main():
    for ticker in TICKERS:
        fetch_data(ticker, API_KEY, DATA_FOLDER)

    df = build_closing_price_matrix(DATA_FOLDER, TICKERS)
    df.index = pd.to_datetime(df.index)

    returns = np.log(df / df.shift(1)).dropna()
    volatility = returns.std().sort_values(ascending=False)
    print("\n📊 Top 5 Most Volatile Stocks:")
    print(volatility.head(5).round(4))

if __name__ == "__main__":
    main()
