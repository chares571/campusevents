import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Login from "./pages/Login";
import "./App.css";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const EventDetails = lazy(() => import("./pages/EventDetails"));

function PageLoader() {
  return <div className="page-loader">Loading campus module...</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route
            path="events/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <EventDetails />
              </Suspense>
            }
          />
          <Route path="login" element={<Login />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <Dashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
