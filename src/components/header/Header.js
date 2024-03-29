import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Signin from "../sign/Signin";
import Signup from "../sign/Signup";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import { BACKDROP_ELEMENT } from "../../utils/Constants";
import { FiMenu } from "react-icons/fi";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { clearlocaldata } from "../../store/localstorage";
import Backdrop from "../../utils/Backdrop";
import Callendpoint from "../../utils/Callendpoint";
import { reset as inforeset } from "../../redux/userinfoSlice";
import { reset as authreset } from "../../redux/authSlice";
import { RANDOM } from "../../utils/Constants";
import "../header/Header.css";

function Header() {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.userInfo?.profile?.image);
  const [scrolled, setScrolled] = useState(false);
  const [showsignin, setshowsignin] = useState(false);
  const [showsignup, setshowsignup] = useState(false);
  const [avatar, setavatar] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const creditcounts = 0;
  const [Isopen, setIsopen] = useState(false);

  useEffect(() => {
    setavatar(image);
  }, [image]);

  useEffect(() => {
    addEventListener("resize", () => setIsopen(false));
    return () => {
      removeEventListener("resize", () => setIsopen(false));
    };
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closemodal = () => {
    navigationhandler();
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
      dispatch(inforeset());
      dispatch(authreset());
      navigationhandler();
      clearlocaldata();
      window.location.reload();
    }
  };

  return (
    <>
      {showsignin && <Signin formchange={formchange} close={closemodal} />}
      {showsignup && <Signup formchange={formchange} close={closemodal} />}
      <header className={scrolled ? "navbar navbar-back" : "navbar"}>
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
              {!isLoggedIn && <FiMenu />}
              {isLoggedIn && (
                <>
                  <img className="profile-image" src={avatar || RANDOM} alt="user image" />{" "}
                  <MdOutlineArrowDropDown className="icon" />
                </>
              )}
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
