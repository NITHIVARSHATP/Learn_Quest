import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChallengeDetails, submitSolution } from "../services/challengeService";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java"; // Choose the appropriate mode for the code language you want to use
import "ace-builds/src-noconflict/theme-monokai"; // Choose the theme you want

const ChallengeDetails = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [evaluationResult, setEvaluationResult] = useState(null);

  useEffect(() => {
    const getChallenge = async () => {
      try {
        const challengeData = await fetchChallengeDetails(id);
        setChallenge(challengeData);
      } catch (error) {
        console.error("Error fetching challenge details:", error);
      }
    };
    getChallenge();
  }, [id]);

  const handleCodeSubmit = async () => {
    try {
      const result = await submitSolution(code, id);
      setEvaluationResult(result);
    } catch (error) {
      console.error("Error submitting code:", error);
    }
  };

  if (!challenge) {
    return <p>Loading challenge details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">{challenge.title}</h1>
      <p className="text-gray-400 mb-4">{challenge.description}</p>
      <div className="text-sm text-cyan-400 mb-6">
        <strong>Difficulty:</strong> {challenge.difficulty}
      </div>
      <h3 className="text-lg text-cyan-300 mb-4">Test Cases</h3>
      <ul>
        {challenge.test_cases.map((testCase, index) => (
          <li key={index}>
            <div>
              <strong>Input:</strong> {testCase.input}
            </div>
            <div>
              <strong>Output:</strong> {testCase.output}
            </div>
          </li>
        ))}
      </ul>

      {/* Code Editor */}
      <div className="mt-6">
        <AceEditor
          mode="java" // Set mode based on the language
          theme="monokai"
          value={code}
          onChange={(newCode) => setCode(newCode)}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="300px"
        />
      </div>

      {/* Submit Code Button */}
      <button
        className="mt-4 bg-cyan-400 text-white px-4 py-2 rounded"
        onClick={handleCodeSubmit}
      >
        Submit Code
      </button>

      {/* Display Evaluation Result */}
      {evaluationResult && (
        <div className="mt-6">
          <h4 className="text-cyan-300">Evaluation Result:</h4>
          <pre className="text-gray-400">{evaluationResult.output}</pre>
        </div>
      )}
    </div>
  );
};

export default ChallengeDetails;
