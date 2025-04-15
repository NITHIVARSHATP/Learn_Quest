import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css";
import { submitSolution } from "../services/challengeService";

const ChallengeDetails = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:5000/quest/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setChallenge(data);
        setCode(`def ${data.function_name}(...):\n    # Write your code here`);
      });
  }, [id]);

  const handleSubmit = async () => {
    setResult({ loading: true });
    const res = await submitSolution(code, parseInt(id));
    setResult(res);

    // Scroll to results
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  if (!challenge) return <p className="text-white p-4">Loading challenge...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-cyan-400">{challenge.title}</h1>
      <p className="text-gray-300 mb-6">{challenge.description}</p>

      <div className="bg-gray-800 p-4 rounded-xl shadow-lg mb-4">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) => highlight(code, languages.python, "python")}
          padding={10}
          className="bg-black text-green-200 rounded-lg text-sm font-mono overflow-auto"
          style={{ minHeight: "280px" }}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-semibold text-white mb-6"
      >
        🧪 Submit Code
      </button>

      <div ref={resultRef}>
        {result?.loading && <p className="text-gray-400">⏳ Evaluating...</p>}
        {result?.error && <p className="text-red-500">{result.error}</p>}
        {result?.results && (
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-white mb-2">🧾 Results</h2>
            {result.results.map((r, i) => (
              <div
                key={i}
                className={`p-3 rounded-md ${
                  r.passed ? "bg-green-700" : "bg-red-700"
                }`}
              >
                <p>📥 <strong>Input:</strong> {JSON.stringify(r.input)}</p>
                <p>🎯 <strong>Expected:</strong> {JSON.stringify(r.expected)}</p>
                <p>🧪 <strong>Got:</strong> {JSON.stringify(r.got)}</p>
                <p>{r.passed ? "✅ Passed" : r.error ? `❌ Error: ${r.error}` : "❌ Failed"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetails;
