import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Signin from "../sign/Signin";
import Signup from "../sign/Signup";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import "../footer/Footer.css";

function Footer() {
  const [showsignin, setshowsignin] = useState(false);
  const [showsignup, setshowsignup] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const closemodal = () => {
    setshowsignin(false);
    setshowsignup(false);
  };

  const formchange = () => {
    setshowsignin(!showsignin);
    setshowsignup(!showsignup);
  };

  return (
    <>
      {showsignin && <Signin formchange={formchange} close={closemodal} />}
      {showsignup && <Signup formchange={formchange} close={closemodal} />}
      <footer className="footer">
        <div>
          <h3 className="sub-heading mb-1">Quick links</h3>
          <ul>
            {!isLoggedIn && (
              <NavLink className={"list-item"} to="home">
                <li>Home</li>
              </NavLink>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <NavLink className={"list-item"} to="dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink className={"list-item"} to="profile/personal">
                    profile
                  </NavLink>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavLink className={"list-item"} to="demo">
                  <li>Demo</li>
                </NavLink>
                <NavLink className={"list-item"} onClick={() => setshowsignup(true)}>
                  <li>Sign up</li>
                </NavLink>
              </>
            )}
          </ul>
        </div>
        <div>
          <h3 className="sub-heading mb-1">Learn more</h3>
          <ul>
            <NavLink className={"list-item"} to="about">
              <li>About</li>
            </NavLink>
            <NavLink className={"list-item"} to="about">
              <li>Contact</li>
            </NavLink>
            {!isLoggedIn && (
              <NavLink className={"list-item"} onClick={() => setshowsignin(true)}>
                <li>Sign in</li>
              </NavLink>
            )}
          </ul>
        </div>
        <div className="branding_footer">
          <div className="branding">
            <img className="brand_image" src={logo} alt="devcardlogo" />
            <span className="brand_name">Devcards</span>
          </div>
          <p className="para" style={{ opacity: "1" }}>
            Unleash more potential and opportunities with Devcards - the ultimate digital solution to showcase your
            unique developer skills and expertise using stunning, professional templates designed just for you. Try the
            demo now.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
