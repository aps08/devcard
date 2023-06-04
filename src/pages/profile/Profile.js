import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [error, seterror] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [imagechange, setimagechange] = useState(false);
  const [apiendpoint, setapiendpoint] = useState("false");

  const imagechangehandler = (event) => {
    seterror(false);
    if (event.target.files.length !== 0) {
      // document.body.style.overflow = "hidden";
      console.log(event.target.files[0]);
      // setshowmodal(true);
    }
  };

  useEffect(() => {
    const callingapi = () => {
      console.log("useefct trigger", apiendpoint);
      setimagechange(false);
    };
    if (submitted) {
      seterror(false);
      setapiendpoint("auth/logout");
      callingapi();
    }
    if (imagechange) {
      seterror(false);
      setapiendpoint("auth/logout");
      callingapi();
    }
  }, [submitted, imagechange]);

  return (
    <>
      <section className="profile">
        <div className="pro-menu">
          {error && (
            <p className="error center" style={{ margin: "8px" }}>
              {error}
            </p>
          )}
          <div>
            <img className="pro-image" src="https://picsum.photos/600/320?grayscale" alt="user image" />
          </div>
          <input name="image" accept="image/*" type="file" id="img" onChange={imagechangehandler} />
          <label name="upload" id="upload" htmlFor="img">
            Change image
          </label>
          <ul className="pro-list" style={{ marginTop: "1rem" }}>
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
              <li>Purchase history</li>
            </NavLink>
            <NavLink className={"pro-list-action"} onClick={() => setsubmitted(true)}>
              <li>Sign out</li>
            </NavLink>
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
