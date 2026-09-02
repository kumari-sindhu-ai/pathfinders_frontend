import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const skills = [
    { name: "Data Analysis", value: 45, color: "danger" },
    { name: "Statistical Methods", value: 60, color: "warning" },
    { name: "Data Visualization", value: 72, color: "success" },
    { name: "Python", value: 85, color: "primary" },
  ];

  const recommendations = [
    {
      icon: "📊",
      title: "Data Analysis Fundamentals",
      text: "Recommended based on your competency gap.",
    },
    {
      icon: "📈",
      title: "Statistical Methods",
      text: "Improve your statistical knowledge.",
    },
    {
      icon: "🐍",
      title: "Python for Data Science",
      text: "Strengthen your Python skills.",
    },
  ];

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">🎓</div>
          <div>
            <h2>LearnAI</h2>
            <span>Smart Learning</span>
          </div>
        </div>

        <nav className="menu">

          <button className="menu-item active">
            <span>🏠</span>
            Dashboard
          </button>

          <button className="menu-item">
            <span>📊</span>
            Competency Gaps
          </button>

          <button className="menu-item">
            <span>🎓</span>
            Training
          </button>

          <button className="menu-item">
            <span>📚</span>
            Learning Resources
          </button>

          <button className="menu-item">
            <span>📝</span>
            Quizzes
          </button>

          <button className="menu-item">
            <span>📈</span>
            My Progress
          </button>

        </nav>

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


      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="top-header">

          <div>
            <p className="welcome-small">LEARNING DASHBOARD</p>

            <h1>
              Welcome back, Sindhu! <span>👋</span>
            </h1>

            <p className="header-text">
              Continue your learning journey and improve your competencies.
            </p>
          </div>

          <div className="profile">

            <div className="notification">
              🔔
              <span></span>
            </div>

            <div className="avatar">
              S
            </div>

            <div className="profile-info">
              <strong>Sindhu</strong>
              <small>Learner</small>
            </div>

          </div>

        </header>


        {/* Statistics */}
        <section className="stats-grid">

          <div className="stat-card purple">
            <div className="stat-icon">📚</div>

            <div>
              <h2>12</h2>
              <p>Courses Completed</p>
              <small>+2 this month</small>
            </div>
          </div>


          <div className="stat-card blue">
            <div className="stat-icon">🎯</div>

            <div>
              <h2>78%</h2>
              <p>Overall Progress</p>
              <small>+8% this week</small>
            </div>
          </div>


          <div className="stat-card green">
            <div className="stat-icon">📝</div>

            <div>
              <h2>86%</h2>
              <p>Average Quiz Score</p>
              <small>Excellent performance</small>
            </div>
          </div>


          <div className="stat-card orange">
            <div className="stat-icon">🔥</div>

            <div>
              <h2>7 Days</h2>
              <p>Learning Streak</p>
              <small>Keep it going!</small>
            </div>
          </div>

        </section>


        {/* Main Grid */}
        <section className="main-grid">


          {/* Competency */}
          <div className="dashboard-card">

            <div className="card-header">
              <div>
                <span className="card-label">AI ANALYSIS</span>
                <h2>Competency Gap Analysis</h2>
              </div>

              <button className="view-btn">
                View All →
              </button>
            </div>

            <p className="card-description">
              AI has identified the following areas that need improvement.
            </p>


            <div className="skills">

              {skills.map((skill) => (
                <div className="skill" key={skill.name}>

                  <div className="skill-top">
                    <span>{skill.name}</span>
                    <strong>{skill.value}%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className={`progress-fill ${skill.color}`}
                      style={{ width: `${skill.value}%` }}
                    ></div>
                  </div>

                </div>
              ))}

            </div>

          </div>


          {/* AI Recommendations */}
          <div className="dashboard-card">

            <div className="card-header">
              <div>
                <span className="card-label">PERSONALIZED FOR YOU</span>
                <h2>🤖 AI Recommendations</h2>
              </div>

              <button className="view-btn">
                View All →
              </button>
            </div>


            <div className="recommendations">

              {recommendations.map((item) => (
                <div className="recommendation" key={item.title}>

                  <div className="recommend-icon">
                    {item.icon}
                  </div>

                  <div className="recommend-content">

                    <h3>{item.title}</h3>

                    <p>{item.text}</p>

                    <button className="start-btn">
                      Start Learning →
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </section>


        {/* Bottom Grid */}
        <section className="bottom-grid">


          {/* Recent Quiz */}
          <div className="dashboard-card quiz-card">

            <div className="card-header">

              <div>
                <span className="card-label">LATEST ACTIVITY</span>
                <h2>📝 Recent Quiz</h2>
              </div>

              <button className="view-btn">
                View All →
              </button>

            </div>


            <div className="quiz-content">

              <div className="quiz-icon">
                📊
              </div>

              <div className="quiz-info">
                <h3>Statistical Methods</h3>
                <p>20 Questions • Completed today</p>
              </div>

              <div className="quiz-score">
                <strong>86%</strong>
                <span>Score</span>
              </div>

            </div>

            <button className="full-btn">
              Take New Quiz
            </button>

          </div>


          {/* Learning Progress */}
          <div className="dashboard-card progress-card">

            <div className="card-header">
              <div>
                <span className="card-label">YOUR JOURNEY</span>
                <h2>📈 Learning Progress</h2>
              </div>
            </div>


            <div className="progress-section">

              <div className="progress-circle">

                <div className="circle-content">
                  <strong>78%</strong>
                  <span>Completed</span>
                </div>

              </div>

              <div className="progress-text">

                <h3>Great progress! 🎉</h3>

                <p>
                  You're making excellent progress.
                  Keep learning to reach your target competency level.
                </p>

                <button className="continue-btn">
                  Continue Learning →
                </button>

              </div>

            </div>

          </div>

        </section>


        {/* Upload Section */}
        <section className="upload-section">

          <div className="upload-icon">
            📄
          </div>

          <div className="upload-text">

            <span className="card-label">AI POWERED</span>

            <h2>Upload Learning Material</h2>

            <p>
              Upload PDF, PPT or DOC files and let AI generate
              quizzes and identify competency gaps.
            </p>

          </div>

          <button className="upload-btn">
            + Upload Material
          </button>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;