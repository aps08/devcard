import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthContext from "./store/auth-context";
import Home from "./pages/home/Home";
import Demo from "./pages/demo/Demo";
import Dashboard from "./pages/dashboard/Dashboard";
import Notfound from "./pages/notfound/Notfound";
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Personal from "./components/personalinfo/Personal";
import Professional from "./components/professional/Professional";
import Account from "./components/account/Account";
import Purchasehistory from "./components/purchasehistory/Purchasehistory";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import Verify from "./pages/verify/Verify";
import { checkLocalStorageKeys } from "./store/localstorageoperations";
import "./App.css";

function App() {
  const [IsLoggedin, setIsLoggedin] = useState(false);
  // const [Usertype, setUsertype] = useState(false);
  useEffect(() => {
    setIsLoggedin(checkLocalStorageKeys());
    // setUsertype(getUserType());
  }, []);
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
          {IsLoggedin && (
            <Route path="/profile" element={<Profile />}>
              <Route path="personal" element={<Personal />} />
              <Route path="professional" element={<Professional />} />
              <Route path="account" element={<Account />} />
              <Route path="purchasehistory" element={<Purchasehistory />} />
              <Route path="" element={<Navigate to="personal" replace />} />
            </Route>
          )}
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/forgotpassword/:token" element={<ForgotPassword />} />
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
