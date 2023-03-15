import '../footer/Footer.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
const Footer = () => {
  const { IsLoggedin } = useContext(AuthContext);
  return (
    <footer className="footer">
      <div className="navigate">
        <h3>Quick links</h3>
        <ul className="nav-list">
          <NavLink className={'list-item'} to="home">
            <li>Home</li>
          </NavLink>
          {!IsLoggedin && (
            <NavLink className={'list-item'} to="demo">
              <li>Demo</li>
            </NavLink>
          )}
          {IsLoggedin && (
            <NavLink className={'list-item'} to="home">
              <li>Contribute</li>
            </NavLink>
          )}
          <NavLink className={'list-item'} to="about">
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
      <div className="branding_footer">
        <div className="branding">
          <img className="brand_image" src={logo} alt="React Image" />
          <span className="brand_name">Devcards</span>
        </div>
        <p>
          Unleash your coding potential with Devcards - the ultimate digital
          solution to showcase your unique skills and expertise using stunning,
          professional templates tailored just for you.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
