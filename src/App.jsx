```jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CompetencyGap from "./pages/CompetencyGap";
import Training from "./pages/Training";
import Quizzes from "./pages/Quizzes";
import Progress from "./pages/Progress";
import Resources from "./pages/Resources";
import Sidebar from "./components/Sidebar";

function Layout() {
  const location = useLocation();

  // Login page par sidebar nahi dikhega
  const showSidebar = location.pathname !== "/login";

  return (
    <>
      {showSidebar && <Sidebar />}

      <Routes>
        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Competency Gap */}
        <Route
          path="/competency-gap"
          element={<CompetencyGap />}
        />

        {/* Training */}
        <Route
          path="/training"
          element={<Training />}
        />

        {/* Quizzes */}
        <Route
          path="/quizzes"
          element={<Quizzes />}
        />

        {/* Progress */}
        <Route
          path="/progress"
          element={<Progress />}
        />

        {/* Resources */}
        <Route
          path="/resources"
          element={<Resources />}
        />

        {/* Invalid URL */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
```
