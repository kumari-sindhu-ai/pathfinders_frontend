import React, { useEffect, useState } from "react";
import "./CompetencyGap.css";
import api from "../services/api";

function CompetencyGap() {
  const [competencies, setCompetencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     LOAD COMPETENCY DATA
     ===================================================== */

  useEffect(() => {
    const loadCompetencyData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/competency/gaps/");

        setCompetencies(
          Array.isArray(response.data?.gaps)
            ? response.data.gaps
            : []
        );
      } catch (err) {
        console.error(
          "Failed to load competency gaps:",
          err
        );

        setError(
          err.response?.data?.detail ||
          err.response?.data?.error ||
          "Failed to load competency data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCompetencyData();
  }, []);


  /* =====================================================
     CONVERT COMPETENCY LEVEL INTO PERCENTAGE
     ===================================================== */

  const getCompetencyPercentage = (
    currentLevel,
    requiredLevel
  ) => {
    const current = Number(currentLevel || 0);
    const required = Number(requiredLevel || 0);

    if (required <= 0) {
      return 0;
    }

    return Math.min(
      Math.round((current / required) * 100),
      100
    );
  };


  /* =====================================================
     COMPETENCY LEVEL LABEL
     ===================================================== */

  const getLevelLabel = (currentLevel) => {
    const level = Number(currentLevel || 0);

    if (level >= 4) {
      return "Advanced";
    }

    if (level >= 3) {
      return "Good";
    }

    if (level >= 2) {
      return "Intermediate";
    }

    if (level >= 1) {
      return "Needs Improvement";
    }

    return "Not Assessed";
  };


  /* =====================================================
     DESCRIPTION
     ===================================================== */

  const getDescription = (
    currentLevel,
    requiredLevel,
    gap
  ) => {
    const current = Number(currentLevel || 0);
    const required = Number(requiredLevel || 0);
    const competencyGap = Number(gap || 0);

    if (current === 0) {
      return "This competency has not been assessed yet.";
    }

    if (competencyGap === 0) {
      return "You have reached the required competency level.";
    }

    return `Current level ${current} of ${required}. You need ${competencyGap} more level${
      competencyGap === 1 ? "" : "s"
    } to reach the required level.`;
  };


  /* =====================================================
     PREPARE SKILLS
     ===================================================== */

  const skills = competencies.map((item, index) => {
    const currentLevel =
      Number(item.current_level || 0);

    const requiredLevel =
      Number(item.required_level || 0);

    const gap =
      Number(item.gap || 0);

    return {
      name: item.competency,
      score: getCompetencyPercentage(
        currentLevel,
        requiredLevel
      ),
      level: getLevelLabel(currentLevel),
      description: getDescription(
        currentLevel,
        requiredLevel,
        gap
      ),
      currentLevel,
      requiredLevel,
      gap,
      index,
    };
  });


  /* =====================================================
     OVERALL COMPETENCY
     ===================================================== */

  const overallCompetency =
    skills.length > 0
      ? Math.round(
          skills.reduce(
            (total, skill) =>
              total + skill.score,
            0
          ) / skills.length
        )
      : 0;


  /* =====================================================
     MAJOR GAP
     ===================================================== */

  const majorGap =
    skills.length > 0
      ? skills.reduce(
          (largest, current) =>
            current.gap > largest.gap
              ? current
              : largest,
          skills[0]
        )
      : null;


  /* =====================================================
     LOADING STATE
     ===================================================== */

  if (loading) {
    return (
      <div className="gap-page">
        <div className="gap-loading">
          Loading competency data...
        </div>
      </div>
    );
  }


  /* =====================================================
     PAGE
     ===================================================== */

  return (
    <div className="gap-page">

      {/* HEADER */}

      <div className="gap-header">

        <div>

          <h1>
            Competency Gap Analysis
          </h1>

          <p>
            Identify your skill gaps and improve
            your learning performance.
          </p>

        </div>

      </div>


      {/* ERROR */}

      {error && (
        <div className="gap-error">
          {error}
        </div>
      )}


      {/* SUMMARY */}

      <div className="gap-summary">

        {/* OVERALL COMPETENCY */}

        <div className="summary-card">

          <h3>
            Overall Competency
          </h3>

          <h2>
            {overallCompetency}%
          </h2>

          <span>
            {overallCompetency >= 75
              ? "Strong Progress"
              : overallCompetency >= 50
              ? "Good Progress"
              : "Needs Improvement"}
          </span>

        </div>


        {/* SKILLS ASSESSED */}

        <div className="summary-card">

          <h3>
            Skills Assessed
          </h3>

          <h2>
            {skills.length}
          </h2>

          <span>
            Core Competencies
          </span>

        </div>


        {/* MAJOR GAP */}

        <div className="summary-card">

          <h3>
            Major Gap
          </h3>

          <h2>
            {majorGap
              ? majorGap.name
              : "—"}
          </h2>

          <span>
            {majorGap
              ? `${majorGap.gap} level${
                  majorGap.gap === 1
                    ? ""
                    : "s"
                } below required`
              : "No competency gaps available"}
          </span>

        </div>

      </div>


      {/* SKILLS */}

      <div className="skills-section">

        <div className="section-title">

          <h2>
            Skill Assessment
          </h2>

          <p>
            Your current competency level in
            different skills
          </p>

        </div>


        {skills.length === 0 ? (

          <div className="gap-empty">

            <h3>
              No competency data available
            </h3>

            <p>
              Complete an assessment to start
              tracking your competency levels.
            </p>

          </div>

        ) : (

          <div className="skills-grid">

            {skills.map((skill) => (

              <div
                className="skill-card"
                key={`${skill.name}-${skill.index}`}
              >

                <div className="skill-top">

                  <div>

                    <h3>
                      {skill.name}
                    </h3>

                    <p>
                      {skill.description}
                    </p>

                  </div>


                  <div className="score">
                    {skill.score}%
                  </div>

                </div>


                {/* PROGRESS BAR */}

                <div className="progress-container">

                  <div
                    className="progress-bar"
                    style={{
                      width: `${skill.score}%`,
                    }}
                  ></div>

                </div>


                {/* BOTTOM INFO */}

                <div className="skill-bottom">

                  <span>
                    Competency Level
                  </span>

                  <strong>
                    {skill.level}
                  </strong>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* RECOMMENDATION */}

      <div className="recommendation-box">

        <div className="recommendation-icon">
          💡
        </div>


        <div>

          <h2>
            Learning Recommendation
          </h2>


          {majorGap ? (

            <p>
              Focus on{" "}
              <strong>
                {majorGap.name}
              </strong>{" "}
              first. Your current level is{" "}
              <strong>
                {majorGap.currentLevel}
              </strong>
              , while the required level is{" "}
              <strong>
                {majorGap.requiredLevel}
              </strong>
              . Improving this competency can
              help reduce your largest current
              skill gap.
            </p>

          ) : (

            <p>
              Complete an assessment to receive
              personalized competency-gap
              information.
            </p>

          )}


          <button
            onClick={() => {
              window.location.href =
                "/training";
            }}
          >
            View Recommended Training
          </button>

        </div>

      </div>

    </div>
  );
}

export default CompetencyGap;