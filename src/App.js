import './style/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from "./routes/home";
import LogIn from "./routes/LogIn";
import Register from "./routes/Register";
import Navigation from "./components/Navigation";
import Upload from "./routes/Upload";
import TaskManager from "./components/task/TaskManager";
import Chat from "./components/chat/Chat";
import {Account} from "./routes/Account";
import {Admin} from "./routes/Admin";

function App() {
  return (
      <Router>
        <div>
          <Navigation />
          <div className="auth-wrapper">
            <div>
              <Routes>
                  <Route exact path="/" element={<LogIn />} />
                  <Route exact path="/login" element={<LogIn />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/task" element={<TaskManager />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
  );
}

export default App;
