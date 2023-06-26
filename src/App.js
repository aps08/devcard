import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Demo from "./pages/demo/Demo";
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
import PrivateRoute from "./utils/PrivateRouter";
import PublicRoute from "./utils/PublicRoute";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/home" element={<PrivateRoute Component={Home} />} />
          <Route path="/demo" element={<PublicRoute Component={Demo} />} />
          <Route path="/About" element={<About />} />
          <Route path="/profile" element={<PrivateRoute Component={Profile} />}>
            <Route path="personal" exact element={<PrivateRoute Component={Personal} />} />
            <Route path="professional" element={<PrivateRoute Component={Professional} />} />
            <Route path="account" element={<PrivateRoute Component={Account} />} />
            <Route path="orders" element={<PrivateRoute Component={Purchasehistory} />} />
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
    </>
  );
}

export default App;
