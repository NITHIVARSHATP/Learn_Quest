// src/components/ChallengeCard.jsx
import React from "react";

const ChallengeCard = ({ challenge, onClick }) => {
  return (
    <div
      className="p-4 bg-gray-800 rounded-lg shadow-md cursor-pointer"
      onClick={onClick} // This will handle the click and navigate
    >
      <h3 className="text-xl font-bold text-cyan-400">{challenge.title}</h3>
      <p className="text-gray-400">{challenge.description}</p>
    </div>
  );
};

export default ChallengeCard;
