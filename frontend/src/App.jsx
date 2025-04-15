import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Arena from "./pages/Arena";
import CreateChallenge from "./pages/CreateChallenge";
import ChallengeDetails from "./pages/ChallengeDetails";  // Import the ChallengeDetails component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/create" element={<CreateChallenge />} />
        <Route path="/quest/:id" element={<ChallengeDetails />} />


      </Routes>
    </Router>
  );
}

export default App;
