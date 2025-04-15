from flask import Blueprint, jsonify, request
from app.models.challenge_model import get_all_challenges, get_challenge_by_id
from app.controllers.evaluation import evaluate_code

quests_bp = Blueprint('quests', __name__)

@quests_bp.route('/quests', methods=['GET'])
def get_quests():
    difficulty = request.args.get("difficulty")
    search = request.args.get("search", "").lower()
    challenges = get_all_challenges()

    if difficulty:
        challenges = [c for c in challenges if c.get("difficulty", "").lower() == difficulty.lower()]
    if search:
        challenges = [
            c for c in challenges
            if search in c.get("title", "").lower() or search in c.get("description", "").lower()
        ]

    return jsonify(challenges)


@quests_bp.route('/quest/<int:challenge_id>', methods=['GET'])
def get_single_quest(challenge_id):
    challenge = get_challenge_by_id(challenge_id)
    if challenge:
        return jsonify(challenge)
    return jsonify({"error": "Challenge not found"}), 404


@quests_bp.route('/submit', methods=['POST'])
def submit_code():
    data = request.json
    code = data.get("code")
    challenge_id = data.get("challenge_id")

    if not code or not challenge_id:
        return jsonify({"error": "Missing code or challenge_id"}), 400

    result = evaluate_code(code, challenge_id)
    return jsonify(result)



@quests_bp.route('/create', methods=['POST'])
def create_challenge():
    data = request.json

    # Get challenge data from the request body
    new_challenge = {
        "id": len(get_all_challenges()) + 1,  # Simple ID generation logic
        "title": data.get("title"),
        "difficulty": data.get("difficulty"),
        "description": data.get("description"),
        "function_name": data.get("function_name"),
        "test_cases": data.get("test_cases")
    }

    # Add new challenge to the JSON file
    challenges = get_all_challenges()
    challenges.append(new_challenge)

    # Save the updated challenges list back to the JSON file
    with open("app/data/challenges.json", "w") as f:
        json.dump(challenges, f, indent=4)

    return jsonify({"message": "Challenge created successfully"}), 201