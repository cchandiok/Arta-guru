from flask import Flask
from flask_cors import CORS  # ✅ Import CORS
from app.routes.auth_routes import auth
from app.routes.main import main

def create_app():
    app = Flask(__name__)

    # ✅ Allow CORS for Vercel frontend and localhost for dev
    CORS(app, origins=[
        "http://localhost:8080", 
        "https://arta-guru.vercel.app"
    ], supports_credentials=True)

    app.register_blueprint(auth)
    app.register_blueprint(main)

    return app
