import './style/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from "./routes/home";
import LogIn from "./routes/LogIn";
import Register from "./routes/Register";

function App() {
  return (
      <Router>
        <div>
          <div className="auth-wrapper">
            <div>
              <Routes>
                  <Route exact path="/" element={<LogIn />} />
                  <Route exact path="/login" element={<LogIn />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route path="/home" element={<Home />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
  );
}

export default App;
