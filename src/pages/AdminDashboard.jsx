import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      change: "+12%",
      icon: "👥",
    },
    {
      title: "Active Courses",
      value: "24",
      change: "+4%",
      icon: "📚",
    },
    {
      title: "Total Quizzes",
      value: "86",
      change: "+8%",
      icon: "📝",
    },
    {
      title: "Completion Rate",
      value: "78%",
      change: "+6%",
      icon: "📈",
    },
  ];

  const students = [
    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      course: "Web Development",
      progress: 85,
      status: "Active",
    },
    {
      name: "Priya Singh",
      email: "priya@example.com",
      course: "Database Management",
      progress: 72,
      status: "Active",
    },
    {
      name: "Aman Kumar",
      email: "aman@example.com",
      course: "Python Programming",
      progress: 58,
      status: "Active",
    },
    {
      name: "Neha Verma",
      email: "neha@example.com",
      course: "Machine Learning",
      progress: 91,
      status: "Completed",
    },
  ];

  const competencyData = [
    { subject: "Web Development", gap: 15 },
    { subject: "Database Management", gap: 25 },
    { subject: "Operating System", gap: 35 },
    { subject: "Computer Networks", gap: 10 },
    { subject: "Python", gap: 20 },
  ];

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Monitor students, courses and learning performance</p>
        </div>

        <button className="admin-btn">+ Add New Course</button>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-top">
              <div className="stat-icon">{stat.icon}</div>
              <span className="stat-change">{stat.change}</span>
            </div>

            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="admin-grid">
        {/* Student Performance */}
        <div className="admin-card student-card">
          <div className="card-heading">
            <div>
              <h2>Student Performance</h2>
              <p>Recent student progress</p>
            </div>

            <button className="view-btn">View All</button>
          </div>

          <div className="student-table">
            <div className="table-header">
              <span>Student</span>
              <span>Course</span>
              <span>Progress</span>
              <span>Status</span>
            </div>

            {students.map((student, index) => (
              <div className="table-row" key={index}>
                <div className="student-info">
                  <div className="avatar">
                    {student.name.charAt(0)}
                  </div>

                  <div>
                    <strong>{student.name}</strong>
                    <small>{student.email}</small>
                  </div>
                </div>

                <span className="course-name">{student.course}</span>

                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <span>{student.progress}%</span>
                </div>

                <span
                  className={`status ${
                    student.status === "Completed"
                      ? "completed"
                      : "active"
                  }`}
                >
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Competency Gap */}
        <div className="admin-card competency-card">
          <div className="card-heading">
            <div>
              <h2>Competency Gaps</h2>
              <p>Areas requiring attention</p>
            </div>
          </div>

          <div className="gap-list">
            {competencyData.map((item, index) => (
              <div className="gap-item" key={index}>
                <div className="gap-info">
                  <span>{item.subject}</span>
                  <strong>{item.gap}%</strong>
                </div>

                <div className="gap-bar">
                  <div
                    className={`gap-fill ${
                      item.gap >= 30
                        ? "high"
                        : item.gap >= 20
                        ? "medium"
                        : "low"
                    }`}
                    style={{ width: `${item.gap}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button className="full-btn">View Detailed Analysis</button>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="bottom-grid">
        <div className="admin-card">
          <div className="card-heading">
            <div>
              <h2>Course Overview</h2>
              <p>Current learning programs</p>
            </div>
          </div>

          <div className="course-overview">
            <div className="course-item">
              <span className="course-icon">💻</span>
              <div>
                <strong>Web Development</strong>
                <small>342 students enrolled</small>
              </div>
              <b>75%</b>
            </div>

            <div className="course-item">
              <span className="course-icon">🗄️</span>
              <div>
                <strong>Database Management</strong>
                <small>286 students enrolled</small>
              </div>
              <b>68%</b>
            </div>

            <div className="course-item">
              <span className="course-icon">🐍</span>
              <div>
                <strong>Python Programming</strong>
                <small>410 students enrolled</small>
              </div>
              <b>82%</b>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="card-heading">
            <div>
              <h2>Recent Activities</h2>
              <p>Latest platform activities</p>
            </div>
          </div>

          <div className="activities">
            <div className="activity">
              <span>👤</span>
              <div>
                <strong>New student registered</strong>
                <small>Rahul Sharma joined the platform</small>
              </div>
              <time>2m</time>
            </div>

            <div className="activity">
              <span>📝</span>
              <div>
                <strong>Quiz completed</strong>
                <small>Python Programming Quiz</small>
              </div>
              <time>15m</time>
            </div>

            <div className="activity">
              <span>🏆</span>
              <div>
                <strong>Course completed</strong>
                <small>Neha completed Machine Learning</small>
              </div>
              <time>1h</time>
            </div>

            <div className="activity">
              <span>📚</span>
              <div>
                <strong>New course added</strong>
                <small>Advanced React Development</small>
              </div>
              <time>3h</time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;