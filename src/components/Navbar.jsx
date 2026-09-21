import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

import api from "../services/api";

function Navbar() {
  const location = useLocation();

  // =========================================================
  // PROFILE STATE
  // =========================================================

  const [profile, setProfile] = useState(null);

  // =========================================================
  // PAGE INFORMATION
  // =========================================================

  const pageTitles = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Overview of your learning journey",
    },

    "/competency-gap": {
      title: "Competency Gap",
      subtitle: "Understand and improve your skill gaps",
    },

    "/training": {
      title: "Training",
      subtitle: "Explore recommended learning opportunities",
    },

    "/resources": {
      title: "Learning Resources",
      subtitle: "Access useful learning materials",
    },

    "/quizzes": {
      title: "Quizzes",
      subtitle: "Test and strengthen your knowledge",
    },

    "/my-progress": {
      title: "My Progress",
      subtitle: "Track your learning performance",
    },
  };

  const currentPage = pageTitles[location.pathname] || {
    title: "LearnAI",
    subtitle: "Smart Learning",
  };

  // =========================================================
  // LOAD USER PROFILE
  // =========================================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/users/profile/");

        setProfile(response.data);
      } catch (error) {
        console.error("Failed to load navbar profile:", error);
      }
    };

    loadProfile();
  }, []);

  // =========================================================
  // USER DISPLAY DATA
  // =========================================================

  const username = profile?.username || "Learner";

  const role =
    profile?.role === "MOSPI_ADMIN"
      ? "MoSPI Admin"
      : profile?.role === "TRAINER"
      ? "Trainer"
      : "Learner";

  const avatarLetter = username.charAt(0).toUpperCase();

  // =========================================================
  // NAVBAR
  // =========================================================

  return (
    <header className="navbar">

      {/* =====================================================
          LEFT SIDE
          ===================================================== */}

      <div className="navbar-page-info">

        {/* Mobile brand */}

        <div className="navbar-mobile-brand">

          <div className="navbar-logo">
            🎓
          </div>

          <span>
            LearnAI
          </span>

        </div>


        {/* Page title */}

        <div className="navbar-title-wrapper">

          <h1>
            {currentPage.title}
          </h1>

          <p>
            {currentPage.subtitle}
          </p>

        </div>

      </div>


      {/* =====================================================
          RIGHT SIDE
          ===================================================== */}

      <div className="navbar-actions">

        {/* =================================================
            SEARCH
            ================================================= */}

        <div className="navbar-search">

          <span className="search-icon">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
          />

        </div>


        {/* =================================================
            NOTIFICATIONS
            ================================================= */}

        <button
          className="navbar-icon-button"
          type="button"
          title="Notifications"
        >
          🔔

          <span className="notification-dot"></span>

        </button>


        {/* Divider */}

        <div className="navbar-divider"></div>


        {/* =================================================
            USER PROFILE
            ================================================= */}

        <div className="navbar-profile">

          <div className="profile-avatar">
            {avatarLetter}
          </div>


          <div className="profile-info">

            <strong>
              {username}
            </strong>

            <span>
              {role}
            </span>

          </div>


          <span className="profile-arrow">
            ⌄
          </span>

        </div>

      </div>

    </header>
  );
}

export default Navbar;