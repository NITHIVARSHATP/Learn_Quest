import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    fetch(`http://localhost:5000/quest/${id}`)
      .then((res) => res.json())
      .then(setChallenge);
  }, [id]);

  const handleSubmit = async () => {
    setResult({ loading: true });
    try {
      const res = await submitSolution(code, parseInt(id));
      setResult(res);
    } catch (err) {
      setResult({ error: "Submission failed. Please try again." });
    }
  };

  if (!challenge) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-bgDark text-white p-6">
      <h1 className="text-2xl font-bold mb-4">{challenge.title}</h1>
      <p className="mb-4">{challenge.description}</p>

      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(code) => highlight(code, languages.python, "python")}
        padding={10}
        className="bg-black text-green-200 rounded-lg text-sm font-mono mb-4"
      />

      <button
        className="bg-primary hover:bg-accent transition px-4 py-2 rounded-md text-white font-semibold"
        onClick={handleSubmit}
      >
        Submit Code
      </button>

      <div className="mt-6">
        {result?.loading && <p>⏳ Evaluating your solution...</p>}
        {result?.error && <div className="text-red-500">{result.error}</div>}
        {result?.results && (
          <div className="space-y-2 mt-4">
            {result.results.map((r, i) => (
              <div
                key={i}
                className={`p-3 rounded-md ${
                  r.passed ? "bg-green-800" : "bg-red-800"
                }`}
              >
                <p>📥 <b>Input:</b> {JSON.stringify(r.input)}</p>
                <p>🎯 <b>Expected:</b> {JSON.stringify(r.expected)}</p>
                <p>🧪 <b>Got:</b> {JSON.stringify(r.got)}</p>
                <p>
                  {r.passed ? "✅ Passed" : r.error ? `❌ Error: ${r.error}` : "❌ Failed"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetails;
