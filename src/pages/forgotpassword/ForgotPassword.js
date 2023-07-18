import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Forgotpasswordmodal from "./forgotpasswordmodal";
import Loading from "../../utils/Loading";
import Callendpoint from "../../utils/Callendpoint";
import { MODAL_ELEMENT } from "../../utils/Constants";

function ChangePassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [showenterpassword, setshowenterpassword] = useState(false);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [Formdata, setFormdata] = useState("");
  const [valid, setvalid] = useState(false);

  const closemodal = () => {
    setshowenterpassword(false);
    navigate("/home");
  };

  useEffect(() => {
    if (token?.length === 22) {
      setshowenterpassword(true);
    }
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
    <div>
      {showenterpassword &&
        ReactDOM.createPortal(<Forgotpasswordmodal token={token} close={closemodal} />, MODAL_ELEMENT)}
      <Loading spinner={submitted} />
      <div
        className="justify-center"
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <div className="main_div">
          <div className="heading left">Enter registered email</div>
          {message && (
            <p className="message" style={{ width: "320px" }}>
              {message}
            </p>
          )}
          {error && (
            <p className="error" style={{ width: "320px" }}>
              {error}
            </p>
          )}
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
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
