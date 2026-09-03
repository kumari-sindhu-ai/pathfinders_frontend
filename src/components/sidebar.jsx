{/* Sidebar */}
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

    <button
      className="menu-item active"
      onClick={() => navigate("/dashboard")}
    >
      <span>🏠</span>
      Dashboard
    </button>

    <button
      className="menu-item"
      onClick={() => navigate("/gap-analysis")}
    >
      <span>📊</span>
      Competency Gaps
    </button>

    <button
      className="menu-item"
      onClick={() => navigate("/training")}
    >
      <span>🎓</span>
      Training
    </button>

    <button
      className="menu-item"
      onClick={() => navigate("/resources")}
    >
      <span>📚</span>
      Learning Resources
    </button>

    <button
      className="menu-item"
      onClick={() => navigate("/quiz")}
    >
      <span>📝</span>
      Quizzes
    </button>

    <button
      className="menu-item"
      onClick={() => navigate("/progress")}
    >
      <span>📈</span>
      My Progress
    </button>

  </nav>


  {/* Bottom Menu */}
  <div className="sidebar-bottom">

    <button className="menu-item">
      <span>⚙️</span>
      Settings
    </button>

    <button
      className="menu-item logout"
      onClick={() => navigate("/login")}
    >
      <span>🚪</span>
      Logout
    </button>

  </div>

</aside>