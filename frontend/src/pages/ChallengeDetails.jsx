import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChallengeDetails } from "../services/challengeService"; // Make sure this function is correctly implemented

const ChallengeDetails = () => {
  const { id } = useParams(); // Extract challenge ID from the URL
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    const getChallenge = async () => {
      try {
        // Fetch the challenge details based on the ID
        const challengeData = await fetchChallengeDetails(id);
        setChallenge(challengeData);
      } catch (error) {
        console.error("Error fetching challenge details:", error);
      }
      
    };
    getChallenge();
  }, [id]); // Fetch when the ID changes

  if (!challenge) {
    return <p>Loading challenge details...</p>; // Show loading message if the data is not yet loaded
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">{challenge.title}</h1>
      <p className="text-gray-400 mb-4">{challenge.description}</p>
      <div className="text-sm text-cyan-400 mb-6">
        <strong>Difficulty:</strong> {challenge.difficulty}
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default ChallengeDetails;
