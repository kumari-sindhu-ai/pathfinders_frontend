import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Send login request to Django
      const response = await api.post("/auth/login/", {
        username: username,
        password: password,
      });

      // Save JWT tokens
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Login successful
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);

      setError(
        err.response?.data?.detail ||
          "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Left Section */}
      <div className="login-left">

        <div className="brand">
          <div className="brand-icon">🎓</div>

          <div>
            <h2>
              Learn<span>AI</span>
            </h2>
            <p>Smart Learning Platform</p>
          </div>
        </div>

        <div className="hero-content">
          <h1>
            Learn Smarter.
            <br />
            Achieve <span>More.</span>
          </h1>

          <p className="hero-text">
            AI-powered learning recommendations, personalized training
            and real-time progress tracking to help you grow.
          </p>
        </div>

        {/* Features */}
        <div className="features">

          <div className="feature">
            <div className="feature-icon">📊</div>

            <div>
              <h3>AI-Powered Insights</h3>
              <p>Identify your competency gaps and improve faster.</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">📖</div>

            <div>
              <h3>Personalized Learning</h3>
              <p>Get AI recommended courses and resources tailored for you.</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">🎯</div>

            <div>
              <h3>Track Your Progress</h3>
              <p>Monitor your progress and achieve your learning goals.</p>
            </div>
          </div>

        </div>

        <div className="education-decoration">
          📚 🎓 🌱
        </div>

      </div>

      {/* Right Section */}
      <div className="login-right">

        <div className="login-card">

          <div className="lock-icon">
            🔐
          </div>

          <h1>Welcome Back! 👋</h1>

          <p className="login-subtitle">
            Login to your account and continue your learning journey
          </p>

          {/* Error Message */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div className="input-group">

              <label>Username</label>

              <div className="input-wrapper">
                <span className="input-icon">👤</span>

                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

            </div>

            {/* Password */}
            <div className="input-group">

              <label>Password</label>

              <div className="input-wrapper">
                <span className="input-icon">🔒</span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>

            {/* Options */}
            <div className="login-options">

              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-btn"
                onClick={() =>
                  alert("Password reset feature coming soon!")
                }
              >
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
              {!loading && <span>→</span>}
            </button>

          </form>

          {/* Divider */}
          <div className="divider">
            <span></span>
            <p>or continue with</p>
            <span></span>
          </div>

          {/* Signup */}
          <p className="signup-text">
            Don't have an account?

            <button
              type="button"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;