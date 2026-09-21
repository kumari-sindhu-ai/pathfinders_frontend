import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CompetencyGap from "./pages/CompetencyGap";
import Training from "./pages/Training";
import Quizzes from "./pages/Quizzes";
import Resources from "./pages/Resources";
import Progress from "./pages/MyProgress";


function AppLayout({ children }) {
  return (
    <div className="app-layout">

      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="app-main">

        {/* Navbar */}
        <Navbar />

        {/* Page */}
        <main className="app-page">
          {children}
        </main>

      </div>

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            PUBLIC
        ================================================== */}

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =================================================
            PROTECTED / AUTHENTICATED APP
        ================================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />

          <Route
            path="/competency-gap"
            element={
              <AppLayout>
                <CompetencyGap />
              </AppLayout>
            }
          />

          <Route
            path="/training"
            element={
              <AppLayout>
                <Training />
              </AppLayout>
            }
          />

          <Route
            path="/quizzes"
            element={
              <AppLayout>
                <Quizzes />
              </AppLayout>
            }
          />

          <Route
            path="/resources"
            element={
              <AppLayout>
                <Resources />
              </AppLayout>
            }
          />

          <Route
            path="/my-progress"
            element={
              <AppLayout>
                <Progress />
              </AppLayout>
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;