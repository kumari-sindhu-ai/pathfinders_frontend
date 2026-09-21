import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  // =========================================================
  // DASHBOARD STATE
  // =========================================================

  const [profile, setProfile] = useState(null);
  const [competencyData, setCompetencyData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [attempts, setAttempts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD DASHBOARD DATA
  // =========================================================

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        // Get all data required by the Dashboard.
        // api.js automatically adds the JWT access token.
        const [
          profileResponse,
          competencyResponse,
          recommendationResponse,
          attemptsResponse,
        ] = await Promise.all([
          api.get("/users/profile/"),
          api.get("/competency/gaps/"),
          api.get("/courses/recommendations/"),
          api.get("/assessment/attempts/"),
        ]);

        // -----------------------------------------------------
        // PROFILE
        // -----------------------------------------------------

        setProfile(profileResponse.data);

        // -----------------------------------------------------
        // COMPETENCY GAPS
        // -----------------------------------------------------

        setCompetencyData(
          Array.isArray(competencyResponse.data?.gaps)
            ? competencyResponse.data.gaps
            : []
        );

        // -----------------------------------------------------
        // COURSE RECOMMENDATIONS
        // -----------------------------------------------------

        setRecommendations(
          Array.isArray(recommendationResponse.data)
            ? recommendationResponse.data
            : []
        );

        // -----------------------------------------------------
        // ASSESSMENT ATTEMPTS
        // -----------------------------------------------------

        setAttempts(
          Array.isArray(attemptsResponse.data)
            ? attemptsResponse.data
            : []
        );
      } catch (err) {
        console.error("Failed to load dashboard:", err);

        setError(
          err.response?.data?.detail ||
            "Failed to load dashboard data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // =========================================================
  // CALCULATED DASHBOARD VALUES
  // =========================================================

  // Latest quiz attempt
  const recentQuiz = attempts.length > 0 ? attempts[0] : null;

  // Average quiz score
  const averageQuizScore =
    attempts.length > 0
      ? Math.round(
          attempts.reduce(
            (total, attempt) => total + Number(attempt.score || 0),
            0
          ) / attempts.length
        )
      : null;

  // =========================================================
  // COMPETENCY LEVEL → DISPLAY PERCENTAGE
  // =========================================================
  //
  // Backend stores competency levels from 0 to 4.
  //
  // 0 → 0%
  // 1 → 25%
  // 2 → 50%
  // 3 → 75%
  // 4 → 100%
  //
  // This is only for visual display.
  // =========================================================

  const getCompetencyPercentage = (currentLevel) => {
    const level = Number(currentLevel || 0);

    return Math.min(Math.max(level * 25, 0), 100);
  };

  // =========================================================
  // GET CSS CLASS FOR COMPETENCY PROGRESS
  // =========================================================

  const getProgressClass = (percentage) => {
    if (percentage < 50) {
      return "danger";
    }

    if (percentage < 70) {
      return "warning";
    }

    if (percentage < 85) {
      return "success";
    }

    return "primary";
  };

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return (
      <div className="dashboard">
        <main className="main-content">
          <div className="dashboard-card">
            <h2>Loading Dashboard...</h2>
            <p>Fetching your learning information.</p>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // ERROR STATE
  // =========================================================

  if (error) {
    return (
      <div className="dashboard">
        <main className="main-content">
          <div className="dashboard-card">
            <h2>Unable to load Dashboard</h2>

            <p>{error}</p>

            <button
              className="full-btn"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // USER DISPLAY DATA
  // =========================================================

  const username = profile?.username || "Learner";

  // =========================================================
  // DASHBOARD UI
  // =========================================================

  return (
    <div className="dashboard">

      <main className="main-content">

        {/* =====================================================
            WELCOME SECTION
            ===================================================== */}

        <header className="top-header">

          <div className="welcome-section">

            <p className="welcome-small">
              LEARNING DASHBOARD
            </p>

            <h1>
              Welcome back, {username}! 👋
            </h1>

            <p className="header-text">
              Continue your learning journey and improve your competencies.
            </p>

          </div>

        </header>


        {/* =====================================================
            STATS
            ===================================================== */}

        <section className="stats-grid">

          {/* COURSES COMPLETED */}

          <div className="stat-card">

            <div className="stat-icon">
              📚
            </div>

            <div>
              <h2>—</h2>

              <p>
                Courses Completed
              </p>

              <small>
                Progress tracking available soon
              </small>
            </div>

          </div>


          {/* OVERALL PROGRESS */}

          <div className="stat-card">

            <div className="stat-icon">
              🎯
            </div>

            <div>
              <h2>—</h2>

              <p>
                Overall Progress
              </p>

              <small>
                Not available from current API
              </small>
            </div>

          </div>


          {/* AVERAGE QUIZ SCORE */}

          <div className="stat-card">

            <div className="stat-icon">
              📝
            </div>

            <div>

              <h2>
                {averageQuizScore !== null
                  ? `${averageQuizScore}%`
                  : "—"}
              </h2>

              <p>
                Average Quiz Score
              </p>

              <small>
                {attempts.length > 0
                  ? `${attempts.length} assessment${
                      attempts.length === 1 ? "" : "s"
                    } completed`
                  : "No assessments completed yet"}
              </small>

            </div>

          </div>


          {/* LEARNING STREAK */}

          <div className="stat-card">

            <div className="stat-icon">
              🔥
            </div>

            <div>

              <h2>—</h2>

              <p>
                Learning Streak
              </p>

              <small>
                Not available from current API
              </small>

            </div>

          </div>

        </section>


        {/* =====================================================
            COMPETENCY + AI RECOMMENDATIONS
            ===================================================== */}

        <section className="main-grid">

          {/* =================================================
              COMPETENCY GAP ANALYSIS
              ================================================= */}

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

              <button
                className="view-btn"
                onClick={() => navigate("/competency-gap")}
              >
                View All →
              </button>

            </div>


            <p className="card-description">
              AI has identified the following areas that need improvement.
            </p>


            <div className="skills">

              {competencyData.length === 0 ? (

                <p>
                  No competency data available yet.
                </p>

              ) : (

                competencyData
                  .slice(0, 4)
                  .map((item, index) => {

                    const percentage =
                      getCompetencyPercentage(
                        item.current_level
                      );

                    const progressClass =
                      getProgressClass(percentage);

                    return (
                      <div
                        className="skill"
                        key={`${item.competency}-${index}`}
                      >

                        <div className="skill-top">

                          <span>
                            {item.competency}
                          </span>

                          <strong>
                            {percentage}%
                          </strong>

                        </div>


                        <div className="progress-track">

                          <div
                            className={`progress-fill ${progressClass}`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          ></div>

                        </div>


                        <small>
                          Current level:{" "}
                          {item.current_level ?? 0}
                          {" / "}
                          Required level:{" "}
                          {item.required_level ?? 0}
                        </small>

                      </div>
                    );
                  })

              )}

            </div>

          </div>


          {/* =================================================
              AI RECOMMENDATIONS
              ================================================= */}

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


            {recommendations.length === 0 ? (

              <p>
                No course recommendations available yet.
              </p>

            ) : (

              recommendations
                .slice(0, 2)
                .map((recommendation, index) => (

                  <div
                    className="recommendation"
                    key={
                      recommendation.course_id ||
                      index
                    }
                  >

                    <div className="recommend-icon">
                      {index === 0 ? "📊" : "📈"}
                    </div>


                    <div>

                      <h3>
                        {recommendation.course ||
                          "Recommended Course"}
                      </h3>


                      <p>
                        {recommendation.reason ||
                          `Recommended based on your competency gap in ${
                            recommendation.competency ||
                            "this area"
                          }.`}
                      </p>


                      <button
                        className="start-btn"
                        onClick={() => {
                          navigate("/training");
                        }}
                      >
                        Start Learning →
                      </button>

                    </div>

                  </div>

                ))

            )}

          </div>

        </section>


        {/* =====================================================
            BOTTOM SECTION
            ===================================================== */}

        <section className="bottom-grid">

          {/* =================================================
              RECENT QUIZ
              ================================================= */}

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


            {recentQuiz ? (

              <div className="quiz-content">

                <div className="quiz-icon">
                  📊
                </div>


                <div className="quiz-info">

                  <h3>
                    {recentQuiz.assessment_title ||
                      "Assessment"}
                  </h3>

                  <p>
                    Completed{" "}
                    {recentQuiz.completed_at
                      ? new Date(
                          recentQuiz.completed_at
                        ).toLocaleDateString()
                      : "recently"}
                  </p>

                </div>


                <div className="quiz-score">

                  <strong>
                    {Number(
                      recentQuiz.score || 0
                    )}
                    %
                  </strong>

                  <span>
                    Score
                  </span>

                </div>

              </div>

            ) : (

              <div className="quiz-content">

                <div className="quiz-icon">
                  📝
                </div>

                <div className="quiz-info">

                  <h3>
                    No quizzes completed yet
                  </h3>

                  <p>
                    Complete an assessment to see
                    your latest result here.
                  </p>

                </div>

              </div>

            )}


            <button
              className="full-btn"
              onClick={() => navigate("/quizzes")}
            >
              Take New Quiz
            </button>

          </div>


          {/* =================================================
              LEARNING PROGRESS
              ================================================= */}

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
                —
              </div>


              <div>

                <h3>
                  Keep learning! 🎯
                </h3>

                <p>
                  Overall learning progress is not
                  currently provided by the backend.
                </p>


                <button
                  className="continue-btn"
                  onClick={() => navigate("/training")}
                >
                  Continue Learning →
                </button>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            UPLOAD LEARNING MATERIAL
            ===================================================== */}

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
              Upload PDF, PPT or DOC files and let AI
              generate quizzes and identify competency
              gaps.
            </p>

          </div>


          <button
            className="upload-btn"
            onClick={() => {
              alert(
                "Learning material upload will be connected later."
              );
            }}
          >
            + Upload Material
          </button>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;