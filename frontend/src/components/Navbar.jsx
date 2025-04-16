import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg rounded-lg border-b-4 border-gray-700">
      <h1 className="text-2xl font-bold text-teal-400 flex-shrink-0">⚔️ LearnQuest</h1>
      <ul className="flex ml-auto list-none">
  <li className="mr-6">
    <button
      onClick={() => navigate("/")}
      className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300"
    >
      Home
    </button>
  </li>
  <li className="mr-6">
    <button
      onClick={() => navigate("/arena")}
      className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300"
    >
      Arena
    </button>
  </li>
  <li>
    <button
      onClick={() => navigate("/create")}
      className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300"
    >
      Forge Quest
    </button>
  </li>
  <li>
    <button
      onClick={() => navigate("/leaderboard")}
      className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300"
    >
      LeaderBoard
    </button>
  </li>
</ul>
    </nav>
  );
};

export default Navbar;
