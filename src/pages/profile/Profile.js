import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearlocaldata } from "../../store/localstorage";
import Callendpoint from "../../utils/Callendpoint";
import Loading from "../../utils/Loading";
import { BiUser, BiInfoCircle } from "react-icons/bi";
import { FiSettings, FiEdit } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import { RANDOM } from "../../utils/Constants";
import { reset as inforeset } from "../../redux/userinfoSlice";
import { reset as authreset } from "../../redux/authSlice";
import "./Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.userInfo?.profile?.image);
  const [message, setmessage] = useState(false);
  const [error, seterror] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [profileimage, setprofileimage] = useState(false);

  useEffect(() => {
    setprofileimage(image);
  }, [image]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setmessage(false);
      }, 5000);
    }
  }, [message]);

  const imagechangehandler = async (event) => {
    seterror(false);
    setmessage(false);
    if (event.target.files.length !== 0) {
      const file = event.target.files[0];
      if (file.size / (1024 * 1024) > 5) {
        seterror("File size exceeds the limit of 5MB");
      } else {
        const imageTag = document.getElementsByClassName("profile-image");
        const imageSrc = imageTag.length > 0 ? imageTag[0].src : null;
        const formData = new FormData();
        formData.append("image", file);
        formData.append("url", imageSrc);
        setsubmitted(true);
        const { data, statuscode } = await Callendpoint("post", "/user/account", null, formData, true, {
          "Content-Type": "*",
          Accept: "application/json"
        });
        if (statuscode === 200) {
          setmessage(data.message);
          setprofileimage(data.image);
        } else {
          seterror(data.message);
        }
        setsubmitted(false);
      }
    }
  };

  const signouthandler = async () => {
    seterror(false);
    setmessage(false);
    setsubmitted(true);
    const { statuscode } = await Callendpoint("post", "/auth/logout", null, {}, true);
    if (statuscode === 200) {
      dispatch(inforeset());
      dispatch(authreset());
      clearlocaldata();
      window.location.reload();
    }
    setsubmitted(false);
  };

  return (
    <>
      <Loading spinner={submitted} />
      <section className="profile">
        <div className="profile-menu">
          {error && <p className="error center">{error}</p>}
          {message && <p className="message center">{message}</p>}
          <div style={{ position: "relative" }}>
            <img className="profile-image" src={profileimage || RANDOM} alt="user image" />
            <input name="image" accept="image/*" type="file" id="img" onChange={imagechangehandler} />
            <div className="form_element">
              <label name="upload" id="upload" htmlFor="img">
                <span className="icon">
                  <FiEdit />
                </span>
                Upload image
              </label>
            </div>
          </div>
          <ul className="mt-1 mb-1">
            <NavLink to="personal" className={"profile-list-item"}>
              <li>
                <span className="icon">
                  <BiUser />
                </span>
                Personal
              </li>
            </NavLink>
            <NavLink to="professional" className={"profile-list-item"}>
              <li>
                <span className="icon">
                  <BiInfoCircle />
                </span>
                Professional
              </li>
            </NavLink>
            <NavLink to="account" className={"profile-list-item"}>
              <li>
                <span className="icon">
                  <FiSettings />
                </span>
                Account
              </li>
            </NavLink>
            <NavLink className={"profile-list-action"} onClick={signouthandler}>
              <li>
                <span className="icon">
                  <GoSignOut />
                </span>
                Sign out
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="profile-item-panel">{<Outlet />}</div>
      </section>
    </>
  );
}

export default Profile;
