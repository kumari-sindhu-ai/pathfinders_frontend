import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Resources.css"

function Resources() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/courses/");

        setCourses(
          Array.isArray(response.data)
            ? response.data
            : []
        );
      } catch (err) {
        console.error(
          "Failed to load learning resources:",
          err
        );

        setError(
          err.response?.data?.detail ||
          err.response?.data?.error ||
          "Failed to load learning resources."
        );
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const getResourceIcon = (course) => {
    const title = course.title?.toLowerCase() || "";

    if (
      title.includes("database") ||
      title.includes("dbms")
    ) {
      return "🗄️";
    }

    if (
      title.includes("python") ||
      title.includes("programming") ||
      title.includes("coding")
    ) {
      return "💻";
    }

    if (
      title.includes("web") ||
      title.includes("react") ||
      title.includes("javascript")
    ) {
      return "📘";
    }

    return "📚";
  };

  const handleStartLearning = (course) => {
    if (course.external_url) {
      window.open(
        course.external_url,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <div className="learning-resources">

      <div className="card-header">

        <div>
          <span className="card-label">
            LEARNING RESOURCES
          </span>

          <h2>
            Continue Learning
          </h2>

          <p className="card-description">
            Explore resources to improve your skills
          </p>
        </div>

        <button
          className="view-btn"
          onClick={() => {
            window.location.href = "/training";
          }}
        >
          View All
        </button>

      </div>

      {loading && (
        <div className="resource-status">
          Loading learning resources...
        </div>
      )}

      {!loading && error && (
        <div className="resource-status resource-error">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        courses.length === 0 && (
          <div className="resource-status">
            No learning resources are available yet.
          </div>
        )}

      {!loading &&
        !error &&
        courses.length > 0 && (
          <div className="resources-list">

            {courses.slice(0, 3).map((course) => (
              <div
                className="resource-card"
                key={course.id}
              >

                <div className="resource-icon">
                  {getResourceIcon(course)}
                </div>

                <div className="resource-info">

                  <h3>
                    {course.title}
                  </h3>

                  <p>
                    {course.description ||
                      "Explore this course to improve your skills."}
                  </p>

                  <button
                    className="start-btn"
                    onClick={() =>
                      handleStartLearning(course)
                    }
                    disabled={!course.external_url}
                  >
                    {course.external_url
                      ? "Start Learning"
                      : "View Course"}
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

    </div>
  );
}

export default Resources;