import { Link } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Events() {
  const { state, dispatch } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredEvents = state.events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.body.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="page-enter">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Event List</p>
          <h2>Upcoming school events</h2>
        </div>
        <div className="status-note">
          <span className="live-dot" />
          Auto update on
          <small>Updated {state.lastUpdated || "just now"}</small>
        </div>
      </div>

      <div className="toolbar-card">
        <label className="field">
          <span>Search</span>
          <input
            placeholder="Search event title or details"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {state.categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      {state.loading && <div className="message-card">Loading events...</div>}
      {state.error && <div className="message-card message-error">{state.error}</div>}

      {!state.loading && !state.error && (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <article className="event-card" key={event.id}>
              <div className="badge-row">
                <span className="badge badge-category">{event.category}</span>
                <span className={`badge ${event.completed ? "badge-done" : "badge-active"}`}>
                  {event.completed ? "Done" : "Open"}
                </span>
              </div>

              <h3>{event.title}</h3>
              <p>{event.body.slice(0, 120)}...</p>

              <div className="meta-list">
                <span>{event.location}</span>
                <span>{event.schedule}</span>
              </div>

              <div className="card-actions">
                <Link className="primary-button link-button" to={`/events/${event.id}`}>
                  Details
                </Link>
                <button
                  className="ghost-button"
                  onClick={() => dispatch({ type: "TOGGLE_STATUS", payload: event.id })}
                  type="button"
                >
                  Change Status
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {!state.loading && !state.error && filteredEvents.length === 0 && (
        <div className="message-card">No events found.</div>
      )}
    </section>
  );
}
