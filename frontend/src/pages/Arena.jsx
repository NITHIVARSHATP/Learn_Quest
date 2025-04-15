// frontend/src/pages/Arena.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChallengeCard from "../components/ChallengeCard";
import { fetchChallenges } from "../services/challengeService";

const Arena = () => {
  const [challenges, setChallenges] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchChallenges(difficulty, search).then(setChallenges);
  }, [difficulty, search]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">🧠 Arena of Quests</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search challenges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-lg text-black flex-1"
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 rounded-lg text-black"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {challenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onClick={() => navigate(`/quest/${challenge.id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No challenges found.</p>
      )}
    </div>
  );
};

export default Arena;
