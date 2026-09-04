import React from "react";
import "./MyProgress.css";

const Progress = () => {
  const subjects = [
    {
      name: "Web Development",
      completed: 75,
      color: "#4f46e5",
    },
    {
      name: "Database Management",
      completed: 60,
      color: "#16a34a",
    },
    {
      name: "Operating System",
      completed: 45,
      color: "#f59e0b",
    },
    {
      name: "Computer Networks",
      completed: 80,
      color: "#dc2626",
    },
  ];

  return (
    <div className="progress-page">
      {/* Header */}
      <div className="progress-header">
        <h1>My Progress</h1>
        <p>Track your learning progress and achievements</p>
      </div>

      {/* Summary Cards */}
      <div className="progress-summary">
        <div className="summary-card">
          <h3>Overall Progress</h3>

          <div className="circle-progress">
            <span>65%</span>
          </div>

          <p>Keep going! You're doing great.</p>
        </div>

        <div className="summary-card">
          <h3>Courses Completed</h3>

          <div className="summary-number">4</div>

          <p>Courses successfully completed</p>
        </div>

        <div className="summary-card">
          <h3>Learning Hours</h3>

          <div className="summary-number">42</div>

          <p>Hours spent learning</p>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="subjects-section">
        <h2>Subject Progress</h2>

        {subjects.map((subject, index) => (
          <div className="subject-card" key={index}>
            <div className="subject-info">
              <h3>{subject.name}</h3>
              <span>{subject.completed}%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${subject.completed}%`,
                  backgroundColor: subject.color,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="achievement-section">
        <h2>Recent Achievements</h2>

        <div className="achievement-card">
          <div className="achievement-icon">🏆</div>

          <div>
            <h3>Great Progress!</h3>
            <p>You completed 75% of Web Development.</p>
          </div>
        </div>

        <div className="achievement-card">
          <div className="achievement-icon">⭐</div>

          <div>
            <h3>Keep Learning</h3>
            <p>You've spent 42 hours learning this month.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;