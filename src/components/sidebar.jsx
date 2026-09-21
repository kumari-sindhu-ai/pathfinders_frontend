import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="sidebar">

      {/* =====================================================
          BRAND
      ====================================================== */}
      <div className="brand">
        <div className="brand-icon">🎓</div>

        <div>
          <h2>LearnAI</h2>
          <span>Smart Learning</span>
        </div>
      </div>


      {/* =====================================================
          MAIN MENU
      ====================================================== */}
      <nav className="menu">

        <button
          className={isActive("/dashboard") ? "menu-item active" : "menu-item"}
          onClick={() => navigate("/dashboard")}
        >
          <span>🏠</span>
          <span>Dashboard</span>
        </button>


        <button
          className={
            isActive("/competency-gap")
              ? "menu-item active"
              : "menu-item"
          }
          onClick={() => navigate("/competency-gap")}
        >
          <span>📊</span>
          <span>Competency Gaps</span>
        </button>


        <button
          className={
            isActive("/training")
              ? "menu-item active"
              : "menu-item"
          }
          onClick={() => navigate("/training")}
        >
          <span>🎓</span>
          <span>Training</span>
        </button>


        <button
          className={
            isActive("/resources")
              ? "menu-item active"
              : "menu-item"
          }
          onClick={() => navigate("/resources")}
        >
          <span>📚</span>
          <span>Learning Resources</span>
        </button>


        <button
          className={
            isActive("/quizzes")
              ? "menu-item active"
              : "menu-item"
          }
          onClick={() => navigate("/quizzes")}
        >
          <span>📝</span>
          <span>Quizzes</span>
        </button>


        <button
          className={
            isActive("/my-progress")
              ? "menu-item active"
              : "menu-item"
          }
          onClick={() => navigate("/my-progress")}
        >
          <span>📈</span>
          <span>My Progress</span>
        </button>

      </nav>


      {/* =====================================================
          BOTTOM MENU
      ====================================================== */}
      <div className="sidebar-bottom">

        <button
          className={
            isActive("/settings")
              ? "menu-item active"
              : "menu-item"
          }
          onClick={() => navigate("/settings")}
        >
          <span>⚙️</span>
          <span>Settings</span>
        </button>


        <button
          className="menu-item logout"
          onClick={handleLogout}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;