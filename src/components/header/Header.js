import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import '../header/Header.css';
import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const WIDTH_SIZE = 800;

const Header = () => {
  const { IsLoggedin } = useContext(AuthContext);
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
  const navigationhandler = () => {
    if (Isopen) {
      setIsopen(!Isopen);
    }
  };
  const hamburgerhandler = () => {
    setIsopen(!Isopen);
  };
  const signuphandler = () => {
    console.log('signup');
    navigationhandler();
  };
  const signinhandler = () => {
    console.log('signin');
    navigationhandler();
  };
  return (
    <header>
      <div className="branding">
        <img src={logo} alt="React Image" />
        <span>Devcards</span>
      </div>
      <nav>
        <ul style={{ right: !Isopen ? '-100%' : '0' }}>
          <NavLink to="home" onClick={navigationhandler}>
            <li>Home</li>
          </NavLink>
          {!IsLoggedin && (
            <NavLink to="demo" onClick={navigationhandler}>
              <li>Demo</li>
            </NavLink>
          )}
          <NavLink to="about" onClick={navigationhandler}>
            <li>About</li>
          </NavLink>
          {IsLoggedin && (
            <NavLink to="dashboard" onClick={navigationhandler}>
              <li>Dashboard</li>
            </NavLink>
          )}
          <li>
            {!IsLoggedin && (
              <button onClick={signuphandler} className="l-text"></button>
            )}
          </li>
        </ul>
        {!IsLoggedin && <button onClick={signinhandler}>Sign in</button>}
        <div className="hamburger" onClick={hamburgerhandler}>
          {!Isopen ? <>&#9776;</> : <>&#10006;</>}
        </div>
      </nav>
    </header>
  );
};

export default Header;
