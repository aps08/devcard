import { useState } from "react";
import ReactLoading from "react-loading";
import ModalWrapper from "../../helper/Modalwrapper";
import Input from "../../components/input/Input";
import ReactDOM from "react-dom";
import "./Signup.css";

const CHECKS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^.{8,20}$/
};
const HINTS = {
  password: ["Password must be 8 to 20 characters long"],
  email: ["Enter a correct email address"]
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
    placeholder: "***********"
  }
];
const INITIAL = {
  email: "",
  password: ""
};
const MODAL_ELEMENT = document.getElementById("root-modal");
function Signup(props) {
  const [Formdata, setFormdata] = useState(INITIAL);
  const [validate, setvalidate] = useState(INITIAL);
  const [showmodal, setshowmodal] = useState(false);
  const changehandler = (event) => {
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
    setshowmodal(true);
    const allTrueValues = Object.values(validate).every((value) => value === true);
    if (allTrueValues) {
      delete Formdata.confirm_password;
      console.log(Formdata);
    } else {
      for (const key in validate) {
        if (validate[key] !== true) {
          const inputfield = document.querySelector(`input[name=${key}]`);
          console.log(inputfield, `input[name=${key}]`);
          inputfield.focus();
          inputfield.scrollIntoView({ block: "center" });
          break;
        }
      }
    }
    setshowmodal(false);
  };
  return (
    <>
      {showmodal &&
        ReactDOM.createPortal(
          <ModalWrapper close={null}>
            <ReactLoading type="spin" color="#fff" height="100px" width="100px" className="reactloading" />
          </ModalWrapper>,
          MODAL_ELEMENT
        )}
      <div className="justify-center">
        <div className="main_div">
          <div className="heading left">Create account</div>
          <form id="signup" onSubmit={submithandler}>
            {ELEMENTS.map((element, index) => (
              <Input
                key={index}
                label={element.label}
                placeholder={element.placeholder}
                hints={HINTS[element.label.toLowerCase()]}
                change={changehandler}
                type={element.type || "text"}
                valid={validate[element.label.toLowerCase()]}
              />
            ))}
            <div className="form_element">
              <button type="submit">Sign up</button>
            </div>
          </form>
          <div className="divider">
            <p className="para">Already have an account ?</p>
            <span onClick={props.changeform} className="navlink_signin">
              Sign In
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
