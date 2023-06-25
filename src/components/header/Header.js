import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Signin from "../sign/Signin";
import Signup from "../sign/Signup";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import { MODAL_ELEMENT, BACKDROP_ELEMENT } from "../../utils/Constants";
import { FiMenu } from "react-icons/fi";
import { clearlocaldata } from "../../store/localstorage";
import Backdrop from "../../utils/Backdrop";
import Callendpoint from "../../utils/Callendpoint";
import { reset as inforeset } from "../../redux/userinfoSlice";
import { reset as authreset } from "../../redux/authSlice";
import "../header/Header.css";

function Header() {
  const dispatch = useDispatch();
  const [showsignin, setshowsignin] = useState(false);
  const [showsignup, setshowsignup] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const creditcounts = 0;
  const [Isopen, setIsopen] = useState(false);

  useEffect(() => {
    addEventListener("resize", () => setIsopen(false));
    return () => {
      removeEventListener("resize", () => setIsopen(false));
    };
  });

  const closemodal = () => {
    setshowsignin(false);
    setshowsignup(false);
  };

  const navigationhandler = () => {
    if (Isopen) {
      setIsopen(!Isopen);
    }
  };

  const formchange = () => {
    setshowsignin(!showsignin);
    setshowsignup(!showsignup);
  };

  const signouthandler = async () => {
    const { statuscode } = await Callendpoint("post", "/auth/logout", null, null, true);
    if (statuscode === 200) {
      clearlocaldata();
      dispatch(inforeset());
      dispatch(authreset());
      window.location.reload();
    }
  };

  return (
    <>
      {showsignin && ReactDOM.createPortal(<Signin formchange={formchange} close={closemodal} />, MODAL_ELEMENT)}
      {showsignup && ReactDOM.createPortal(<Signup formchange={formchange} close={closemodal} />, MODAL_ELEMENT)}
      <header className="navbar">
        <div className="branding">
          <img className="brand_image" src={logo} alt="React Image" />
          <span className="brand_name">Devcards</span>
        </div>
        <nav className="nav">
          {isLoggedIn && (
            <NavLink onClick={navigationhandler} to="/none">
              <button style={{ marginLeft: "1rem" }}>
                {creditcounts ? `Credits: ${creditcounts}` : <>Buy credits</>}
              </button>
            </NavLink>
          )}
          {!isLoggedIn && <button onClick={() => setshowsignin(true)}>Sign in</button>}
          <div className="mainmenu">
            <span className="menuburger icon" onClick={() => setIsopen(!Isopen)}>
              <FiMenu />
            </span>
            {Isopen && (
              <>
                {ReactDOM.createPortal(
                  <Backdrop class="backdrop-transparent" close={() => setIsopen(!Isopen)} />,
                  BACKDROP_ELEMENT
                )}
                <ul className="nav-list">
                  <NavLink className={"list-item"} to="/home" onClick={navigationhandler}>
                    <li>Home</li>
                  </NavLink>
                  {!isLoggedIn && (
                    <NavLink className={"list-item"} to="/demo" onClick={navigationhandler}>
                      <li>Demo</li>
                    </NavLink>
                  )}
                  <NavLink className={"list-item"} to="/about" onClick={navigationhandler}>
                    <li>About</li>
                  </NavLink>
                  {isLoggedIn && (
                    <>
                      <div className="divider"></div>
                      <NavLink to="/profile" className={"list-item"} onClick={navigationhandler}>
                        <li>Profile</li>
                      </NavLink>
                      <NavLink to="/profile/orders" className={"list-item"} onClick={navigationhandler}>
                        <li>Orders</li>
                      </NavLink>
                      <NavLink to="/profile/account" className={"list-item"} onClick={navigationhandler}>
                        <li>Settings</li>
                      </NavLink>
                    </>
                  )}
                  <div className="divider"></div>
                  {!isLoggedIn && (
                    <li
                      className="list-item"
                      onClick={() => {
                        setshowsignup(true);
                        navigationhandler();
                      }}>
                      Sign up for free
                    </li>
                  )}
                  {isLoggedIn && (
                    <li className="list-item" onClick={signouthandler}>
                      Sign out
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
