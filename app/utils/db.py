# app/utils/db.py
from pymongo import MongoClient
import os

# Connect to the MongoDB Atlas database
MONGO_URI = "mongodb+srv://app_service:008rVThcsjmQjjFW@aws-mumbai.1hs8j.mongodb.net/arta_dev?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["arta_dev"]  # This is the database your boss specified
