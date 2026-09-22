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
        <div className="brand-icon">L</div>

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
          <span className="menu-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6v-9h-6v9Zm0-16v5h6V4h-6Z" />
            </svg>
          </span>

          <span className="menu-label">Dashboard</span>
        </button>

        
        <button
          className={
            isActive("/competency-gap")
              ? "menu-item active"
              : "menu-item"
          }
          onClick={() => navigate("/competency-gap")}
        >
          <span className="menu-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 19V9h3v10H5Zm5 0V5h3v14h-3Zm5 0V2h3v17h-3Z" />
            </svg>
          </span>

          <span className="menu-label">Competency Gaps</span>
        </button>


        <button
          className={
            isActive("/training")
              ? "menu-item active"
              : "menu-item"
          }
          onClick={() => navigate("/training")}
        >
          <span className="menu-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3 3 7.5 12 12l7-3.5V14h2V7.5L12 3Zm-5 9.5v4L12 20l5-3.5v-4l-5 2.5-5-2.5Z" />
            </svg>
          </span>

          <span className="menu-label">Training</span>
        </button>


        <button
          className={
            isActive("/resources")
              ? "menu-item active"
              : "menu-item"
          }
          onClick={() => navigate("/resources")}
        >
          <span className="menu-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2Zm1 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11V7a1 1 0 0 0-1-1H6Zm2 3h6v2H8V9Zm0 4h6v2H8v-2Z" />
            </svg>
          </span>

          <span className="menu-label">Learning Resources</span>
        </button>


        <button
          className={
            isActive("/quizzes")
              ? "menu-item active"
              : "menu-item"
          }
          onClick={() => navigate("/quizzes")}
        >
          <span className="menu-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm1 4v2h10V7H7Zm0 4v2h7v-2H7Zm0 4v2h10v-2H7Z" />
            </svg>
          </span>

          <span className="menu-label">Quizzes</span>
        </button>


        <button
          className={
            isActive("/my-progress")
              ? "menu-item active"
              : "menu-item"
          }
          onClick={() => navigate("/my-progress")}
        >
          <span className="menu-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 19V10h3v9H5Zm5 0V5h3v14h-3Zm5 0V2h3v17h-3Z" />
            </svg>
          </span>

          <span className="menu-label">My Progress</span>
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
          <span className="menu-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m19.4 13 .1-1-.1-1 2-1.5-2-3.5-2.3 1a7.7 7.7 0 0 0-1.7-1L15 3h-4l-.4 2a7.7 7.7 0 0 0-1.7 1l-2.3-1-2 3.5L6.6 10l-.1 1 .1 1-2 1.5 2 3.5 2.3-1c.5.4 1.1.7 1.7 1l.4 2h4l.4-2c.6-.3 1.2-.6 1.7-1l2.3 1 2-3.5-1.9-1.5ZM13 15.5A3.5 3.5 0 1 1 13 8a3.5 3.5 0 0 1 0 7.5Z" />
            </svg>
          </span>

          <span className="menu-label">Settings</span>
        </button>


        <button
          className="menu-item logout"
          onClick={handleLogout}
        >
          <span className="menu-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5v-2H5V6h5V4Zm5 3-1.4 1.4 2.2 2.2H9v2h6.8l-2.2 2.2L15 16l5-5-5-4Z" />
            </svg>
          </span>

          <span className="menu-label">Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;