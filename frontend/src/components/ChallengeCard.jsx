 
import { motion } from "framer-motion";

const ChallengeCard = ({ challenge, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="bg-card text-white p-4 rounded-xl shadow-lg cursor-pointer border-l-4 border-primary hover:border-accent transition"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold mb-1">{challenge.title}</h2>
      <p className="text-sm text-gray-300 mb-2">{challenge.description}</p>
      <span className={`text-xs px-2 py-1 rounded-full bg-primary text-white`}>
        {challenge.difficulty}
      </span>
    </motion.div>
  );
};

export default ChallengeCard;
