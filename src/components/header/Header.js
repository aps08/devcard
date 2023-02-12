import '../header/Header.css';
import logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <div className="header">
      <div className="branding">
        <img className="brand_logo" src={logo} alt="React Image" />
        <span className="brand_name">Devcards</span>
      </div>
      {/* <div className="navbar">
        <a className="active" href="/home">Home</a>
        <a href="/news">News</a>
        <a href="/contact">Contact</a>
        <a href="/about">About</a>
      </div> */}
    </div>
  );
};

export default Header;
