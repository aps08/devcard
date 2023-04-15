import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Sign from "../sign/Sign";
import "../header/Header.css";
import ReactDOM from "react-dom";
import logo from "../../assets/images/logo.png";

const MODAL_ELEMENT = document.getElementById("root-modal");
const WIDTH_SIZE = 1024;

function Header() {
  const [showsingup, setshowsignup] = useState(null);
  const [show, setshow] = useState(false);
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

  const closemodal = () => {
    setshow(false);
    setshowsignup(false);
    document.body.style.overflow = "unset";
  };

  const showhandler = (formtype) => {
    setshowsignup(formtype);
    document.body.style.overflow = "hidden";
    setshow(true);
  };

  const navigationhandler = () => {
    if (Isopen) {
      setIsopen(!Isopen);
    }
  };

  return (
    <>
      {show && ReactDOM.createPortal(<Sign show={showsingup} close={closemodal} />, MODAL_ELEMENT)}
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
              {!IsLoggedin && <button onClick={() => showhandler(false)}>Sign up for free</button>}
            </li>
          </ul>
          {!IsLoggedin && <button onClick={() => showhandler(true)}>Sign in</button>}
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
