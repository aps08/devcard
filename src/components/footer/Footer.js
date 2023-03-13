import '../footer/Footer.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
const Footer = () => {
  const { IsLoggedin } = useContext(AuthContext);
  return (
    <footer>
      <div className="links">
        <div className="navigate">
          <h3>Quick links</h3>
          <ul>
            <NavLink to="home">
              <li>Home</li>
            </NavLink>
            {!IsLoggedin && (
              <NavLink to="demo">
                <li>Demo</li>
              </NavLink>
            )}
            {IsLoggedin && (
              <NavLink to="home">
                <li>Contribute</li>
              </NavLink>
            )}
            <NavLink to="about">
              <li>About</li>
            </NavLink>
            {!IsLoggedin && <li>Sign in</li>}
            {IsLoggedin && <li>Sign out</li>}
          </ul>
        </div>
        <div className="navigate">
          <h3>Learn more</h3>
          <ul>
            <NavLink to="about#earncredits">
              <li>Earn credits?</li>
            </NavLink>
            <NavLink to="home#offers">
              <li>Offers</li>
            </NavLink>
            <NavLink to="about#contactfeedback">
              <li>Contact</li>
            </NavLink>
            <NavLink to="about#contactfeedback">
              <li>Feedback</li>
            </NavLink>
          </ul>
        </div>
      </div>
      <div className="des-social">
        <div className="branding">
          <img src={logo} alt="React Image" />
          <span>Devcards</span>
        </div>
        <p>
          Devcards is a digital platform for personalized developer cards,
          highlighting skills and expertise with professional templates.
        </p>
        {!IsLoggedin && <button>Try now for free</button>}
        {IsLoggedin && <button>Get your card</button>}
      </div>
    </footer>
  );
};

export default Footer;
