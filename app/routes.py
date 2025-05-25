from flask import render_template
from app import app
import os
print("TEMPLATES DIR CONTENT:", os.listdir("templates"))


@app.route("/")
def home():
    return render_template("home.html")
