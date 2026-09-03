import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="brand">
        <div className="brand-icon">🎓</div>
        <div>
          <h2>LearnAI</h2>
          <span>Smart Learning</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="menu">

        <button onClick={() => navigate("/dashboard")}>
          🏠 Dashboard
        </button>

        <button onClick={() => navigate("/competency-gap")}>
          📊 Competency Gaps
        </button>

        <button onClick={() => navigate("/training")}>
          🎓 Training
        </button>

        <button onClick={() => navigate("/resources")}>
          📚 Learning Resources
        </button>

        <button onClick={() => navigate("/quiz")}>
          📝 Quizzes
        </button>

        <button onClick={() => navigate("/progress")}>
          📈 My Progress
        </button>

      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">

        <button onClick={() => navigate("/settings")}>
          ⚙️ Settings
        </button>

        <button onClick={() => navigate("/login")}>
          🚪 Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;