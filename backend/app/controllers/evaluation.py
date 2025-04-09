import io
import contextlib
from app.models.challenge_model import get_challenge_by_id

def evaluate_code(code, challenge_id):
    challenge = get_challenge_by_id(challenge_id)
    if not challenge:
        return {"error": "Challenge not found"}

    function_name = challenge["function_name"]
    test_cases = challenge["test_cases"]
    results = []

    try:
        local_vars = {}
        exec(code, {}, local_vars)
        func = local_vars.get(function_name)

        if not func:
            return {"error": f"Function '{function_name}' not defined."}

        for case in test_cases:
            try:
                result = func(case["input"])
                passed = result == case["output"]
                results.append({
                    "input": case["input"],
                    "expected": case["output"],
                    "got": result,
                    "passed": passed
                })
            except Exception as e:
                results.append({"error": str(e), "input": case["input"]})

        passed_all = all(r.get("passed") for r in results if "passed" in r)
        return {"results": results, "passed_all": passed_all}

    except Exception as e:
        return {"error": str(e)}