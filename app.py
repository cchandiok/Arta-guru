from app import create_app

app = create_app()  # this line ensures `app` is visible to Gunicorn

if __name__ == '__main__':
    app.run(debug=True)
