import { useSelector } from "react-redux";
import "./Devcard.css";
import image1 from "../../assets/images/cardhome2.png";
import map from "../../assets/images/map.png";
import { useState } from "react";
import { useEffect } from "react";
import { QR_API } from "../../utils/Constants";

function Devcard() {
  const profile = useSelector((state) => state.userInfo?.profile);
  const personalinfo = useSelector((state) => state.userInfo?.personal);
  const professionalinfo = useSelector((state) => state.userInfo?.professional);
  const [userdata, setuserdata] = useState({});

  useEffect(() => {
    if (professionalinfo.linkedin) {
      setuserdata({ ...userdata, linkedin: QR_API + professionalinfo.linkedin });
    }
    if (personalinfo.github) {
      setuserdata({ ...userdata, github: QR_API + professionalinfo.github });
    }
  }, [personalinfo, professionalinfo]);

  return (
    <div className="devcard" style={{ backgroundColor: "skyblue" }}>
      <div className="prof_img">
        {profile.image ? (
          <div className="image">
            <img title="profile image" src={profile.image} />
          </div>
        ) : (
          <></>
        )}
        <div className="profile_info">
          <p>Anoop Pratap Singh</p>
          <p>
            <img src={image1} />
            Python Developer
          </p>
          <p>2 years of experience</p>
          <p>yoruemail@gmail.com</p>
        </div>
      </div>
      <div className="loc_link">
        <div className="loc">
          <img title="map" src={map} />
          <p>Bangalore, India</p>
        </div>
        <div className="barcode">
          {userdata.github && <img title="github" src={userdata.github} />}
          {userdata.linkedin && <img title="linkedin" src={userdata.linkedin} />}
        </div>
      </div>
    </div>
  );
}

export default Devcard;
