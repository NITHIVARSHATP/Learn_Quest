import React, { useState } from "react";
import { submitSolution } from "../services/challengeService";

const CodeEditor = ({ challenge }) => {
  const [code, setCode] = useState("");
  const [results, setResults] = useState(null);

  const handleSubmit = async () => {
    const response = await submitSolution(code, challenge.id);
    setResults(response);
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold">{challenge.title}</h2>
      <p className="text-sm text-gray-400 mb-2">{challenge.description}</p>

      <textarea
        className="w-full h-56 p-4 bg-black rounded-lg text-green-400 font-mono resize-none"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your function here..."
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white font-semibold"
      >
        Submit Code
      </button>

      {results && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Results:</h3>
          {results.results?.map((res, idx) => (
            <div key={idx} className="text-sm mt-1">
              ✅ Input: {JSON.stringify(res.input)} | Got: {JSON.stringify(res.got)} | Expected:{" "}
              {JSON.stringify(res.expected)} —{" "}
              <span className={res.passed ? "text-green-400" : "text-red-400"}>
                {res.passed ? "Passed" : "Failed"}
              </span>
            </div>
          ))}
          {results.error && <div className="text-red-500">{results.error}</div>}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
 
