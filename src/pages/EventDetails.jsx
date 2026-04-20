import { Link, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function EventDetails() {
  const { id } = useParams();
  const { state } = useApp();
  const event = state.events.find((item) => String(item.id) === id);

  if (!event) {
    return (
      <section className="detail-card page-enter">
        <h2>Event not found</h2>
        <p>This event may have been removed from the list.</p>
        <Link className="primary-button link-button" to="/events">
          Back to Events
        </Link>
      </section>
    );
  }

  return (
    <section className="detail-card page-enter">
      <div className="badge-row">
        <span className="badge badge-category">{event.category}</span>
        <span className={`badge ${event.completed ? "badge-done" : "badge-active"}`}>
          {event.completed ? "Done" : "Open"}
        </span>
      </div>

      <h2>{event.title}</h2>
      <p className="detail-copy">{event.body}</p>

      <div className="detail-grid">
        <article>
          <span>Event ID</span>
          <strong>{event.id}</strong>
        </article>
        <article>
          <span>Venue</span>
          <strong>{event.location}</strong>
        </article>
        <article>
          <span>Schedule</span>
          <strong>{event.schedule}</strong>
        </article>
      </div>

      <Link className="secondary-button link-button" to="/events">
        Back to List
      </Link>
    </section>
  );
}
