import './style/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from "./routes/home";
import SignIn from "./routes/SignIn";
import LogIn from "./routes/LogIn";

function App() {
  return (
      <Router>
        <div>
          <div className="auth-wrapper">
            <div>
              <Routes>
                  <Route exact path="/" element={<LogIn />} />
                  <Route exact path="/logIn" element={<LogIn />} />
                  <Route exact path="/signIn" element={<SignIn />} />
                  <Route path="/home" element={<Home />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
  );
}

export default App;
