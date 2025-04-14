// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-6 py-20">
      <h1 className="text-5xl font-bold mb-6 text-cyan-400">Welcome to LearnQuest ⚔️</h1>
      <p className="text-lg mb-8 text-gray-300 max-w-2xl text-center">
        Embark on a journey to master coding challenges! Solve quests of varying difficulties, improve your skills, and rise up the leaderboard.
      </p>
      <div className="flex gap-4">
        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold"
          onClick={() => navigate("/arena")}
        >
          Enter the Arena
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold"
          onClick={() => navigate("/create")}
        >
          Forge a Quest
        </button>
      </div>
    </div>
  );
};

export default Home;
