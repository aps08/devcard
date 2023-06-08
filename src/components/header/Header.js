import ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Signin from "../sign/Signin";
import Signup from "../sign/Signup";
import logo from "../../assets/images/logo.png";
import "../header/Header.css";
import { getUserToken, removeLocalstorage } from "../../store/localstorageoperations";

const MODAL_ELEMENT = document.getElementById("root-modal");
const WIDTH_SIZE = 1024;

function Header() {
  const [showsignin, setshowsignin] = useState(false);
  const [showsignup, setshowsignup] = useState(false);
  const { IsLoggedin } = useContext(AuthContext);
  const [showmenu, setshowmenu] = useState(false);
  const creditcounts = 0;
  const [Isopen, setIsopen] = useState(false);

  const onresize = (event) => {
    if (event.target.innerWidth > WIDTH_SIZE && Isopen) {
      setIsopen(false);
    }
  };

  useEffect(() => {
    addEventListener("resize", onresize);
    return () => {
      removeEventListener("resize", onresize);
    };
  });

  const closemodal = () => {
    setshowsignin(false);
    setshowsignup(false);
    document.body.style.overflow = "unset";
  };

  const showhandler = (type) => {
    document.body.style.overflow = "hidden";
    if (type === "signin") {
      setshowsignin(true);
    }
    if (type === "signup") {
      setshowsignup(true);
    }
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

  const signouthandler = () => {
    navigationhandler();
    const jwt_token = getUserToken();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
        Authorization: `Bearer ${jwt_token}`
      },
      mode: "cors"
    };
    fetch("/auth/logout", requestOptions)
      .then(async (response) => {
        if (response.ok) {
          removeLocalstorage();
          window.location.reload();
        } else {
          throw new Error("API call failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
          <ul className="nav-list" style={{ right: !Isopen ? "-100%" : "0" }}>
            <NavLink className={"list-item"} to="/home" onClick={navigationhandler}>
              <li>Home</li>
            </NavLink>
            <NavLink className={"list-item"} to="/demo" onClick={navigationhandler}>
              <li>Demo</li>
            </NavLink>
            <NavLink className={"list-item"} to="/about" onClick={navigationhandler}>
              <li>About</li>
            </NavLink>
            {!IsLoggedin && (
              <li className="list-item">
                <button onClick={() => showhandler("signup")}>Sign up for free</button>
              </li>
            )}
            {IsLoggedin && (
              <>
                <NavLink to="/profile" className={"list-item"} onClick={navigationhandler}>
                  <li onClick={() => setshowmenu(!showmenu)}>Profile</li>
                  {showmenu && <div>AA</div>}
                </NavLink>
                <li className="list-item">
                  <button className="sign_out_one" onClick={signouthandler}>
                    Sign out
                  </button>
                </li>
              </>
            )}
          </ul>
          {IsLoggedin && (
            <>
              <NavLink onClick={navigationhandler} to="/none">
                <button>{creditcounts ? `Credits: ${creditcounts}` : <>Buy credits</>}</button>
              </NavLink>
              <li className="list-item">
                <button className="sign_out_two" onClick={signouthandler}>
                  Sign out
                </button>
              </li>
            </>
          )}
          {!IsLoggedin && <button onClick={() => showhandler("signin")}>Sign in</button>}
          <div
            id="menu"
            className="hamburger"
            onClick={() => {
              setIsopen(!Isopen);
            }}>
            <div
              className="hamburger-line"
              style={{
                transform: Isopen ? "rotate(45deg) translate(8px, 8px)" : "",
                margin: !Isopen ? "8px 0" : "4px 0"
              }}></div>
            <div className="hamburger-line" style={{ opacity: !Isopen ? "1" : "0" }}></div>
            <div
              className="hamburger-line"
              style={{
                transform: Isopen ? "rotate(-45deg) translate(8px, -8px)" : "",
                margin: !Isopen ? "8px 0" : "4px 0"
              }}></div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
