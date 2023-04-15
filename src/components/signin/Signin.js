import { useState } from "react";
import Input from "../../components/input/Input";
import ReactDOM from "react-dom";
import ModalWrapper from "../../helper/Modalwrapper";
import ReactLoading from "react-loading";
import "./Signin.css";
const CHECKS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^.+$/
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
  password: "",
  confirm_password: ""
};
const HINTS = {
  password: ["Password is requried"],
  email: ["Email address is requried"]
};
const MODAL_ELEMENT = document.getElementById("root-modal");
function Signin(props) {
  const [showmodal, setshowmodal] = useState(false);
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
  const submithandler = (event) => {
    event.preventDefault();
    setshowmodal(true);
    const allTrueValues = Object.values(validate).every((value) => value === true);
    if (allTrueValues) {
      console.log(Formdata);
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
    setshowmodal(false);
  };
  return (
    <>
      {showmodal &&
        ReactDOM.createPortal(
          <ModalWrapper close={null}>
            <ReactLoading type="spin" color="#fff" height="100px" width="100px" />
          </ModalWrapper>,
          MODAL_ELEMENT
        )}
      <div className="justify-center">
        <div className="main_div">
          <div className="heading left">Get started</div>
          <form id="signin" onSubmit={submithandler}>
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
              <button type="submit">Sign in</button>
            </div>
            <div style={{ marginTop: "1rem" }} className="divider">
              <p className="para">
                Don<>&apos;</>t have an account ?
              </p>
              <span onClick={props.changeform} className="navlink_signin">
                Sign Up
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Signin;
