import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CompetencyGap from "./pages/CompetencyGap";
import Sidebar from " ./components/Sidebar";
import Training from "./pages/Training";

function Layout() {
  const location = useLocation();

  const showSidebar = location.pathname !== "/login";

  return (
    <>
      {showSidebar && <Sidebar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/competency-gap"
          element={<CompetencyGap />}
        />

        <Route
          path="/training"
          element={<Training />}
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