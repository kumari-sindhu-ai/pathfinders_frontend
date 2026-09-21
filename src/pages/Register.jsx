import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  // =========================================================
  // FORM STATE
  // =========================================================

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // REGISTER
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ---------------------------------------------------------
    // FRONTEND VALIDATION
    // ---------------------------------------------------------

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      // -------------------------------------------------------
      // SEND REGISTRATION REQUEST TO DJANGO
      // -------------------------------------------------------

      await api.post("/auth/register/", {
        username: username.trim(),
        email: email.trim(),
        password: password,
      });

      // -------------------------------------------------------
      // REGISTRATION SUCCESSFUL
      // -------------------------------------------------------

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      // Registration endpoint does not return JWT tokens,
      // so the user should login after creating the account.
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      console.error("Registration failed:", err);

      // -------------------------------------------------------
      // DJANGO ERROR HANDLING
      // -------------------------------------------------------

      const data = err.response?.data;

      if (data) {
        if (data.username) {
          setError(
            Array.isArray(data.username)
              ? data.username[0]
              : data.username
          );
        } else if (data.email) {
          setError(
            Array.isArray(data.email)
              ? data.email[0]
              : data.email
          );
        } else if (data.password) {
          setError(
            Array.isArray(data.password)
              ? data.password[0]
              : data.password
          );
        } else if (data.detail) {
          setError(data.detail);
        } else {
          setError(
            "Unable to create your account. Please check your details."
          );
        }
      } else {
        setError(
          "Unable to connect to the server. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="login-page">

      {/* =====================================================
          LEFT SECTION
          ===================================================== */}

      <div className="login-left">

        {/* Brand */}

        <div className="brand">

          <div className="brand-icon">
            🎓
          </div>

          <div>

            <h2>
              Learn<span>AI</span>
            </h2>

            <p>
              Smart Learning Platform
            </p>

          </div>

        </div>


        {/* Hero */}

        <div className="hero-content">

          <h1>
            Start Learning.
            <br />
            Grow <span>Smarter.</span>
          </h1>

          <p className="hero-text">
            Create your LearnAI account and get personalized
            learning recommendations, competency insights and
            progress tracking.
          </p>

        </div>


        {/* Features */}

        <div className="features">

          <div className="feature">

            <div className="feature-icon">
              📊
            </div>

            <div>

              <h3>
                AI-Powered Insights
              </h3>

              <p>
                Identify your competency gaps and improve faster.
              </p>

            </div>

          </div>


          <div className="feature">

            <div className="feature-icon">
              📖
            </div>

            <div>

              <h3>
                Personalized Learning
              </h3>

              <p>
                Get recommended courses tailored to your learning needs.
              </p>

            </div>

          </div>


          <div className="feature">

            <div className="feature-icon">
              🎯
            </div>

            <div>

              <h3>
                Track Your Progress
              </h3>

              <p>
                Monitor your performance and achieve your learning goals.
              </p>

            </div>

          </div>

        </div>


        <div className="education-decoration">
          📚 🎓 🌱
        </div>

      </div>


      {/* =====================================================
          RIGHT SECTION
          ===================================================== */}

      <div className="login-right">

        <div className="login-card">

          {/* Icon */}

          <div className="lock-icon">
            ✨
          </div>


          <h1>
            Create Account 🚀
          </h1>


          <p className="login-subtitle">
            Create your account and start your learning journey
          </p>


          {/* =================================================
              ERROR
              ================================================= */}

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          {/* =================================================
              SUCCESS
              ================================================= */}

          {success && (
            <div
              className="login-success"
              style={{
                marginBottom: "20px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: "#ecfdf3",
                border: "1px solid #a7f3d0",
                color: "#047857",
                fontSize: "14px",
              }}
            >
              {success}
            </div>
          )}


          {/* =================================================
              FORM
              ================================================= */}

          <form onSubmit={handleSubmit}>

            {/* Username */}

            <div className="input-group">

              <label>
                Username
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  👤
                </span>

                <input
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {/* Email */}

            <div className="input-group">

              <label>
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉️
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {/* Password */}

            <div className="input-group">

              <label>
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  minLength={6}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>


            {/* Confirm Password */}

            <div className="input-group">

              <label>
                Confirm Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔐
                </span>

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  required
                  minLength={6}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>


            {/* Register Button */}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}

              {!loading && (
                <span>
                  →
                </span>
              )}
            </button>

          </form>


          {/* Divider */}

          <div className="divider">

            <span></span>

            <p>
              Already have an account?
            </p>

            <span></span>

          </div>


          {/* Login */}

          <p className="signup-text">

            Already registered?

            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;