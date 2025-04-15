
from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo

# Initialize the PyMongo object for MongoDB connection
mongo = PyMongo()

def create_app():
    app = Flask(__name__)

    # MongoDB URI (assuming MongoDB is running locally)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/challengeDB"  # Replace 'challengeDB' with your DB name

    # Initialize PyMongo with Flask
    mongo.init_app(app)

    # Basic config (extend later if needed)
    app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

    # Enable CORS for frontend-backend communication
    CORS(app)

    # Register blueprints
    from app.routes.quests import quests_bp
    app.register_blueprint(quests_bp)

    print("✅ Flask app initialized and blueprints registered.")

    return app
