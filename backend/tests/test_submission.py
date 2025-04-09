import unittest
from app.controllers.evaluation import evaluate_code

class TestEvaluation(unittest.TestCase):
    def test_reverse_string(self):
        code = """
def reverse_string(s):
    return s[::-1]
"""
        result = evaluate_code(code, 1)
        self.assertTrue(result["passed_all"])

if __name__ == '__main__':
    unittest.main()
