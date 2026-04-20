import { NavLink } from "react-router-dom";
import { FaMoon, FaSun, FaCalendarAlt } from "react-icons/fa";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { state, dispatch } = useApp();

  return (
    <header className="site-header">
      <div className="brand-block">
        <span className="brand-mark"><FaCalendarAlt /></span>
        <div>
          <p className="eyebrow">School Activities</p>
          <h1 className="brand-title">CampusEvents</h1>
        </div>
      </div>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>

      <div className="nav-actions">
        {state.user ? (
          <span className="user-pill">{state.user.name}</span>
        ) : (
          <span className="user-pill user-pill-muted">Guest</span>
        )}

        <button
          className="secondary-button"
          onClick={() => dispatch({ type: "TOGGLE_DARK" })}
          type="button"
          title={state.darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {state.darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {state.user && (
          <button
            className="ghost-button"
            onClick={() => dispatch({ type: "LOGOUT" })}
            type="button"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
