from flask import Blueprint, jsonify, request
from app.models.challenge_model import get_all_challenges, get_challenge_by_id
from app.controllers.evaluation import evaluate_code

quests_bp = Blueprint('quests', __name__)

@quests_bp.route('/quests', methods=['GET'])
def get_quests():
    return jsonify(get_all_challenges())

@quests_bp.route('/quest/<int:challenge_id>', methods=['GET'])
def get_quest(challenge_id):
    challenge = get_challenge_by_id(challenge_id)
    if challenge:
        return jsonify(challenge)
    return jsonify({"error": "Challenge not found"}), 404

@quests_bp.route('/submit', methods=['POST'])
def submit():
    data = request.json
    code = data.get("code")
    challenge_id = data.get("challenge_id")
    return jsonify(evaluate_code(code, challenge_id))