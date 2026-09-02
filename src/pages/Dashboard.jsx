import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <h2>LearnAI</h2>
          <p>Smart Learning Platform</p>
        </div>

        <nav className="menu">
          <a href="#" className="active">🏠 Dashboard</a>
          <a href="#">📊 Competency Gaps</a>
          <a href="#">🎓 Training</a>
          <a href="#">📚 Learning Resources</a>
          <a href="#">📝 Quizzes</a>
          <a href="#">📈 My Progress</a>
        </nav>

        <div className="bottom-menu">
          <a href="#">⚙️ Settings</a>
          <a href="#">🚪 Logout</a>
        </div>

      </aside>


      {/* Main Content */}
      <main className="main">

        {/* Top Header */}
        <header className="header">

          <div>
            <h1>Welcome back, Sindhu! 👋</h1>
            <p>
              Continue your learning journey and improve your competencies.
            </p>
          </div>

          <div className="profile">
            <div className="avatar">S</div>

            <div>
              <strong>Sindhu</strong>
              <span>Learner</span>
            </div>
          </div>

        </header>


        {/* Statistics */}
        <section className="stats">

          <div className="stat-card">
            <div className="icon">📚</div>
            <div>
              <h3>12</h3>
              <p>Courses Completed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon">🎯</div>
            <div>
              <h3>78%</h3>
              <p>Overall Progress</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon">📝</div>
            <div>
              <h3>86%</h3>
              <p>Average Quiz Score</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon">🔥</div>
            <div>
              <h3>7 Days</h3>
              <p>Learning Streak</p>
            </div>
          </div>

        </section>


        {/* Main Cards */}
        <section className="content-grid">

          {/* Competency Gap */}
          <div className="card">

            <div className="card-title">
              <h2>Competency Gap Analysis</h2>
              <button>View All</button>
            </div>

            <p className="description">
              AI has identified the following areas that need improvement.
            </p>

            <div className="skill">

              <div className="skill-header">
                <span>Data Analysis</span>
                <strong>45%</strong>
              </div>

              <div className="progress-bg">
                <div
                  className="progress red"
                  style={{ width: "45%" }}
                ></div>
              </div>

            </div>


            <div className="skill">

              <div className="skill-header">
                <span>Statistical Methods</span>
                <strong>60%</strong>
              </div>

              <div className="progress-bg">
                <div
                  className="progress yellow"
                  style={{ width: "60%" }}
                ></div>
              </div>

            </div>


            <div className="skill">

              <div className="skill-header">
                <span>Data Visualization</span>
                <strong>72%</strong>
              </div>

              <div className="progress-bg">
                <div
                  className="progress green"
                  style={{ width: "72%" }}
                ></div>
              </div>

            </div>


            <div className="skill">

              <div className="skill-header">
                <span>Python</span>
                <strong>85%</strong>
              </div>

              <div className="progress-bg">
                <div
                  className="progress blue"
                  style={{ width: "85%" }}
                ></div>
              </div>

            </div>

          </div>


          {/* AI Recommendations */}
          <div className="card">

            <div className="card-title">
              <h2>🤖 AI Training Recommendations</h2>
              <button>View All</button>
            </div>

            <div className="recommendation">

              <div className="recommend-icon">
                📊
              </div>

              <div>
                <h3>Data Analysis Fundamentals</h3>

                <p>
                  Recommended based on your competency gap.
                </p>

                <button className="start-btn">
                  Start Learning
                </button>
              </div>

            </div>


            <div className="recommendation">

              <div className="recommend-icon">
                📈
              </div>

              <div>
                <h3>Statistical Methods</h3>

                <p>
                  Improve your statistical knowledge.
                </p>

                <button className="start-btn">
                  Start Learning
                </button>
              </div>

            </div>


            <div className="recommendation">

              <div className="recommend-icon">
                🐍
              </div>

              <div>
                <h3>Python for Data Science</h3>

                <p>
                  Strengthen your Python skills.
                </p>

                <button className="start-btn">
                  Start Learning
                </button>
              </div>

            </div>

          </div>

        </section>


        {/* Bottom Section */}
        <section className="bottom-grid">


          {/* Quiz */}
          <div className="card">

            <div className="card-title">
              <h2>📝 Recent Quiz</h2>
              <button>View All</button>
            </div>

            <div className="quiz-box">

              <div>
                <h3>Statistical Methods</h3>
                <p>20 Questions</p>
              </div>

              <div className="score">
                <strong>86%</strong>
                <span>Score</span>
              </div>

            </div>

            <button className="quiz-btn">
              Take New Quiz
            </button>

          </div>


          {/* Progress */}
          <div className="card progress-card">

            <h2>📈 Learning Progress</h2>

            <div className="circle">

              <div className="circle-inner">
                <strong>78%</strong>
                <span>Completed</span>
              </div>

            </div>

            <p>
              Keep learning to reach your target competency level.
            </p>

            <button className="continue-btn">
              Continue Learning
            </button>

          </div>

        </section>


        {/* Upload Material */}
        <section className="upload-card">

          <div>
            <h2>📄 Upload Learning Material</h2>

            <p>
              Upload PDF, PPT or DOC files and let AI generate
              quizzes and identify competency gaps.
            </p>
          </div>

          <button className="upload-btn">
            Upload Material
          </button>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;