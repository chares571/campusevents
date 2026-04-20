import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-shell">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>© 2026 CampusEvents. All rights reserved.</p>
      </footer>
    </div>
  );
}
