import React from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";

const Result = () => {
  const navigate = useNavigate();

  const result = {
    quizName: "Statistical Methods",
    score: 86,
    totalQuestions: 20,
    correct: 17,
    wrong: 3,
    time: "18 min",
  };

  return (
    <div className="result-page">
      {/* Header */}
      <div className="result-header">
        <span className="result-label">QUIZ COMPLETED</span>
        <h1>Quiz Result 🏆</h1>
        <p>
          Here is your performance summary for {result.quizName}.
        </p>
      </div>

      {/* Score Card */}
      <div className="result-main-card">
        <div className="score-circle">
          <div className="score-content">
            <strong>{result.score}%</strong>
            <span>Your Score</span>
          </div>
        </div>

        <div className="score-message">
          <span className="excellent-badge">Excellent!</span>

          <h2>Great Job! 🎉</h2>

          <p>
            You performed really well in this quiz. Keep
            practicing to improve your skills even more.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="result-stats">
        <div className="result-stat-card">
          <div className="stat-icon">📝</div>
          <div>
            <strong>{result.totalQuestions}</strong>
            <span>Total Questions</span>
          </div>
        </div>

        <div className="result-stat-card correct">
          <div className="stat-icon">✓</div>
          <div>
            <strong>{result.correct}</strong>
            <span>Correct Answers</span>
          </div>
        </div>

        <div className="result-stat-card wrong">
          <div className="stat-icon">✕</div>
          <div>
            <strong>{result.wrong}</strong>
            <span>Wrong Answers</span>
          </div>
        </div>

        <div className="result-stat-card">
          <div className="stat-icon">⏱️</div>
          <div>
            <strong>{result.time}</strong>
            <span>Time Taken</span>
          </div>
        </div>
      </div>

      {/* Performance */}
      <div className="performance-section">
        <div className="section-header">
          <div>
            <span className="result-label">PERFORMANCE</span>
            <h2>Performance Overview</h2>
          </div>
        </div>

        <div className="performance-item">
          <div className="performance-info">
            <span>Correct Answers</span>
            <strong>{result.correct} / {result.totalQuestions}</strong>
          </div>

          <div className="performance-bar">
            <div
              className="performance-fill correct-fill"
              style={{
                width: `${(result.correct / result.totalQuestions) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="performance-item">
          <div className="performance-info">
            <span>Overall Score</span>
            <strong>{result.score}%</strong>
          </div>

          <div className="performance-bar">
            <div
              className="performance-fill score-fill"
              style={{
                width: `${result.score}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="feedback-card">
        <div className="feedback-icon">💡</div>

        <div>
          <h3>Keep Improving!</h3>

          <p>
            Review the questions you got wrong and practice
            Statistical Methods to achieve an even higher score.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="result-actions">
        <button
          className="secondary-btn"
          onClick={() => navigate("/quizzes")}
        >
          ← Back to Quizzes
        </button>

        <button
          className="primary-btn"
          onClick={() => navigate("/my-progress")}
        >
          View My Progress →
        </button>
      </div>
    </div>
  );
};

export default Result;