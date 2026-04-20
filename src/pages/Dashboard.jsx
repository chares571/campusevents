import { useState } from "react";
import { useApp } from "../context/AppContext";

const defaultForm = {
  title: "",
  body: "",
  category: "Seminar",
  location: "",
  schedule: "",
};

export default function Dashboard() {
  const { state, dispatch, addEvent } = useApp();
  const [form, setForm] = useState(defaultForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.body.trim()) {
      return;
    }

    addEvent({
      ...form,
      location: form.location || "Student Center",
      schedule: form.schedule || "April 23, 2026 • 2:00 PM",
    });

    setForm(defaultForm);
  }

  return (
    <section className="dashboard-layout page-enter">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>Welcome, {state.user?.name}</h2>
          <p className="hero-copy">Add campus events, update status, and remove old entries.</p>
        </div>
        <div className="status-note">
          <span className="live-dot" />
          {state.user?.role}
        </div>
      </div>

      <div className="dashboard-grid">
        <form className="panel-card" onSubmit={handleSubmit}>
          <h3>Add Event</h3>
          <label className="field">
            <span>Event Title</span>
            <input name="title" type="text" value={form.title} onChange={handleChange} />
          </label>
          <label className="field">
            <span>Description</span>
            <textarea name="body" rows="4" value={form.body} onChange={handleChange} />
          </label>
          <label className="field">
            <span>Category</span>
            <select name="category" value={form.category} onChange={handleChange}>
              {state.categoryOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Location</span>
            <input name="location" type="text" value={form.location} onChange={handleChange} />
          </label>
          <label className="field">
            <span>Schedule</span>
            <input name="schedule" type="text" value={form.schedule} onChange={handleChange} />
          </label>
          <button className="primary-button" type="submit">
            Add Event
          </button>
        </form>

        <div className="panel-card">
          <h3>Manage Events</h3>
          <div className="management-list">
            {state.events.slice(0, 6).map((event) => (
              <article className="management-item" key={event.id}>
                <div>
                  <strong>{event.title}</strong>
                  <p>{event.category}</p>
                </div>
                <div className="management-actions">
                  <button
                    className="ghost-button"
                    onClick={() => dispatch({ type: "TOGGLE_STATUS", payload: event.id })}
                    type="button"
                  >
                    {event.completed ? "Mark Open" : "Mark Done"}
                  </button>
                  <button
                    className="ghost-button ghost-danger"
                    onClick={() => dispatch({ type: "DELETE_EVENT", payload: event.id })}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
