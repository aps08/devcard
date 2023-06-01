import ReactDOM from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ModalWrapper from "../../helper/Modalwrapper";

const MODAL_ELEMENT = document.getElementById("root-modal");

function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showmodal, setshowmodal] = useState(false);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);
  const [submitted, setsubmitted] = useState(true);

  const closemodal = () => {
    setshowmodal(false);
    navigate("/");
  };

  useEffect(() => {
    if (token.length === 22) {
      setshowmodal(true);
    } else {
      setshowmodal(false);
    }
  }, [token]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json"
      },
      mode: "cors"
    };

    const callingapi = async () => {
      try {
        const response = await fetch("/public/verify_email?token=" + token, requestOptions);
        const data = await response.json();
        if (response.ok) {
          setmessage(data.message);
        } else {
          seterror(data.message);
        }
      } catch (error) {
        console.log(error);
      }
      setsubmitted(false);
    };

    if (submitted) {
      seterror(false);
      setmessage(false);
      callingapi();
    }
  }, [submitted]);

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
                  <>
                    <ReactLoading type="bars" height="60px" width="60px" className="reactloading" />
                    <p className="para progress">Please wait while we verify your email address.</p>
                  </>
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
