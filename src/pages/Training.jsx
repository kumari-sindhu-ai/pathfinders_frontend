import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Training.css";

import api from "../services/api";

function Training() {
  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================

  const [courses, setCourses] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD COURSES + RECOMMENDATIONS
  // =========================================================

  useEffect(() => {
    const loadTrainingData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          coursesResponse,
          recommendationsResponse,
        ] = await Promise.all([
          api.get("/courses/"),
          api.get("/courses/recommendations/"),
        ]);

        // -----------------------------------------------------
        // COURSES
        // -----------------------------------------------------

        setCourses(
          Array.isArray(coursesResponse.data)
            ? coursesResponse.data
            : []
        );

        // -----------------------------------------------------
        // AI RECOMMENDATIONS
        // -----------------------------------------------------

        setRecommendations(
          Array.isArray(recommendationsResponse.data)
            ? recommendationsResponse.data
            : []
        );
      } catch (err) {
        console.error(
          "Failed to load training data:",
          err
        );

        setError(
          err.response?.data?.detail ||
            "Failed to load training data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadTrainingData();
  }, []);

  // =========================================================
  // CALCULATED VALUES
  // =========================================================

  // We cannot calculate completed courses yet because the
  // backend currently does not provide a GET learning-progress
  // endpoint.
  const completedCourses = null;

  // Progress is also not available from the current GET APIs.
  const averageProgress = null;

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return (
      <main className="training-page">
        <div className="recommended-training">
          <h2>Loading Training...</h2>
          <p>
            Fetching your available courses and
            recommendations.
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR STATE
  // =========================================================

  if (error) {
    return (
      <main className="training-page">
        <div className="recommended-training">
          <h2>Unable to load Training</h2>

          <p>{error}</p>

          <button
            className="browse-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <main className="training-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="training-header">

        <div>

          <h1>
            Training
          </h1>

          <p>
            Improve your skills with personalized
            learning paths.
          </p>

        </div>

        <button
          className="browse-btn"
          onClick={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          Browse Courses
        </button>

      </div>


      {/* =====================================================
          TRAINING STATS
          ===================================================== */}

      <section className="training-stats">

        {/* ACTIVE COURSES */}

        <div className="training-stat-card">

          <span>
            📚
          </span>

          <div>

            <h3>
              {courses.length}
            </h3>

            <p>
              Available Courses
            </p>

          </div>

        </div>


        {/* AVERAGE PROGRESS */}

        <div className="training-stat-card">

          <span>
            📈
          </span>

          <div>

            <h3>
              {averageProgress !== null
                ? `${averageProgress}%`
                : "—"}
            </h3>

            <p>
              Average Progress
            </p>

          </div>

        </div>


        {/* COMPLETED */}

        <div className="training-stat-card">

          <span>
            🏆
          </span>

          <div>

            <h3>
              {completedCourses !== null
                ? completedCourses
                : "—"}
            </h3>

            <p>
              Completed
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          COURSES
          ===================================================== */}

      <section className="courses-section">

        <div className="section-title">

          <h2>
            My Training Courses
          </h2>

          <span>
            {courses.length} Courses
          </span>

        </div>


        <div className="course-grid">

          {courses.length === 0 ? (

            <div className="recommended-training">

              <h3>
                No courses available
              </h3>

              <p>
                There are currently no courses
                available in the system.
              </p>

            </div>

          ) : (

            courses.map((course) => (

              <div
                className="course-card"
                key={course.id}
              >

                <div className="course-icon">
                  🎓
                </div>


                <div className="course-info">

                  <span className="course-category">
                    {course.provider ||
                      "Learning Course"}
                  </span>


                  <h3>
                    {course.title}
                  </h3>


                  <div className="course-details">

                    <span>
                      📊 {course.level}
                    </span>

                    <span>
                      ⏱ {course.duration_hours}{" "}
                      {course.duration_hours === 1
                        ? "Hour"
                        : "Hours"}
                    </span>

                  </div>


                  <div className="progress-info">

                    <span>
                      Progress
                    </span>

                    <span>
                      —
                    </span>

                  </div>


                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{
                        width: "0%",
                      }}
                    ></div>

                  </div>


                  <button
                    className="continue-btn"
                    onClick={() => {
                      if (course.external_url) {
                        window.open(
                          course.external_url,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }
                    }}
                  >
                    {course.external_url
                      ? "Start Learning"
                      : "Continue Learning"}
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </section>
      {/* =====================================================
          AI RECOMMENDED TRAINING
          ===================================================== */}

      <section className="recommended-training">

        <h2>
          🤖 AI Recommended Training
        </h2>


        {recommendations.length === 0 ? (

          <div className="recommendation">

            <div>

              <h3>
                No recommendations available
              </h3>

              <p>
                Complete competency assessments to
                receive personalized training
                recommendations.
              </p>

            </div>

          </div>

        ) : (

          recommendations.map(
            (recommendation, index) => (

              <div
                className="recommendation"
                key={
                  recommendation.course_id ||
                  index
                }
              >

                <div>

                  <h3>
                    {recommendation.course ||
                      "Recommended Course"}
                  </h3>

                  <p>
                    {recommendation.reason ||
                      `Recommended based on your competency gap in ${
                        recommendation.competency ||
                        "this competency"
                      }.`}
                  </p>

                  <p>
                    <strong>
                      Competency:
                    </strong>{" "}
                    {recommendation.competency ||
                      "—"}
                  </p>

                  <p>
                    <strong>
                      Level:
                    </strong>{" "}
                    {recommendation.level ||
                      "—"}
                  </p>

                </div>


                <button
                  onClick={() => {

                    if (
                      recommendation.external_url
                    ) {

                      window.open(
                        recommendation.external_url,
                        "_blank",
                        "noopener,noreferrer"
                      );

                    } else {

                      navigate("/training");

                    }

                  }}
                >
                  Start Training
                </button>

              </div>

            )
          )

        )}

      </section>

    </main>
  );
}

export default Training;