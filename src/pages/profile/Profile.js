import { NavLink, Outlet } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <>
      <section className="profile">
        <div className="pro-menu">
          <div>
            <img className="pro-image" src="https://picsum.photos/600/320?grayscale" alt="user image" />
          </div>
          <ul className="pro-list">
            <NavLink to="personal" className={"pro-list-item"}>
              <li>Personal details</li>
            </NavLink>
            <NavLink to="professional" className={"pro-list-item"}>
              <li>Professional details</li>
            </NavLink>
            <NavLink to="account" className={"pro-list-item"}>
              <li>Account settings</li>
            </NavLink>
            <NavLink to="purchasehistory" className={"pro-list-item"}>
              <li style={{ margin: ".4rem 0" }}>Purchase history</li>
            </NavLink>
            <li>
              <button style={{ fontSize: "1.2rem" }}>Sign out</button>
            </li>
          </ul>
        </div>
        <div className="pro-panel">
          <Outlet />
        </div>
      </section>
    </>
  );
}

export default Profile;
