import React from "react";
import "./CompetencyGap.css";

function CompetencyGap() {
  const skills = [
    {
      name: "Data Analysis",
      score: 45,
      level: "Needs Improvement",
      description: "Improve your ability to analyze and interpret datasets.",
    },
    {
      name: "Statistical Methods",
      score: 60,
      level: "Intermediate",
      description: "Strengthen your understanding of statistical concepts.",
    },
    {
      name: "Data Visualization",
      score: 72,
      level: "Good",
      description: "You have a good understanding of charts and visualization.",
    },
    {
      name: "Python",
      score: 85,
      level: "Advanced",
      description: "Strong Python programming and problem-solving skills.",
    },
  ];

  return (
    <div className="gap-page">
      <div className="gap-header">
        <div>
          <h1>Competency Gap Analysis</h1>
          <p>
            Identify your skill gaps and improve your learning performance.
          </p>
        </div>
      </div>

      <div className="gap-summary">
        <div className="summary-card">
          <h3>Overall Competency</h3>
          <h2>66%</h2>
          <span>Good Progress</span>
        </div>

        <div className="summary-card">
          <h3>Skills Assessed</h3>
          <h2>4</h2>
          <span>Core Skills</span>
        </div>

        <div className="summary-card">
          <h3>Major Gap</h3>
          <h2>Data Analysis</h2>
          <span>45% competency</span>
        </div>
      </div>

      <div className="skills-section">
        <div className="section-title">
          <h2>Skill Assessment</h2>
          <p>Your current competency level in different skills</p>
        </div>

        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill.name}>
              <div className="skill-top">
                <div>
                  <h3>{skill.name}</h3>
                  <p>{skill.description}</p>
                </div>

                <div className="score">
                  {skill.score}%
                </div>
              </div>

              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${skill.score}%` }}
                ></div>
              </div>

              <div className="skill-bottom">
                <span>Competency Level</span>
                <strong>{skill.level}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendation-box">
        <div className="recommendation-icon">💡</div>

        <div>
          <h2>AI Learning Recommendation</h2>
          <p>
            Focus on <strong>Data Analysis</strong> and{" "}
            <strong>Statistical Methods</strong> first. Improving these skills
            will help you build a stronger foundation for advanced analytics.
          </p>

          <button>View Recommended Training</button>
        </div>
      </div>
    </div>
  );
}

export default CompetencyGap;