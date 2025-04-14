import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-bgDark text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold text-primary">⚔️ LearnQuest</h1>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-accent">Home</Link></li>
        <li><Link to="/arena" className="hover:text-accent">Arena</Link></li>
        <li><Link to="/create" className="hover:text-accent">Forge Quest</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
 
