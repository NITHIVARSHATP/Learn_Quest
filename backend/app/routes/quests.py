# app/routes/quests.py
from flask import Blueprint, jsonify, request
import json
import os

quests_bp = Blueprint('quests', __name__)

# Load challenge data from JSON
CHALLENGES_FILE = os.path.join(os.path.dirname(__file__), '../data/challenges.json')

def load_challenges():
    with open(CHALLENGES_FILE, 'r') as f:
        return json.load(f)

@quests_bp.route('/', methods=['GET'])
def get_all_challenges():
    challenges = load_challenges()
    return jsonify(challenges), 200

@quests_bp.route('/<int:challenge_id>', methods=['GET'])
def get_challenge_by_id(challenge_id):
    challenges = load_challenges()
    challenge = next((c for c in challenges if c['id'] == challenge_id), None)
    if challenge:
        return jsonify(challenge), 200
    return jsonify({'error': 'Challenge not found'}), 404
