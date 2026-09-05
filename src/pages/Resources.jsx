import React from "react";
import { useNavigate } from "react-router-dom";
import "./Resources.css";

const Resources = () => {
  const navigate = useNavigate();

  const resources = [
    {
      icon: "📘",
      title: "React Basics",
      description:
        "Learn React fundamentals, components, props, state and hooks.",
      type: "Course",
      level: "Beginner",
      duration: "4 Hours",
    },
    {
      icon: "💻",
      title: "JavaScript",
      description:
        "Master JavaScript concepts, syntax, functions and modern ES6 features.",
      type: "Course",
      level: "Intermediate",
      duration: "6 Hours",
    },
    {
      icon: "🗄️",
      title: "DBMS",
      description:
        "Learn database management systems, SQL, normalization and queries.",
      type: "Course",
      level: "Intermediate",
      duration: "5 Hours",
    },
    {
      icon: "🐍",
      title: "Python Programming",
      description:
        "Learn Python programming, data types, functions and object-oriented concepts.",
      type: "Course",
      level: "Beginner",
      duration: "7 Hours",
    },
    {
      icon: "📊",
      title: "Data Analysis",
      description:
        "Explore data analysis techniques, data visualization and interpretation.",
      type: "Course",
      level: "Intermediate",
      duration: "5 Hours",
    },
    {
      icon: "🤖",
      title: "Machine Learning",
      description:
        "Understand machine learning fundamentals, algorithms and model evaluation.",
      type: "Course",
      level: "Advanced",
      duration: "8 Hours",
    },
  ];

  return (
    <div className="resources-page">
      {/* Header */}
      <div className="resources-header">
        <div>
          <span className="resources-label">LEARNING RESOURCES</span>

          <h1>Learning Resources 📚</h1>

          <p>
            Explore courses and resources to improve your skills and
            close your competency gaps.
          </p>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      {/* Search / Filter */}
      <div className="resources-toolbar">
        <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search learning resources..."
          />
        </div>

        <select className="filter-select">
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Resources */}
      <section className="resources-section">
        <div className="section-title">
          <div>
            <span className="resources-label">EXPLORE</span>
            <h2>Recommended Resources</h2>
          </div>

          <span className="resource-count">
            {resources.length} Resources
          </span>
        </div>

        <div className="resources-grid">
          {resources.map((resource, index) => (
            <div className="resource-card" key={index}>
              {/* Top */}
              <div className="resource-top">
                <div className="resource-icon">
                  {resource.icon}
                </div>

                <span
                  className={`resource-level ${resource.level
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {resource.level}
                </span>
              </div>

              {/* Content */}
              <div className="resource-content">
                <span className="resource-type">
                  {resource.type}
                </span>

                <h3>{resource.title}</h3>

                <p>{resource.description}</p>
              </div>

              {/* Details */}
              <div className="resource-details">
                <span>⏱️ {resource.duration}</span>
                <span>📖 Self-paced</span>
              </div>

              {/* Button */}
              <button
                className="start-resource-btn"
                onClick={() =>
                  alert(`Starting ${resource.title}`)
                }
              >
                Start Learning →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Continue Learning */}
      <section className="continue-learning">
        <div className="continue-icon">🎯</div>

        <div className="continue-content">
          <span className="resources-label">
            CONTINUE YOUR JOURNEY
          </span>

          <h2>Keep Learning, Keep Growing!</h2>

          <p>
            Complete your recommended resources to improve your
            competency score.
          </p>
        </div>

        <button
          className="continue-btn"
          onClick={() => navigate("/my-progress")}
        >
          View My Progress →
        </button>
      </section>
    </div>
  );
};

export default Resources;