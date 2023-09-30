// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employees from "./pages/Employees";
import Welcome from "./pages/Welcome";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/employees" element={<Employees />} />
    </Routes>
  </Router>
);

export default App;
