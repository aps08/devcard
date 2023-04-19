import ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";
import AuthContext from "../../store/auth-context";
import Sign from "../sign/Sign";
import logo from "../../assets/images/logo.png";
import "../header/Header.css";

const MODAL_ELEMENT = document.getElementById("root-modal");
const WIDTH_SIZE = 1024;

function Header() {
  const [profile, setprofile] = useState(false);
  const [showsingup, setshowsignup] = useState(null);
  const [show, setshow] = useState(false);
  const { IsLoggedin } = useContext(AuthContext);
  const creditcounts = 0;
  const [Isopen, setIsopen] = useState(false);
  const generator = new AvatarGenerator();
  const random_avatar = generator.generateRandomAvatar();

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
  useEffect(() => {
    document.addEventListener("mousedown", navigationhandler);
    return () => {
      document.removeEventListener("mousedown", navigationhandler);
    };
  }, [profile, Isopen]);

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
    if (profile) {
      setprofile(false);
    }
  };

  const signouthandler = () => {
    console.log("signouthandler works");
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
            {!IsLoggedin && (
              <li className="list-item">
                <button onClick={() => showhandler(false)}>Sign up for free</button>
              </li>
            )}
            {IsLoggedin && (
              <NavLink className={"list-item"} onClick={navigationhandler} to="/none">
                <li>
                  <button>{creditcounts ? `Credits: ${creditcounts}` : <>Buy credits</>}</button>
                </li>
              </NavLink>
            )}
          </ul>
          {!IsLoggedin && <button onClick={() => showhandler(true)}>Sign in</button>}
          {IsLoggedin && (
            <>
              <li className="list-item avatar" style={{ position: "relative" }} onClick={() => setprofile(!profile)}>
                <img src={random_avatar} alt="random avatar" />
              </li>
              {profile && (
                <div className="profile">
                  <ul className="profile-nav-list">
                    <NavLink to="/pro">
                      <li className="profile-nav-list-item">Profile</li>
                    </NavLink>
                    <li className="profile-nav-list-item" onClick={signouthandler}>
                      Sign out
                    </li>
                  </ul>
                </div>
              )}
            </>
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
