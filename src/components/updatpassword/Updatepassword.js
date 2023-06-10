import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Input from "../input/Input";
import ReactLoading from "react-loading";
import ModalWrapper from "../../helper/Modalwrapper";
import "./Updatepassword.css";

const CHECKS = {
  old_password: /^.{8,20}$/,
  new_confirm: /^.{8,20}$/
};

const HINTS = {
  old_password: ["Password must be 8 to 20 characters long"],
  new_confirm: ["Enter a correct email address"]
};

const INITIAL = {
  old_password: false,
  new_confirm: false
};

function Updatepassword(props) {
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [Formdata, setFormdata] = useState(INITIAL);
  const [validate, setvalidate] = useState(INITIAL);

  const changedhandler = (event) => {
    const { name, value } = event.target;
    if (CHECKS[name].test(value)) {
      setvalidate({ ...validate, [name]: true });
      setFormdata({ ...Formdata, [name]: value });
    } else {
      setvalidate({ ...validate, [name]: false });
    }
  };

  const submithandler = (event) => {
    event.preventDefault();
    const allTrueValues = Object.values(validate).every((value) => value === true);
    if (allTrueValues) {
      setsubmitted(true);
    } else {
      for (const key in validate) {
        if (validate[key] !== true) {
          const inputfield = document.querySelector(`input[name=${key}]`);
          inputfield.focus();
          inputfield.scrollIntoView({ block: "center" });
          break;
        }
      }
    }
  };

  return (
    <ModalWrapper close={props.close}>
      <div className="justify-center">
        <div className="main_div">
          <div className="heading left">Get started</div>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <form id="updatepassword" onSubmit={submithandler} name="updatepassword">
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
    </ModalWrapper>
  );
}

export default Updatepassword;
