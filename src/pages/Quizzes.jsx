import React from "react";
import "./Quizzes.css";

function Quizzes() {
  const quizzes = [
    {
      icon: "🐍",
      title: "Python Programming",
      description: "Test your knowledge of Python basics and programming concepts.",
      questions: 20,
      difficulty: "Easy",
      score: "85%",
    },
    {
      icon: "📊",
      title: "Data Analysis",
      description: "Assess your understanding of data analysis and interpretation.",
      questions: 25,
      difficulty: "Medium",
      score: "78%",
    },
    {
      icon: "📈",
      title: "Statistical Methods",
      description: "Practice statistics, probability and statistical methods.",
      questions: 20,
      difficulty: "Medium",
      score: "86%",
    },
    {
      icon: "💻",
      title: "JavaScript",
      description: "Test your JavaScript fundamentals, functions and concepts.",
      questions: 25,
      difficulty: "Easy",
      score: "90%",
    },
    {
      icon: "🗄️",
      title: "DBMS",
      description: "Check your knowledge of databases, SQL and normalization.",
      questions: 20,
      difficulty: "Medium",
      score: "82%",
    },
    {
      icon: "🤖",
      title: "Machine Learning",
      description: "Challenge yourself with machine learning fundamentals.",
      questions: 30,
      difficulty: "Hard",
      score: "65%",
    },
  ];

  return (
    <div className="quizzes-page">

      {/* HEADER */}
      <div className="quizzes-header">

        <div>
          <span className="quiz-label">
            ASSESS YOUR KNOWLEDGE
          </span>

          <h1>Quizzes 📝</h1>

          <p>
            Test your knowledge and track your learning progress.
          </p>
        </div>

        <div className="quiz-summary">
          <div>
            <strong>12</strong>
            <span>Completed</span>
          </div>

          <div>
            <strong>86%</strong>
            <span>Average Score</span>
          </div>
        </div>

      </div>


      {/* QUIZ CARDS */}
      <section className="quiz-grid">

        {quizzes.map((quiz, index) => (
          <div className="quiz-card" key={index}>

            <div className="quiz-card-top">

              <div className="quiz-card-icon">
                {quiz.icon}
              </div>

              <span
                className={`difficulty ${quiz.difficulty.toLowerCase()}`}
              >
                {quiz.difficulty}
              </span>

            </div>


            <h2>{quiz.title}</h2>

            <p className="quiz-description">
              {quiz.description}
            </p>


            <div className="quiz-details">

              <span>
                📝 {quiz.questions} Questions
              </span>

              <span>
                🏆 Best: {quiz.score}
              </span>

            </div>


            <button
              className="start-quiz-btn"
              onClick={() => alert(`Starting ${quiz.title} Quiz`)}
            >
              Start Quiz →
            </button>

          </div>
        ))}

      </section>


      {/* RECENT RESULT */}
      <section className="recent-result">

        <div className="result-icon">
          🏆
        </div>

        <div className="result-info">

          <span className="quiz-label">
            LATEST RESULT
          </span>

          <h2>Statistical Methods</h2>

          <p>
            You completed 20 questions today.
          </p>

        </div>

        <div className="result-score">
          <strong>86%</strong>
          <span>Score</span>
        </div>

      </section>

    </div>
  );
}

export default Quizzes;