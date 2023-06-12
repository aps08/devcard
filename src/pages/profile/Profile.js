import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { getUserToken } from "../../store/localstorageoperations";
import ReactLoading from "react-loading";
import { clearlocaldata } from "../../store/localstorage";
import Callendpoint from "../../utils/Callendpoint";
import "./Profile.css";

function Profile() {
  const [message, setmessage] = useState(false);
  const [error, seterror] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [imagechange, setimagechange] = useState(false);
  const [profileimage, setprofileimage] = useState(false);
  const [Formdata, setFormdata] = useState({});

  const imagechangehandler = (event) => {
    seterror(false);
    if (event.target.files.length !== 0) {
      const file = event.target.files[0];
      if (file.size / (1024 * 1024) > 5) {
        seterror("File size exceeds the limit of 5MB");
      } else {
        const imageTag = document.getElementsByClassName("pro-image");
        const imageSrc = imageTag.length > 0 ? imageTag[0].src : null;
        const formData = new FormData();
        formData.append("image", file);
        formData.append("url", imageSrc);
        setFormdata(formData);
        setimagechange(true);
      }
    }
  };
  const signouthandler = async () => {
    setsubmitted(true);
    const { data, statuscode } = await Callendpoint("post", "/auth/logout", null, {});
    if (statuscode === 200) {
      clearlocaldata();
    } else {
      seterror(data.message);
    }
    setsubmitted(false);
  };
  useEffect(() => {
    const callingapi = async () => {
      const jwt_token = getUserToken();
      const requestOptions = {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${jwt_token}`
        },
        mode: "cors"
      };
      const response = await fetch("/user/profile", requestOptions);
      const data = await response.json();
      if (response.ok) {
        setprofileimage(data.message);
      } else {
        seterror(data.message);
      }
    };
    callingapi();
  }, []);

  return (
    <>
      <section className="profile">
        <div className="profile-menu">
          {error && <p className="error center">{error}</p>}
          {message && <p className="message center">{message}</p>}
          {profileimage && (
            <div>
              <img className="profile-image" src={profileimage} alt="user image" />
            </div>
          )}
          <input name="image" accept="image/*" type="file" id="img" onChange={imagechangehandler} />
          <div className="form_element">
            {imagechange ? (
              <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />
            ) : (
              <label name="upload" id="upload" htmlFor="img">
                Change image
              </label>
            )}
          </div>
          <ul className="mt-1 mb-1">
            <NavLink to="personal" className={"profile-list-item"}>
              <li>Personal details</li>
            </NavLink>
            <NavLink to="professional" className={"profile-list-item"}>
              <li>Professional details</li>
            </NavLink>
            <NavLink to="account" className={"profile-list-item"}>
              <li>Account settings</li>
            </NavLink>
            <NavLink to="purchasehistory" className={"profile-list-item"}>
              <li>Purchase history</li>
            </NavLink>
            <NavLink className={"profile-list-action"} onClick={signouthandler}>
              <li>Sign out</li>
            </NavLink>
          </ul>
        </div>
        <div className="profile-item-panel">
          <Outlet />
        </div>
      </section>
    </>
  );
}

export default Profile;
