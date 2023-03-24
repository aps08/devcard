import { Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "./store/auth-context";
import Home from "./pages/home/Home";
import Demo from "./pages/demo/Demo";
import Dashboard from "./pages/dashboard/Dashboard";
import Notfound from "./pages/notfound/Notfound";
import About from "./pages/about/About";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/signin/Signin";
import "./App.css";

function App() {
  const IsLoggedin = false;
  return (
    <AuthContext.Provider
      value={{
        IsLoggedin: IsLoggedin
      }}>
      <Routes>
        <Route path="/home" element={<Home />} />
        {!IsLoggedin && <Route path="/demo" element={<Demo />} />}
        <Route path="/About" element={<About />} />
        {!IsLoggedin && <Route path="/SignUp" element={<Signup />} />}
        {!IsLoggedin && <Route path="/Signin" element={<Signin />} />}
        {IsLoggedin && <Route path="/dashboard" element={<Dashboard />} />}
        <Route path="/register" element={<Navigate to="/signup" replace />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
