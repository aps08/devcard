import '../footer/Footer.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
const Footer = () => {
  const { IsLoggedin } = useContext(AuthContext);
  return (
    <footer className="footer">
      <div>
        <h3 className="sub-heading">Quick links</h3>
        <ul>
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
        </ul>
      </div>
      <div>
        <h3 className="sub-heading">Learn more</h3>
        <ul>
          <NavLink className={'list-item'} to="about">
            <li>Earn credits?</li>
          </NavLink>
          <NavLink className={'list-item'} to="home">
            <li>Offers</li>
          </NavLink>
          <NavLink className={'list-item'} to="about">
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
          Unleash your coding potential with Devcards - the ultimate digital
          solution to showcase your unique skills and expertise using stunning,
          professional templates tailored just for you.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
