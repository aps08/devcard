import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Home from "./pages/home/Home";
import Demo from "./pages/demo/Demo";
import ReactDOM from "react-dom";
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
import PrivateRoute from "./utils/PrivateRouter";
import PublicRoute from "./utils/PublicRoute";
import Callendpoint from "./utils/Callendpoint";
import Backdrop from "./utils/Backdrop";
import { setAuthAndUserType } from "./redux/authSlice";
import { setUserData } from "./redux/userinfoSlice";
import { getlocaldata } from "./store/localstorage";
import { BACKDROP_ELEMENT } from "./utils/Constants";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [submitted, setsubmitted] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchdata = async () => {
      setsubmitted(true);
      const token = getlocaldata("X-ACCESS-TOKEN");
      if (token) {
        const { data, statuscode } = await Callendpoint("get", "/user/profile", null, null, true);
        if (statuscode === 200) {
          dispatch(
            setAuthAndUserType({
              isLoggedIn: true,
              user: data.profile.user
            })
          );
          dispatch(setUserData(data));
        } else {
          console.error(data, statuscode);
        }
      }
      setsubmitted(false);
    };
    fetchdata();
  }, [dispatch]);

  return (
    <>
      {submitted &&
        ReactDOM.createPortal(
          <Backdrop close={null}>
            <ReactLoading type="spin" color="#fff" height="100px" width="100px" />
          </Backdrop>,
          BACKDROP_ELEMENT
        )}
      <Header />
      <main>
        <Routes>
          <Route path="/home" element={<PrivateRoute Component={isLoggedIn ? Dashboard : Home} />} />
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
