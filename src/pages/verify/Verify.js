import ReactDOM from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ModalWrapper from "../../utils/Modalwrapper";
import Callendpoint from "../../utils/Callendpoint";
import { MODAL_ELEMENT } from "../../utils/Constants";

function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showmodal, setshowmodal] = useState(false);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);

  const closemodal = () => {
    setshowmodal(false);
    navigate("/home");
  };

  const verifytoken = async () => {
    const { data, statuscode } = await Callendpoint("GET", "/public/verify_email", { token: token }, null);
    if (statuscode === 200) {
      setmessage(data.message);
      console.log(message);
    } else {
      seterror(data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token.length === 22) {
      setshowmodal(true);
      verifytoken();
    } else {
      navigate("/home");
    }
  }, [token]);

  return (
    <>
      {showmodal &&
        ReactDOM.createPortal(
          <ModalWrapper close={closemodal}>
            <div className="justify-center" id="modalsign" style={{ width: "320px" }}>
              <div className="main_div">
                <div className="heading center" style={{ marginBottom: "2rem" }}>
                  Verifying email
                </div>
                {message && <p className="message">{message}</p>}
                {error && <p className="error">{error}</p>}
                {!message && !error && (
                  <div className="form_element">
                    <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />
                    <p className="para center">Please wait while we verify your email address.</p>
                  </div>
                )}
              </div>
            </div>
          </ModalWrapper>,
          MODAL_ELEMENT
        )}
    </>
  );
}

export default Verify;
