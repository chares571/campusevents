import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { state, authenticate } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  if (state.user) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setValidationError("");

    // Validation
    if (!email.trim()) {
      setValidationError("Email is required");
      return;
    }

    if (!email.includes("@")) {
      setValidationError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setValidationError("Password is required");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    authenticate(email, password);
  }

  return (
    <section className="login-card page-enter">
      <p className="eyebrow">Login</p>
      <h2>Sign in to open the dashboard</h2>
      <p className="hero-copy">Use your credentials to access the event management dashboard.</p>

      <form onSubmit={handleSubmit} className="login-form">
        <label className="field">
          <span>Email Address</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@campus.edu"
            disabled={state.authLoading}
            autoComplete="email"
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={state.authLoading}
            autoComplete="current-password"
          />
        </label>

        {validationError && (
          <div className="error-message" style={{ color: "#d32f2f", marginBottom: "1rem" }}>
            {validationError}
          </div>
        )}

        {state.error && (
          <div className="error-message" style={{ color: "#d32f2f", marginBottom: "1rem" }}>
            {state.error}
          </div>
        )}

        <button
          className="primary-button"
          type="submit"
          disabled={state.authLoading}
        >
          {state.authLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="login-hint" style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f5f5f5", borderRadius: "0.5rem" }}>
        <p style={{ fontSize: "0.875rem", margin: "0 0 0.5rem 0", fontWeight: "600" }}>Demo Accounts:</p>
        <div style={{ fontSize: "0.75rem", lineHeight: "1.6" }}>
          <p style={{ margin: "0.25rem 0" }}><strong>officer@campus.edu</strong> / password123</p>
          <p style={{ margin: "0.25rem 0" }}><strong>admin@campus.edu</strong> / admin123</p>
          <p style={{ margin: "0.25rem 0" }}><strong>student@campus.edu</strong> / student123</p>
        </div>
      </div>
    </section>
  );
}
