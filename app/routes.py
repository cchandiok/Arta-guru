from flask import request
from flask import Blueprint

main = Blueprint('main', __name__)  # ✅ This is missing in your file


@main.route('/', methods=['GET', 'POST'])
def index():
    key = load_key()
    df_sp = pd.read_csv('sp500.csv')
    sectors = sorted(df_sp['Sector'].dropna().unique())

    selected_sector = request.form.get('sector', sectors[0])
    start_date = request.form.get('start_date')
    end_date = request.form.get('end_date')

    filtered_df = df_sp[df_sp['Sector'] == selected_sector]
    tickers = filtered_df['Symbol'].head(10).tolist()

    download_data(tickers, key)
    get_closing_prices()

    df = pd.read_csv('data_files/0-closes.csv', index_col='date')
    df.index = pd.to_datetime(df.index)

    if start_date and end_date:
        df = df.loc[start_date:end_date]

    returns = np.log(df / df.shift(1)).dropna()
    volatility = returns.std().sort_values(ascending=False).round(4)
    top5 = volatility.head(5).to_dict()

    return render_template('home.html',
                           top5=top5,
                           sectors=sectors,
                           selected_sector=selected_sector,
                           start_date=start_date,
                           end_date=end_date)
