from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Basic config (extend later if needed)
    app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

    # Enable CORS for frontend-backend communication
    CORS(app)

    # Register blueprints
    from app.routes.quests import quests_bp
    app.register_blueprint(quests_bp)

    # If more blueprints are added later, you can register them here
    # from app.routes.users import users_bp
    # app.register_blueprint(users_bp)

    print("✅ Flask app initialized and blueprints registered.")

    return app
