import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#334155] via-[#475569] to-[#334155] text-gray-100 flex flex-col items-center justify-center px-6 overflow-hidden">
      
      {/* 💫 Animated Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-400 opacity-10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-rose-400 opacity-10 blur-3xl rounded-full animate-pulse" />
      </div>

      {/* 🌟 Floating Content */}
      <motion.div
        className="relative z-10 text-center max-w-3xl px-4 py-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-md">
          Welcome to <span className="text-indigo-300">LearnQuest</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed font-medium drop-shadow-sm">
          Master coding with bite-sized quests. Build logic, sharpen skills, and grow at your own pace.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/arena")}
            className="bg-rose-500 hover:bg-rose-600 hover:shadow-rose-400/30 transition-all duration-300 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg"
          >
            🚀 Enter Arena
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/create")}
            className="bg-indigo-500 hover:bg-indigo-600 hover:shadow-indigo-400/30 transition-all duration-300 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg"
          >
            🛠️ Create Challenge
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
