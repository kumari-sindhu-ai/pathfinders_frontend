import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CompetencyGap from "./pages/CompetencyGap";
import Training from "./pages/Training";
import Quizzes from "./pages/Quizzes";
import Resources from "./pages/Resources";
import Progress from "./pages/MyProgress";
import Result from "./pages/Result";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* User Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/competency-gap" element={<CompetencyGap />} />
        <Route path="/training" element={<Training />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/my-progress" element={<Progress />} />
        <Route path="/result" element={<Result />} />

        {/* Admin */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;