import json

def load_challenges():
    with open("app/data/challenges.json") as f:
        return json.load(f)

def get_all_challenges():
    return load_challenges()

def get_challenge_by_id(challenge_id):
    challenges = load_challenges()
    for challenge in challenges:
        if challenge["id"] == challenge_id:
            return challenge
    return None