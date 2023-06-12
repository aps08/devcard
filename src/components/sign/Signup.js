import { useState } from "react";
import Input from "../input/Input";
import ReactLoading from "react-loading";
import ModalWrapper from "../../utils/Modalwrapper";
import Callendpoint from "../../utils/Callendpoint";
import "./Sign.css";

const CHECKS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^.{8,20}$/
};
const ELEMENTS = [
  {
    label: "EMAIL",
    type: "email",
    placeholder: "aps08@email.com"
  },
  {
    label: "PASSWORD",
    type: "password",
    placeholder: "**************"
  }
];
const INITIAL = {
  email: "",
  password: ""
};
const HINTS = {
  password: ["Password must be 8 to 20 characters long"],
  email: ["Enter a correct email address"]
};

function Signup(props) {
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [Formdata, setFormdata] = useState(INITIAL);
  const [validate, setvalidate] = useState(INITIAL);

  const changehandler = (event) => {
    const { name, value } = event.target;
    if (CHECKS[name].test(value)) {
      setvalidate({ ...validate, [name]: true });
      setFormdata({ ...Formdata, [name]: value });
    } else {
      setvalidate({ ...validate, [name]: false });
    }
  };

  const submithandler = async (event) => {
    event.preventDefault();
    seterror(false);
    setmessage(false);
    const allTrueValues = Object.values(validate).every((value) => value === true);
    if (allTrueValues) {
      setsubmitted(true);
      const { data, statuscode } = await Callendpoint("post", "/auth/register", null, Formdata);
      if (statuscode === 200) {
        setmessage(data.message);
      } else {
        seterror(data.message);
      }
      setsubmitted(false);
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
          <div className="heading left">Create account</div>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <form id="signup" onSubmit={submithandler} name="signup">
            {ELEMENTS.map((element, index) => (
              <Input
                key={index}
                label={element.label}
                placeholder={element.placeholder}
                hints={HINTS[element.label.toLowerCase()]}
                change={changehandler}
                type={element.type}
                valid={validate[element.label.toLowerCase()]}
              />
            ))}
            <div className="form_element">
              {submitted ? (
                <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />
              ) : (
                <button type="submit">Submit</button>
              )}
            </div>
            <div className="divider mt-1"></div>
            <p className="para center" style={{ fontSize: "1rem" }}>
              Already have an account ?
            </p>
            <p onClick={props.formchange} className="navlink_signin center">
              Sign in
            </p>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default Signup;
