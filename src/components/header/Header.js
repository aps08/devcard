import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import SignUp from '../signup/SignUp';
import AuthContext from '../../store/auth-context';
import '../header/Header.css';
import logo from '../../assets/images/logo.png';

const WIDTH_SIZE = 1024;
const MODAL_ELEMENT = document.getElementById('root-modal');
const Header = () => {
  const [showmodal, setshowmodal] = useState(false);
  const { IsLoggedin } = useContext(AuthContext);
  const [Isopen, setIsopen] = useState(false);

  const signupmodalopen = () => {
    document.body.style.overflow = 'hidden';
    setshowmodal(true);
  };
  const sigupmodalclose = () => {
    setshowmodal(false);
    document.body.style.overflow = 'unset';
  };

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

  return (
    <header className="navbar">
      {showmodal &&
        ReactDOM.createPortal(
          <SignUp close={sigupmodalclose} />,
          MODAL_ELEMENT
        )}
      <div className="branding">
        <img className="brand_image" src={logo} alt="React Image" />
        <span className="brand_name">Devcards</span>
      </div>
      <nav className="nav">
        <ul className="nav-list" style={{ right: !Isopen ? '-100%' : '0' }}>
          <NavLink
            className={'list-item'}
            to="home"
            onClick={navigationhandler}>
            <li>Home</li>
          </NavLink>
          {!IsLoggedin && (
            <NavLink
              className={'list-item'}
              to="demo"
              onClick={navigationhandler}>
              <li>Demo</li>
            </NavLink>
          )}
          <NavLink
            className={'list-item'}
            to="about"
            onClick={navigationhandler}>
            <li>About</li>
          </NavLink>
          {IsLoggedin && (
            <NavLink
              className={'list-item'}
              to="dashboard"
              onClick={navigationhandler}>
              <li>Dashboard</li>
            </NavLink>
          )}
          <li className="list-item">
            {!IsLoggedin && (
              <button onClick={signupmodalopen}>Sign up for free</button>
            )}
          </li>
        </ul>
        {!IsLoggedin && <button>Sign in</button>}
        <div
          id="menu"
          className="hamburger"
          onClick={() => {
            setIsopen(!Isopen);
          }}>
          <div
            className="hamburger-line"
            style={{
              transform: Isopen ? 'rotate(45deg) translate(8px, 8px)' : '',
              margin: !Isopen ? '8px 0' : '4px 0'
            }}></div>
          <div
            className="hamburger-line"
            style={{ opacity: !Isopen ? '1' : '0' }}></div>
          <div
            className="hamburger-line"
            style={{
              transform: Isopen ? 'rotate(-45deg) translate(8px, -8px)' : '',
              margin: !Isopen ? '8px 0' : '4px 0'
            }}></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
