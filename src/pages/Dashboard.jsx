import React from "react";
import "./Dashboard.css";

function Dashboard({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className="dashboard">

      <main
        className={`main-content ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >

        {/* HEADER */}
        <header className="top-header">

          <div className="welcome-section">

            <p className="welcome-small">
              LEARNING DASHBOARD
            </p>

            <h1>
              Welcome back, Sindhu! 👋
            </h1>

            <p className="header-text">
              Continue your learning journey and improve your competencies.
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="profile">

            <div className="notification">
              🔔
            </div>

            <div className="avatar">
              S
            </div>

            <div className="profile-info">
              <strong>Sindhu</strong>
              <small>Learner</small>
            </div>

            {/* THREE DOT */}
            <button
              className="three-dot"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
              ⋮
            </button>

          </div>

        </header>


        {/* STATS */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">📚</div>

            <div>
              <h2>12</h2>
              <p>Courses Completed</p>
              <small>+2 this month</small>
            </div>
          </div>


          <div className="stat-card">
            <div className="stat-icon">🎯</div>

            <div>
              <h2>78%</h2>
              <p>Overall Progress</p>
              <small>+8% this week</small>
            </div>
          </div>


          <div className="stat-card">
            <div className="stat-icon">📝</div>

            <div>
              <h2>86%</h2>
              <p>Average Quiz Score</p>
              <small>Excellent performance</small>
            </div>
          </div>


          <div className="stat-card">
            <div className="stat-icon">🔥</div>

            <div>
              <h2>7 Days</h2>
              <p>Learning Streak</p>
              <small>Keep it going!</small>
            </div>
          </div>

        </section>


        {/* COMPETENCY + AI */}
        <section className="main-grid">

          {/* COMPETENCY GAP */}
          <div className="dashboard-card">

            <div className="card-header">

              <div>
                <span className="card-label">
                  AI ANALYSIS
                </span>

                <h2>
                  Competency Gap Analysis
                </h2>
              </div>

              <button className="view-btn">
                View All →
              </button>

            </div>

            <p className="card-description">
              AI has identified the following areas that need improvement.
            </p>

            <div className="skills">

              <div className="skill">
                <div className="skill-top">
                  <span>Data Analysis</span>
                  <strong>45%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill danger"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>


              <div className="skill">
                <div className="skill-top">
                  <span>Statistical Methods</span>
                  <strong>60%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill warning"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>


              <div className="skill">
                <div className="skill-top">
                  <span>Data Visualization</span>
                  <strong>72%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill success"
                    style={{ width: "72%" }}
                  ></div>
                </div>
              </div>


              <div className="skill">
                <div className="skill-top">
                  <span>Python</span>
                  <strong>85%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill primary"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>

            </div>

          </div>


          {/* AI RECOMMENDATIONS */}
          <div className="dashboard-card">

            <div className="card-header">

              <div>
                <span className="card-label">
                  PERSONALIZED FOR YOU
                </span>

                <h2>
                  🤖 AI Recommendations
                </h2>
              </div>

            </div>


            <div className="recommendation">

              <div className="recommend-icon">
                📊
              </div>

              <div>
                <h3>
                  Data Analysis Fundamentals
                </h3>

                <p>
                  Recommended based on your competency gap.
                </p>

                <button className="start-btn">
                  Start Learning →
                </button>
              </div>

            </div>


            <div className="recommendation">

              <div className="recommend-icon">
                📈
              </div>

              <div>
                <h3>
                  Statistical Methods
                </h3>

                <p>
                  Improve your statistical knowledge.
                </p>

                <button className="start-btn">
                  Start Learning →
                </button>
              </div>

            </div>

          </div>

        </section>


        {/* BOTTOM */}
        <section className="bottom-grid">

          {/* RECENT QUIZ */}
          <div className="dashboard-card">

            <div className="card-header">

              <div>
                <span className="card-label">
                  LATEST ACTIVITY
                </span>

                <h2>
                  📝 Recent Quiz
                </h2>
              </div>

            </div>


            <div className="quiz-content">

              <div className="quiz-icon">
                📊
              </div>

              <div className="quiz-info">
                <h3>
                  Statistical Methods
                </h3>

                <p>
                  20 Questions • Completed today
                </p>
              </div>

              <div className="quiz-score">
                <strong>
                  86%
                </strong>

                <span>
                  Score
                </span>
              </div>

            </div>


            <button className="full-btn">
              Take New Quiz
            </button>

          </div>


          {/* LEARNING PROGRESS */}
          <div className="dashboard-card">

            <div className="card-header">

              <div>
                <span className="card-label">
                  YOUR JOURNEY
                </span>

                <h2>
                  📈 Learning Progress
                </h2>
              </div>

            </div>


            <div className="learning-progress">

              <div className="progress-number">
                78%
              </div>

              <div>

                <h3>
                  Great progress! 🎉
                </h3>

                <p>
                  Keep learning to reach your target competency level.
                </p>

                <button className="continue-btn">
                  Continue Learning →
                </button>

              </div>

            </div>

          </div>

        </section>


        {/* UPLOAD */}
        <section className="upload-section">

          <div className="upload-icon">
            📄
          </div>

          <div>

            <span className="card-label">
              AI POWERED
            </span>

            <h2>
              Upload Learning Material
            </h2>

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