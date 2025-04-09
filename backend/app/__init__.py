# app/__init__.py
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register routes
    from .routes.quests import quests_bp
    app.register_blueprint(quests_bp, url_prefix='/quests')

    return app
