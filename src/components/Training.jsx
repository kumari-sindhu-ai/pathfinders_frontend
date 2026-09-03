import React from "react";
import "./Training.css";

function Training() {
  const courses = [
    {
      title: "Python for Data Analysis",
      category: "Programming",
      progress: 75,
      level: "Intermediate",
      duration: "6 Weeks",
    },
    {
      title: "Statistical Methods",
      category: "Statistics",
      progress: 60,
      level: "Intermediate",
      duration: "4 Weeks",
    },
    {
      title: "Data Visualization",
      category: "Data Science",
      progress: 85,
      level: "Beginner",
      duration: "3 Weeks",
    },
    {
      title: "Machine Learning Basics",
      category: "Machine Learning",
      progress: 40,
      level: "Beginner",
      duration: "8 Weeks",
    },
  ];

  return (
    <main className="training-page">

      <div className="training-header">
        <div>
          <h1>Training</h1>
          <p>Improve your skills with personalized learning paths.</p>
        </div>

        <button className="browse-btn">
          Browse Courses
        </button>
      </div>

      <section className="training-stats">
        <div className="training-stat-card">
          <span>📚</span>
          <div>
            <h3>4</h3>
            <p>Active Courses</p>
          </div>
        </div>

        <div className="training-stat-card">
          <span>📈</span>
          <div>
            <h3>65%</h3>
            <p>Average Progress</p>
          </div>
        </div>

        <div className="training-stat-card">
          <span>🏆</span>
          <div>
            <h3>2</h3>
            <p>Completed</p>
          </div>
        </div>
      </section>

      <section className="courses-section">
        <div className="section-title">
          <h2>My Training Courses</h2>
          <span>View All</span>
        </div>

        <div className="course-grid">
          {courses.map((course, index) => (
            <div className="course-card" key={index}>

              <div className="course-icon">
                🎓
              </div>

              <div className="course-info">
                <span className="course-category">
                  {course.category}
                </span>

                <h3>{course.title}</h3>

                <div className="course-details">
                  <span>📊 {course.level}</span>
                  <span>⏱ {course.duration}</span>
                </div>

                <div className="progress-info">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                <button className="continue-btn">
                  Continue Learning
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      <section className="recommended-training">
        <h2>🤖 AI Recommended Training</h2>

        <div className="recommendation">
          <div>
            <h3>Advanced Statistical Methods</h3>
            <p>
              Recommended based on your competency gap in
              Statistical Methods.
            </p>
          </div>

          <button>Start Training</button>
        </div>
      </section>

    </main>
  );
}

export default Training;