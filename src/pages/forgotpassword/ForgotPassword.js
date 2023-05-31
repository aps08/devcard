import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Forgotpasswordmodal from "./forgotpasswordmodal";
import Enteremailmodal from "./Enteremailmodal";

const MODAL_ELEMENT = document.getElementById("root-modal");

function ChangePassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [showenterpassword, setshowenterpassword] = useState(false);
  const [showenteremail, setshowenteremail] = useState(false);

  const closemodal = () => {
    setshowenteremail(false);
    setshowenterpassword(false);
    document.body.style.overflow = "unset";
    navigate("/home");
  };

  useEffect(() => {
    try {
      if (token.length === 22) {
        setshowenterpassword(true);
      }
    } catch {
      setshowenteremail(true);
    }
    document.body.style.overflow = "hidden";
  }, [token]);

  return (
    <>
      {showenterpassword &&
        ReactDOM.createPortal(<Forgotpasswordmodal token={token} close={closemodal} />, MODAL_ELEMENT)}
      {showenteremail && ReactDOM.createPortal(<Enteremailmodal close={closemodal} />, MODAL_ELEMENT)}
    </>
  );
}

export default ChangePassword;
