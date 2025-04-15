import subprocess
import json

def evaluate_code(code, challenge_id):
    # You can save the code to a file and run it with the respective compiler/interpreter.
    # For this example, we're assuming a Java-based challenge.

    # Save the submitted code to a file (you can change this to handle different languages)
    with open("temp_solution.java", "w") as f:
        f.write(code)

    # Compile the code (for Java)
    compile_process = subprocess.Popen(["javac", "temp_solution.java"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    compile_stdout, compile_stderr = compile_process.communicate()

    if compile_process.returncode != 0:
        return {"output": f"Compilation Error:\n{compile_stderr.decode()}"}

    # If compilation is successful, run the code with test cases
    run_process = subprocess.Popen(
        ["java", "temp_solution"], stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    run_stdout, run_stderr = run_process.communicate()

    if run_process.returncode != 0:
        return {"output": f"Runtime Error:\n{run_stderr.decode()}"}

    # Evaluate the output against the test cases
    expected_output = "expected output for the test case"  # You can load this from the challenge model/test cases
    if run_stdout.decode().strip() == expected_output:
        return {"output": "Code passed the test case!"}
    else:
        return {"output": f"Code failed the test case. Expected {expected_output}, got {run_stdout.decode().strip()}"}
