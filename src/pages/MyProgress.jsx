import React, { useEffect, useState } from "react";
import "./MyProgress.css";
import api from "../services/api";

const Progress = () => {
  const [competencies, setCompetencies] = useState([]);
  const [attempts, setAttempts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* =====================================================
     LOAD PROGRESS DATA
     ===================================================== */

  useEffect(() => {
    const loadProgressData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          competencyResponse,
          attemptsResponse,
        ] = await Promise.all([
          api.get("/competency/gaps/"),
          api.get("/assessment/attempts/"),
        ]);

        setCompetencies(
          Array.isArray(competencyResponse.data?.gaps)
            ? competencyResponse.data.gaps
            : []
        );

        setAttempts(
          Array.isArray(attemptsResponse.data)
            ? attemptsResponse.data
            : []
        );

      } catch (err) {
        console.error(
          "Failed to load progress data:",
          err
        );

        setError(
          err.response?.data?.detail ||
          err.response?.data?.error ||
          "Failed to load progress data. Please try again."
        );

      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, []);


  /* =====================================================
     CALCULATE OVERALL COMPETENCY PROGRESS
     ===================================================== */

  const overallProgress =
    competencies.length > 0
      ? Math.round(
          competencies.reduce(
            (total, item) => {
              const currentLevel =
                Number(item.current_level || 0);

              const requiredLevel =
                Number(item.required_level || 0);

              if (requiredLevel <= 0) {
                return total;
              }

              const percentage = Math.min(
                (currentLevel / requiredLevel) * 100,
                100
              );

              return total + percentage;
            },
            0
          ) / competencies.length
        )
      : 0;


  /* =====================================================
     SUBJECT / COMPETENCY PROGRESS
     ===================================================== */

  const subjects = competencies.map(
    (item, index) => {

      const currentLevel =
        Number(item.current_level || 0);

      const requiredLevel =
        Number(item.required_level || 0);

      const completed =
        requiredLevel > 0
          ? Math.min(
              Math.round(
                (currentLevel / requiredLevel) * 100
              ),
              100
            )
          : 0;

      const colors = [
        "#4f46e5",
        "#16a34a",
        "#f59e0b",
        "#dc2626",
      ];

      return {
        name: item.competency,
        completed,
        currentLevel,
        requiredLevel,
        color: colors[index % colors.length],
      };
    }
  );


  /* =====================================================
     QUIZ STATISTICS
     ===================================================== */

  const completedAssessments =
    attempts.length;

  const averageQuizScore =
    attempts.length > 0
      ? Math.round(
          attempts.reduce(
            (total, attempt) =>
              total +
              Number(attempt.score || 0),
            0
          ) / attempts.length
        )
      : null;


  /* =====================================================
     LATEST ATTEMPT
     ===================================================== */

  const latestAttempt =
    attempts.length > 0
      ? attempts[0]
      : null;


  /* =====================================================
     LOADING
     ===================================================== */

  if (loading) {
    return (
      <div className="progress-page">
        <div className="progress-loading">
          Loading your progress...
        </div>
      </div>
    );
  }


  /* =====================================================
     PAGE
     ===================================================== */

  return (
    <div className="progress-page">

      {/* HEADER */}

      <div className="progress-header">

        <h1>
          My Progress
        </h1>

        <p>
          Track your learning progress and achievements
        </p>

      </div>


      {/* ERROR */}

      {error && (
        <div className="progress-error">
          {error}
        </div>
      )}


      {/* SUMMARY CARDS */}

      <div className="progress-summary">

        {/* OVERALL PROGRESS */}

        <div className="summary-card">

          <h3>
            Overall Progress
          </h3>


          <div
            className="circle-progress"
            style={{
              background: `conic-gradient(
                #4f46e5 ${overallProgress}%,
                #e5e7eb ${overallProgress}%
              )`,
            }}
          >

            <span>
              {overallProgress}%
            </span>

          </div>


          <p>
            {competencies.length > 0
              ? "Based on your current competency levels."
              : "Complete assessments to track your progress."}
          </p>

        </div>


        {/* COMPLETED ASSESSMENTS */}

        <div className="summary-card">

          <h3>
            Assessments Completed
          </h3>

          <div className="summary-number">
            {completedAssessments}
          </div>

          <p>
            {completedAssessments > 0
              ? "Assessments successfully completed"
              : "No assessments completed yet"}
          </p>

        </div>


        {/* AVERAGE SCORE */}

        <div className="summary-card">

          <h3>
            Average Quiz Score
          </h3>

          <div className="summary-number">

            {averageQuizScore !== null
              ? `${averageQuizScore}%`
              : "—"}

          </div>

          <p>
            {averageQuizScore !== null
              ? "Average score across your assessments"
              : "Complete a quiz to see your score"}
          </p>

        </div>

      </div>


      {/* SUBJECT PROGRESS */}

      <div className="subjects-section">

        <h2>
          Competency Progress
        </h2>


        {subjects.length === 0 ? (

          <p className="empty-progress">
            No competency data available yet.
            Complete an assessment to start
            tracking your progress.
          </p>

        ) : (

          subjects.map((subject, index) => (

            <div
              className="subject-card"
              key={`${subject.name}-${index}`}
            >

              <div className="subject-info">

                <h3>
                  {subject.name}
                </h3>

                <span>
                  {subject.completed}%
                </span>

              </div>


              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${subject.completed}%`,
                    backgroundColor:
                      subject.color,
                  }}
                ></div>

              </div>


              <small className="level-info">
                Current level:{" "}
                {subject.currentLevel}
                {" / "}
                Required level:{" "}
                {subject.requiredLevel}
              </small>

            </div>

          ))

        )}

      </div>

      {/* RECENT ACHIEVEMENTS */}

      <div className="achievement-section">

        <h2>
          Recent Achievements
        </h2>


        {attempts.length === 0 ? (

          <div className="achievement-card">

            <div className="achievement-icon">
              📚
            </div>

            <div>
              <h3>
                Start Your Learning Journey
              </h3>

              <p>
                Complete your first assessment to
                start building your progress history.
              </p>
            </div>

          </div>

        ) : (

          <>
            {/* Latest Assessment */}

            {latestAttempt && (
              <div className="achievement-card">

                <div className="achievement-icon">
                  🏆
                </div>

                <div>

                  <h3>
                    Assessment Completed
                  </h3>

                  <p>
                    You scored{" "}
                    <strong>
                      {latestAttempt.score}%
                    </strong>{" "}
                    in{" "}
                    <strong>
                      {latestAttempt.assessment_title ||
                        "your assessment"}
                    </strong>
                    .
                  </p>

                </div>

              </div>
            )}


            {/* Average Score Achievement */}

            {averageQuizScore !== null &&
              averageQuizScore >= 80 && (

                <div className="achievement-card">

                  <div className="achievement-icon">
                    ⭐
                  </div>

                  <div>

                    <h3>
                      Excellent Performance!
                    </h3>

                    <p>
                      Your average assessment score
                      is {averageQuizScore}%.
                    </p>

                  </div>

                </div>

              )}


            {/* Multiple Assessments */}

            {completedAssessments >= 3 && (

              <div className="achievement-card">

                <div className="achievement-icon">
                  🎯
                </div>

                <div>

                  <h3>
                    Consistent Learner
                  </h3>

                  <p>
                    You have completed{" "}
                    {completedAssessments}{" "}
                    assessments. Keep learning!
                  </p>

                </div>

              </div>

            )}


            {/* Competency Progress Achievement */}

            {overallProgress >= 75 && (

              <div className="achievement-card">

                <div className="achievement-icon">
                  🚀
                </div>

                <div>

                  <h3>
                    Great Progress!
                  </h3>

                  <p>
                    Your overall competency progress
                    has reached {overallProgress}%.
                  </p>

                </div>

              </div>

            )}

          </>

        )}

      </div>


    </div>
  );
};

export default Progress;