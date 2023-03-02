import { useState, useEffect } from 'react';
import '../header/Header.css';
import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const WIDTH_SIZE = 768;

const Header = () => {
  const [Isopen, setIsopen] = useState(false);
  const onresize = (event) => {
    if (event.target.innerWidth > WIDTH_SIZE && Isopen) {
      setIsopen(false);
    }
  };
  useEffect(() => {
    addEventListener('resize', onresize);
    return () => {
      removeEventListener('resize', onresize);
    };
  });
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
        <div className="hamburger" onClick={hamburgerhandler}>
          {!Isopen ? <>&#9776;</> : <>&#10006;</>}
        </div>
      </nav>
    </header>
  );
};

export default Header;
