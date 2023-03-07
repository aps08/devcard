import '../footer/Footer.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
const Footer = () => {
  return (
    <footer>
      <div className="links">
        <div className="navigate">
          <h3>Quick links</h3>
          <ul>
            <NavLink to="home">
              <li>Home</li>
            </NavLink>
            <NavLink to="demo">
              <li>Demo</li>
            </NavLink>
            <NavLink to="about">
              <li>About</li>
            </NavLink>
            <li>Sign in</li>
          </ul>
        </div>
        <div className="navigate">
          <h3>Learn more</h3>
          <ul>
            <li>How to earn credits?</li>
            <li>Offers</li>
            <li>Contact</li>
            <li>Feedback</li>
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
        <button>Try now for free</button>
      </div>
    </footer>
  );
};

export default Footer;
