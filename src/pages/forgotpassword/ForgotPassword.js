import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Forgotpasswordmodal from "./forgotpasswordmodal";
import ReactLoading from "react-loading";
import ModalWrapper from "../../utils/Modalwrapper";
import Callendpoint from "../../utils/Callendpoint";

const MODAL_ELEMENT = document.getElementById("root-modal");

function ChangePassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [showenterpassword, setshowenterpassword] = useState(false);
  const [showenteremail, setshowenteremail] = useState(false);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [Formdata, setFormdata] = useState("");
  const [valid, setvalid] = useState(false);

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

  const changehandler = (event) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value);
    setvalid(isValidEmail);
    if (isValidEmail) {
      setFormdata({ email: event.target.value });
    }
  };

  const submithandler = async (event) => {
    event.preventDefault();
    setmessage(false);
    seterror(false);
    if (valid) {
      setsubmitted(true);
      const { data, statuscode } = await Callendpoint("post", "/public/forgot_password", null, Formdata);
      if (statuscode === 200) {
        setmessage(data.message);
      } else {
        seterror(data.message);
      }
      setsubmitted(false);
    } else {
      const inputfield = document.querySelector(`input[name="email"]`);
      inputfield.focus();
      inputfield.scrollIntoView({ block: "center" });
    }
  };

  return (
    <>
      {showenterpassword &&
        ReactDOM.createPortal(<Forgotpasswordmodal token={token} close={closemodal} />, MODAL_ELEMENT)}
      {showenteremail &&
        ReactDOM.createPortal(
          <ModalWrapper close={closemodal}>
            <div className="justify-center">
              <div className="main_div">
                <div className="heading left">Enter registered email</div>
                {message && <p className="message">{message}</p>}
                {error && <p className="error">{error}</p>}
                <form id="forgotpassword" onSubmit={submithandler}>
                  <Input
                    label="EMAIL"
                    placeholder="aps08@email.com"
                    hints={["Enter a correct email address"]}
                    change={changehandler}
                    type="email"
                    valid={valid}
                  />
                  <div className="form_element">
                    {submitted ? (
                      <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />
                    ) : (
                      <button type="submit">Submit</button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </ModalWrapper>,
          MODAL_ELEMENT
        )}
    </>
  );
}

export default ChangePassword;
