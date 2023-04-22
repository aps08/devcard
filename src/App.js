import { Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "./store/auth-context";
import Home from "./pages/home/Home";
import Demo from "./pages/demo/Demo";
import Dashboard from "./pages/dashboard/Dashboard";
import Notfound from "./pages/notfound/Notfound";
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./App.css";

function App() {
  const IsLoggedin = true;
  return (
    <AuthContext.Provider
      value={{
        IsLoggedin: IsLoggedin
      }}>
      <Header />
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          {!IsLoggedin && <Route path="/demo" element={<Demo />} />}
          <Route path="/About" element={<About />} />
          {IsLoggedin && <Route path="/dashboard" element={<Dashboard />} />}
          {IsLoggedin && <Route path="/profile/*" element={<Profile />} />}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
