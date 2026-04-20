import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Home() {
  const { state } = useApp();

  return (
    <section className="page-grid page-enter">
      <div className="hero-card">
        <p className="eyebrow">Campus Event System</p>
        <h2 className="hero-title">Plan and manage school events in one place.</h2>
        <p className="hero-copy">
          Check upcoming activities, open event details, and manage event records through one dashboard.
        </p>

        <div className="hero-actions">
          <Link className="primary-button" to="/events">
            View Events
          </Link>
          <Link className="secondary-button link-button" to="/dashboard">
            Go to Dashboard
          </Link>
        </div>
      </div>

      <div className="stats-card">
        <p className="eyebrow">Overview</p>
        <div className="stat-list">
          <article>
            <strong>{state.events.length}</strong>
            <span>Events</span>
          </article>
          <article>
            <strong>{state.categories.length - 1}</strong>
            <span>Types</span>
          </article>
          <article>
            <strong>{state.lastUpdated || "--:--"}</strong>
            <span>Last Update</span>
          </article>
        </div>
      </div>

      <div className="feature-panel">
        <article className="feature-card accent-green">
          <h3>Intuitive Navigation</h3>
          <p>Browse events, view details, and manage activities through a clean, organized interface designed for students.</p>
        </article>
        <article className="feature-card accent-yellow">
          <h3>Smart Discovery</h3>
          <p>Filter by category, search events, and enjoy dark mode for comfortable browsing anytime, anywhere on campus.</p>
        </article>
        <article className="feature-card accent-red">
          <h3>Full Management</h3>
          <p>Create, track, and update events with complete control over campus activities and event status.</p>
        </article>
      </div>
    </section>
  );
}
