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
import Training from "./pages/Training"; 
import Sidebar from "./components/Sidebar"; 

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

        {/* Learning Resources */}
        <Route 
          path="/learning-resources" 
          element={
            <div className="learning-resources"> 
              <div className="card-header"> 
                <div> 
                  <span className="card-label">
                    LEARNING RESOURCES
                  </span> 
                  <h2>Continue Learning</h2> 
                  <p className="card-description"> 
                    Explore resources to improve your skills 
                  </p> 
                </div> 
                <button className="view-btn">View All</button> 
              </div> 

              <div className="resources-list"> 
                
                <div className="resource-card"> 
                  <div className="resource-icon">📘</div> 
                  <div className="resource-info"> 
                    <h3>React Basics</h3> 
                    <p>
                      Learn React fundamentals and components
                    </p> 
                    <button className="start-btn">
                      Start Learning
                    </button> 
                  </div> 
                </div> 

                <div className="resource-card"> 
                  <div className="resource-icon">💻</div> 
                  <div className="resource-info"> 
                    <h3>JavaScript</h3> 
                    <p>
                      Master JavaScript concepts and syntax
                    </p> 
                    <button className="start-btn">
                      Start Learning
                    </button> 
                  </div> 
                </div> 

                <div className="resource-card"> 
                  <div className="resource-icon">🗄️</div> 
                  <div className="resource-info"> 
                    <h3>DBMS</h3> 
                    <p>
                      Learn database management concepts
                    </p> 
                    <button className="start-btn">
                      Start Learning
                    </button> 
                  </div> 
                </div> 

              </div> 
            </div>
          } 
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