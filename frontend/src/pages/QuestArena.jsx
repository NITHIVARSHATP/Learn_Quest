 
import { useEffect, useState } from "react";
import { fetchChallenges } from "../services/challengeService";

function QuestArena() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetchChallenges().then(setChallenges);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Challenges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((ch) => (
          <div key={ch.id} className="border rounded-lg p-4 shadow hover:shadow-lg">
            <h2 className="text-lg font-semibold">{ch.title}</h2>
            <p className="text-sm text-gray-600">{ch.description}</p>
            <p className="text-xs mt-2">Difficulty: {ch.difficulty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestArena;
