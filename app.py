from flask import Flask, render_template
import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from eod import EodHistoricalData
import datetime as dt

# === Global setup ===
DEFAULT_DATE = dt.date.today() - dt.timedelta(396)
TODAY = dt.date.today()
app = Flask("Arta.Guru Backend CC")

# === Load API Key ===
def load_key(filename='api_token.txt'):
    return open(filename).read().strip()

# === Get tickers from S&P 500 CSV ===
def get_sp_tickers():
    df = pd.read_csv('sp500.csv')
    return df['Symbol'].head(10).tolist()

# === Download historical stock data ===
def download_data(tickers, key, folder='data_files', date=DEFAULT_DATE):
    if not os.path.exists(folder):
        os.makedirs(folder)
    client = EodHistoricalData(key)
    for ticker in tickers:
        try:
            print(f"Downloading {ticker}...")
            df = pd.DataFrame(client.get_prices_eod(ticker, from_=date))
            df.index = pd.DatetimeIndex(df['date'])
            df.drop(columns=['date'], inplace=True)
            df.to_csv(f"{folder}/{ticker}.csv")
        except Exception as e:
            print(f"{ticker} failed: {e}")

# === Combine closing prices ===
def get_closing_prices(folder='data_files'):
    files = [f for f in os.listdir(folder) if f.endswith('.csv')]
    closes = pd.DataFrame()
    for file in files:
        symbol = file.replace('.csv', '')
        df = pd.read_csv(f"{folder}/{file}", index_col='date')
        closes[symbol] = df['close']
    closes.to_csv(f"{folder}/0-closes.csv")
    return closes

# === Plot volatility and save to static folder ===
def plot_volatility(file='data_files/0-closes.csv'):
    df = pd.read_csv(file, index_col='date')
    log_returns = np.log(df / df.shift(1)).dropna()
    volatility = log_returns.std().sort_values(ascending=False)

    plt.figure(figsize=(10, 5))
    bars = plt.bar(volatility.index, volatility.values, color='skyblue')
    bars[0].set_color('red')     # Most volatile
    bars[-1].set_color('green')  # Least volatile
    plt.title('Stock Mood Swings (Volatility)')
    plt.xticks(rotation=45)
    plt.tight_layout()

    os.makedirs("static", exist_ok=True)
    plt.savefig('static/volatility.png')
    plt.close()

# === Homepage route ===
@app.route('/')
def index():
    key = load_key()
    tickers = get_sp_tickers()
    download_data(tickers, key)
    get_closing_prices()
    plot_volatility()
    return render_template('index.html', image='static/volatility.png')

# === Run ===
if __name__ == '__main__':
    app.run(debug=True)
