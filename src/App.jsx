import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CompetencyGap from "./pages/CompetencyGap";
import Training from "./pages/Training";
import Quizzes from "./pages/Quizzes";
import Resources from "./pages/Resources";
import Progress from "./pages/MyProgress";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/competency-gap"
          element={<CompetencyGap />}
        />

        <Route path="/training" element={<Training />} />

        <Route path="/quizzes" element={<Quizzes />} />

        <Route path="/resources" element={<Resources />} />

        <Route path="/my-progress" element={<Progress />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
