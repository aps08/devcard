import { useEffect, useState } from "react";
import Input from "../input/Input";
import ReactLoading from "react-loading";
import ModalWrapper from "../../helper/Modalwrapper";
import "./ForgotPassword.css";

const INITIAL = {
  password: false,
  confirm: false
};

function Forgotpasswordmodal() {
  const [Formdata, setFormdata] = useState(INITIAL);
  const [valid, setvalid] = useState(INITIAL);
  const [submitted, setsubmitted] = useState(false);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);
  const submithandler = (event) => {
    event.preventDefault();
    const validation = valid.password && valid.confirm;
    if (validation) {
      delete Formdata.confirm;
      setFormdata({ ...Formdata, token: token });
      setsubmitted(true);
    } else {
      for (const key in validPass) {
        if (validPass[key] !== true) {
          const inputfield = document.querySelector(`input[name=${key}]`);
          inputfield.focus();
          inputfield.scrollIntoView({ block: "center" });
          break;
        }
      }
    }
  };
  return (
    <>
      <p className="para">Enter your registered email address</p>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form id="forgotpassword" onSubmit={submitemailhandler}>
        <Input
          label="EMAIL"
          placeholder="aps08@email.com"
          hints={["Enter a correct email address"]}
          change={changeemailhandler}
          type="email"
          valid={valid}
        />
        <button type="submit" disabled={spinner}>
          {buttonpasswordcontent}
        </button>
      </form>
    </>
  );
}

export default Forgotpasswordmodal;
