# FULL RESTART: Minimal Flask App with Volatility Dashboard

from flask import Flask, render_template, request, Blueprint
import os
import pandas as pd
import numpy as np
import datetime as dt
from eodhd import EodHistoricalData

main = Blueprint('main', __name__)  #✅ # THIS is what you were missing


app = Flask(__name__)

DEFAULT_DATE = dt.date.today() - dt.timedelta(396)

# === Utility Functions ===
def load_key():
    return open('api_token.txt').read().strip()

def get_sector_tickers(sector):
    df = pd.read_csv('sp500.csv')
    df_sector = df[df['Sector'] == sector]
    return df_sector['Symbol'].head(10).tolist(), sorted(df['Sector'].unique())

def download_data(tickers, key, folder='data_files'):
    if not os.path.exists(folder):
        os.makedirs(folder)
    client = EodHistoricalData(key)
    for ticker in tickers:
        try:
            df = pd.DataFrame(client.get_prices_eod(ticker, from_=DEFAULT_DATE))
            df.index = pd.DatetimeIndex(df['date'])
            df.drop(columns=['date'], inplace=True)
            df.to_csv(f"{folder}/{ticker}.csv")
        except Exception as e:
            print(f"Failed to download {ticker}: {e}")

def get_closing_prices(folder='data_files'):
    files = [f for f in os.listdir(folder) if f.endswith('.csv')]
    closes = pd.DataFrame()
    for file in files:
        symbol = file.replace('.csv', '')
        df = pd.read_csv(f"{folder}/{file}", index_col='date')
        if 'close' in df.columns:
            closes[symbol] = df['close']
        elif 'adjusted_close' in df.columns:
            closes[symbol] = df['adjusted_close']
    closes.to_csv(f"{folder}/0-closes.csv")
    return closes

# === Routes ===
@app.route('/', methods=['GET', 'POST'])
def index():
    key = load_key()
    sector = request.form.get('sector', 'Technology')
    start_date = request.form.get('start_date', '')
    end_date = request.form.get('end_date', '')

    tickers, all_sectors = get_sector_tickers(sector)
    download_data(tickers, key)
    df = get_closing_prices()
    df.index = pd.to_datetime(df.index)

    if start_date and end_date:
        df = df.loc[start_date:end_date]

    returns = np.log(df / df.shift(1)).dropna()
    volatility = returns.std().sort_values(ascending=False).round(4)
    top5 = volatility.head(5).to_dict()

    return render_template('index.html', top5=top5, sectors=all_sectors, selected_sector=sector, start_date=start_date, end_date=end_date)

# === Run ===
if __name__ == '__main__':
    app.run(debug=True)
