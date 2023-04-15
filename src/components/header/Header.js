import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import ModalWrapper from "../../helper/Modalwrapper";
import AuthContext from "../../store/auth-context";
import Signup from "../Signup/Signup";
import Signin from "../signin/Signin";
import "../header/Header.css";
import ReactDOM from "react-dom";
import logo from "../../assets/images/logo.png";

const MODAL_ELEMENT = document.getElementById("root-modal");
const WIDTH_SIZE = 1024;
function Header() {
  const [showmodalsignup, setshowmodalsignup] = useState(false);
  const [showmodalsigin, setshowmodalsignin] = useState(false);
  const { IsLoggedin } = useContext(AuthContext);
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

  const closeanymodal = () => {
    setshowmodalsignin(false);
    setshowmodalsignup(false);
    document.body.style.overflow = "unset";
  };

  const showformmodalsignup = () => {
    setshowmodalsignin(false);
    document.body.style.overflow = "hidden";
    setshowmodalsignup(true);
  };
  const showformmodalsignin = () => {
    setshowmodalsignup(false);
    document.body.style.overflow = "hidden";
    setshowmodalsignin(true);
  };

  const navigationhandler = () => {
    if (Isopen) {
      setIsopen(!Isopen);
    }
  };

  return (
    <>
      {showmodalsignup &&
        ReactDOM.createPortal(
          <ModalWrapper close={closeanymodal}>
            <Signup changeform={showformmodalsignin} />
          </ModalWrapper>,
          MODAL_ELEMENT
        )}
      {showmodalsigin &&
        ReactDOM.createPortal(
          <ModalWrapper close={closeanymodal}>
            <Signin changeform={showformmodalsignup} />
          </ModalWrapper>,
          MODAL_ELEMENT
        )}
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
            {!IsLoggedin && (
              <NavLink className={"list-item"} to="/demo" onClick={navigationhandler}>
                <li>Demo</li>
              </NavLink>
            )}
            <NavLink className={"list-item"} to="/about" onClick={navigationhandler}>
              <li>About</li>
            </NavLink>
            {IsLoggedin && (
              <NavLink className={"list-item"} to="/dashboard" onClick={navigationhandler}>
                <li>Dashboard</li>
              </NavLink>
            )}
            <li className="list-item">
              {!IsLoggedin && <button onClick={showformmodalsignup}>Sign up for free</button>}
            </li>
          </ul>
          {!IsLoggedin && <button onClick={showformmodalsignin}>Sign in</button>}
          {IsLoggedin && (
            <NavLink to="/dashboard">
              <button>{creditcounts ? `Credits: ${creditcounts}` : <>Buy credits</>}</button>
            </NavLink>
          )}
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
