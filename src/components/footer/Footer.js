import "../footer/Footer.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
function Footer() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <footer className="footer">
      <div>
        <h3 className="sub-heading mb-1">Quick links</h3>
        <ul>
          <NavLink className={"list-item"} to="home">
            <li>Home</li>
          </NavLink>
          {!isLoggedIn && (
            <NavLink className={"list-item"} to="demo">
              <li>Demo</li>
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink className={"list-item"} to="home">
              <li>Contribute</li>
            </NavLink>
          )}
          <NavLink className={"list-item"} to="about">
            <li>About</li>
          </NavLink>
        </ul>
      </div>
      <div>
        <h3 className="sub-heading mb-1">Learn more</h3>
        <ul>
          <NavLink className={"list-item"} to="about">
            <li>Earn ?</li>
          </NavLink>
          <NavLink className={"list-item"} to="home">
            <li>Offers</li>
          </NavLink>
          <NavLink className={"list-item"} to="about">
            <li>Contact</li>
          </NavLink>
        </ul>
      </div>
      <div className="branding_footer">
        <div className="branding">
          <img className="brand_image" src={logo} alt="devcardlogo" />
          <span className="brand_name">Devcards</span>
        </div>
        <p className="mark_line">
          Unleash more potential and opportunities with Devcards - the ultimate digital solution to showcase your unique
          developer skills and expertise using stunning, professional templates designed just for you. Try the demo now.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
