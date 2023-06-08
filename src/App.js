import { Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "./store/auth-context";
import Home from "./pages/home/Home";
import Demo from "./pages/demo/Demo";
import Dashboard from "./pages/dashboard/Dashboard";
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Personal from "./components/personal/Personal";
import Professional from "./components/professional/Professional";
import Account from "./components/account/Account";
import Purchasehistory from "./components/purchasehistory/Purchasehistory";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import Verify from "./pages/verify/Verify";
import PrivateRoute from "./helper/PrivateRouter";
import PublicRoute from "./helper/PublicRoute";
import { checkLocalStorageKeys } from "./store/localstorageoperations";
import "./App.css";

function App() {
  const IsLoggedin = checkLocalStorageKeys();
  const homecomponent = IsLoggedin ? Dashboard : Home;

  return (
    <AuthContext.Provider
      value={{
        IsLoggedin: IsLoggedin
      }}>
      <Header />
      <main>
        <Routes>
          <Route path="/home" element={<PrivateRoute Component={homecomponent} />} />
          <Route path="/demo" element={<PublicRoute Component={Demo} />} />
          <Route path="/About" element={<About />} />
          <Route path="/profile" element={<PrivateRoute Component={Profile} />}>
            <Route path="personal" element={<PrivateRoute Component={Personal} />} />
            <Route path="professional" element={<PrivateRoute Component={Professional} />} />
            <Route path="account" element={<PrivateRoute Component={Account} />} />
            <Route path="purchasehistory" element={<PrivateRoute Component={Purchasehistory} />} />
            <Route path="" element={<Navigate to="personal" replace />} />
          </Route>
          <Route path="/verify/:token" element={<PublicRoute Component={Verify} />} />
          <Route path="/forgotpassword" element={<PublicRoute Component={ForgotPassword} />}>
            <Route path=":token" element={<PublicRoute Component={ForgotPassword} />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
