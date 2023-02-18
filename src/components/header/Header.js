import { useState } from 'react';
import '../header/Header.css';
import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [Isopen, setIsopen] = useState(false);
  const hamburgerhandler = () => {
    setIsopen(!Isopen);
  };
  const signuphandler = () => {
    console.log('signup');
    setIsopen(!Isopen);
  };
  const signinhandler = () => {
    console.log('signin');
  };

  const loggedIn = false;
  return (
    <div className="fixed">
      <header>
        <div className="branding">
          <img src={logo} alt="React Image" />
          <span>Devcards</span>
        </div>
        <nav>
          <ul style={{ right: !Isopen ? '-100%' : '0' }}>
            <NavLink to="home">
              <li>Home</li>
            </NavLink>
            {!loggedIn && (
              <NavLink to="demo">
                <li>Demo</li>
              </NavLink>
            )}
            <NavLink to="about">
              <li>About</li>
            </NavLink>
            {loggedIn && (
              <NavLink to="dashboard">
                <li>Dashboard</li>
              </NavLink>
            )}
            <li>
              {!loggedIn && (
                <button onClick={signuphandler} className="l-text"></button>
              )}
            </li>
          </ul>
          {!loggedIn && <button onClick={signinhandler}>Sign in</button>}
          {!Isopen && (
            <div className="hamburger" onClick={hamburgerhandler}>
              &#9776;
            </div>
          )}
          {Isopen && (
            <div className="hamburger" onClick={hamburgerhandler}>
              &#10006;
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
