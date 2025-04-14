import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Arena from "./pages/Arena";
import CreateChallenge from "./pages/CreateChallenge";
// Optional: import NotFound from "./pages/NotFound"; if you want a 404 page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/create" element={<CreateChallenge />} />
        {/* Optional */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
