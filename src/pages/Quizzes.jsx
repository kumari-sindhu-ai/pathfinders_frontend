import React, { useEffect, useState } from "react";
import "./Quizzes.css";
import api from "../services/api";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizLoading, setQuizLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);


  /* =====================================================
     LOAD QUIZZES + PREVIOUS ATTEMPTS
     ===================================================== */

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          quizzesResponse,
          attemptsResponse,
        ] = await Promise.all([
          api.get("/assessment/"),
          api.get("/assessment/attempts/"),
        ]);

        setQuizzes(
          Array.isArray(quizzesResponse.data)
            ? quizzesResponse.data
            : []
        );

        setAttempts(
          Array.isArray(attemptsResponse.data)
            ? attemptsResponse.data
            : []
        );

      } catch (err) {
        console.error("Failed to load quiz data:", err);

        setError(
          err.response?.data?.detail ||
          err.response?.data?.error ||
          "Failed to load quizzes. Please try again."
        );

      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, []);


  /* =====================================================
     SUMMARY DATA
     ===================================================== */

  const completedCount = attempts.length;

  const averageScore =
    attempts.length > 0
      ? Math.round(
          attempts.reduce(
            (total, attempt) =>
              total + Number(attempt.score || 0),
            0
          ) / attempts.length
        )
      : null;


  /* =====================================================
     GET BEST SCORE FOR A QUIZ
     ===================================================== */

  const getBestScore = (quizId) => {
    const quizAttempts = attempts.filter(
      (attempt) =>
        Number(attempt.assessment) === Number(quizId)
    );

    if (quizAttempts.length === 0) {
      return null;
    }

    return Math.max(
      ...quizAttempts.map(
        (attempt) => Number(attempt.score || 0)
      )
    );
  };


  /* =====================================================
     START QUIZ
     ===================================================== */

  const handleStartQuiz = async (quizId) => {
    try {
      setQuizLoading(true);
      setError("");
      setResult(null);
      setSelectedAnswers({});

      const response = await api.get(
        `/assessment/${quizId}/`
      );

      setSelectedQuiz(response.data);

    } catch (err) {
      console.error("Failed to load quiz:", err);

      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Failed to load this quiz. Please try again."
      );

    } finally {
      setQuizLoading(false);
    }
  };


  /* =====================================================
     SELECT ANSWER
     ===================================================== */

  const handleAnswerSelect = (
    questionId,
    answer
  ) => {
    setSelectedAnswers((previous) => ({
      ...previous,
      [questionId]: answer,
    }));
  };


  /* =====================================================
     SUBMIT QUIZ
     ===================================================== */

  const handleSubmitQuiz = async () => {
    if (!selectedQuiz) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await api.post(
        "/assessment/attempts/submit/",
        {
          assessment: selectedQuiz.id,
          answers: selectedAnswers,
        }
      );

      setResult(response.data);

      /* Refresh attempts so summary/best scores update */
      const attemptsResponse = await api.get(
        "/assessment/attempts/"
      );

      setAttempts(
        Array.isArray(attemptsResponse.data)
          ? attemptsResponse.data
          : []
      );

    } catch (err) {
      console.error("Failed to submit quiz:", err);

      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Failed to submit quiz. Please try again."
      );

    } finally {
      setSubmitting(false);
    }
  };


  /* =====================================================
     CLOSE QUIZ
     ===================================================== */

  const handleCloseQuiz = () => {
    setSelectedQuiz(null);
    setSelectedAnswers({});
    setResult(null);
    setError("");
  };


  /* =====================================================
     LATEST ATTEMPT
     ===================================================== */

  const latestAttempt =
    attempts.length > 0
      ? attempts[0]
      : null;


  /* =====================================================
     LOADING STATE
     ===================================================== */

  if (loading) {
    return (
      <div className="quizzes-page">
        <div className="quiz-loading">
          Loading quizzes...
        </div>
      </div>
    );
  }


  /* =====================================================
     MAIN PAGE
     ===================================================== */

  return (
    <div className="quizzes-page">

      {/* HEADER */}

      <div className="quizzes-header">

        <div>

          <span className="quiz-label">
            ASSESS YOUR KNOWLEDGE
          </span>

          <h1>
            Quizzes 📝
          </h1>

          <p>
            Test your knowledge and track your
            learning progress.
          </p>

        </div>


        <div className="quiz-summary">

          <div>
            <strong>
              {completedCount}
            </strong>

            <span>
              Completed
            </span>
          </div>


          <div>
            <strong>
              {averageScore !== null
                ? `${averageScore}%`
                : "—"}
            </strong>

            <span>
              Average Score
            </span>
          </div>

        </div>

      </div>


      {/* ERROR */}

      {error && (
        <div className="quiz-error">
          {error}
        </div>
      )}


      {/* QUIZ CARDS */}

      <section className="quiz-grid">

        {quizzes.length === 0 ? (

          <div className="quiz-empty">
            <h2>
              No quizzes available
            </h2>

            <p>
              There are no assessments available
              for you yet.
            </p>
          </div>

        ) : (

          quizzes.map((quiz) => {

            const bestScore =
              getBestScore(quiz.id);

            return (
              <div
                className="quiz-card"
                key={quiz.id}
              >

                <div className="quiz-card-top">

                  <div className="quiz-card-icon">
                    📝
                  </div>


                  <span className="difficulty assessment">
                    Assessment
                  </span>

                </div>


                <h2>
                  {quiz.title}
                </h2>


                <p className="quiz-description">

                  {quiz.competency_name
                    ? `Test your knowledge of ${quiz.competency_name}.`
                    : "Test your knowledge and understanding of this competency."}

                </p>


                <div className="quiz-details">

                  <span>
                    📝 {quiz.question_count || 0} Questions
                  </span>


                  <span>
                    🏆 Best:{" "}
                    {bestScore !== null
                      ? `${bestScore}%`
                      : "Not attempted"}
                  </span>

                </div>


                <button
                  className="start-quiz-btn"
                  onClick={() =>
                    handleStartQuiz(quiz.id)
                  }
                  disabled={quizLoading}
                >
                  {quizLoading
                    ? "Loading..."
                    : "Start Quiz →"}
                </button>

              </div>
            );

          })

        )}

      </section>


      {/* LATEST RESULT */}

      {latestAttempt && (

        <section className="recent-result">

          <div className="result-icon">
            🏆
          </div>


          <div className="result-info">

            <span className="quiz-label">
              LATEST RESULT
            </span>

            <h2>
              {latestAttempt.assessment_title}
            </h2>

            <p>
              Your latest assessment result.
            </p>

          </div>


          <div className="result-score">

            <strong>
              {latestAttempt.score}%
            </strong>

            <span>
              Score
            </span>

          </div>

        </section>

      )}


      {/* =================================================
          QUIZ WINDOW
          ================================================= */}

      {selectedQuiz && (

        <div className="quiz-overlay">

          <div className="quiz-modal">

            <div className="quiz-modal-header">

              <div>

                <span className="quiz-label">
                  ASSESSMENT
                </span>

                <h2>
                  {selectedQuiz.title}
                </h2>

                {selectedQuiz.competency_name && (
                  <p>
                    Competency:{" "}
                    {selectedQuiz.competency_name}
                  </p>
                )}

              </div>


              <button
                className="close-quiz-btn"
                onClick={handleCloseQuiz}
              >
                ✕
              </button>

            </div>


            {/* RESULT */}

            {result ? (

              <div className="quiz-result">

                <div className="result-icon">
                  🏆
                </div>

                <h2>
                  Quiz Completed!
                </h2>

                <div className="final-score">
                  {result.score}%
                </div>

                <p>
                  You answered{" "}
                  <strong>
                    {result.correct_answers}
                  </strong>{" "}
                  out of{" "}
                  <strong>
                    {result.total_questions}
                  </strong>{" "}
                  questions correctly.
                </p>

                <div className="result-details">

                  <div>
                    <span>
                      Competency Level
                    </span>

                    <strong>
                      {result.competency_level}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Competency Gap
                    </span>

                    <strong>
                      {result.competency_gap}
                    </strong>
                  </div>

                </div>


                <button
                  className="start-quiz-btn"
                  onClick={handleCloseQuiz}
                >
                  Back to Quizzes
                </button>

              </div>

            ) : (

              <>
                {/* QUESTIONS */}

                <div className="quiz-questions">

                  {selectedQuiz.questions?.map(
                    (question, index) => (

                      <div
                        className="quiz-question"
                        key={question.id}
                      >

                        <h3>
                          {index + 1}.{" "}
                          {question.question}
                        </h3>


                        <div className="answer-options">

                          {[
                            ["A", question.option_a],
                            ["B", question.option_b],
                            ["C", question.option_c],
                            ["D", question.option_d],
                          ].map(
                            ([letter, text]) => (

                              <button
                                key={letter}
                                type="button"
                                className={
                                  selectedAnswers[
                                    question.id
                                  ] === letter
                                    ? "answer-option selected"
                                    : "answer-option"
                                }
                                onClick={() =>
                                  handleAnswerSelect(
                                    question.id,
                                    letter
                                  )
                                }
                              >

                                <span className="answer-letter">
                                  {letter}
                                </span>

                                <span>
                                  {text}
                                </span>

                              </button>

                            )
                          )}

                        </div>

                      </div>

                    )
                  )}

                </div>


                {/* SUBMIT */}

                <div className="quiz-modal-footer">

                  <button
                    className="cancel-quiz-btn"
                    onClick={handleCloseQuiz}
                  >
                    Cancel
                  </button>


                  <button
                    className="start-quiz-btn"
                    onClick={handleSubmitQuiz}
                    disabled={submitting}
                  >
                    {submitting
                      ? "Submitting..."
                      : "Submit Quiz"}
                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default Quizzes;