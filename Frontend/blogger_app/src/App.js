
import './App.css';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
function App() {
  const user=localStorage.getItem("Name");
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile" element={<Profile/>}/>

    </Routes>
    </Router>
    
  )
  }

export default App;
