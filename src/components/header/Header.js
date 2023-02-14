import '../header/Header.css';
import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const loggedIn = false;

  return (
    <div className="header">
      <div className="branding">
        <img className="brand_logo" src={logo} alt="React Image" />
        <span className="brand_name">Devcards</span>
      </div>
      <div className="navbar">
        <ul className="navbar-nav">
          <NavLink to="home" className={'nav-item'}>
            <li>Home</li>
          </NavLink>
          {!loggedIn && (
            <NavLink to="demo" className={'nav-item'}>
              <li>Demo</li>
            </NavLink>
          )}
          <NavLink to="about" className={'nav-item'}>
            <li>About</li>
          </NavLink>
          {loggedIn && (
            <NavLink to="dashboard" className={'nav-item'}>
              <li>Dashboard</li>
            </NavLink>
          )}
        </ul>
        {!loggedIn && <button className="nav-item nav-btn">Sign up</button>}
        {!loggedIn && <button className="nav-item nav-btn">Sign in</button>}
      </div>
    </div>
  );
};

export default Header;
