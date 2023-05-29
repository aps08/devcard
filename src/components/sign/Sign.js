import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Input from "../input/Input";
import ReactLoading from "react-loading";
import ModalWrapper from "../../helper/Modalwrapper";
import "./Sign.css";
import { setLocalStorage } from "../../store/localstorageoperations";
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

function Sign(props) {
  const [show, setshow] = useState(!props.show);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);
  const [spinner, setspinner] = useState(false);
  const [Formdata, setFormdata] = useState(INITIAL);
  const [validate, setvalidate] = useState(INITIAL);
  const title = show ? <>Create account</> : <>Get started</>;
  const formid = show ? "signin" : "signup";
  const footerpara = show ? <>Already have an account ?</> : <>Don&apos;t have an account ?</>;
  const buttontext = show ? <>Sign in</> : <>Sign up</>;
  const apiendpoint = show ? "/auth/register" : "/auth/login";
  const forgotpassword = show ? (
    <p className="forgot_pass">Welcome to devcards</p>
  ) : (
    <NavLink to="/forgotpassword">
      <p onClick={props.close} className="forgot_pass">
        Forgot password
      </p>
    </NavLink>
  );

  const changehandler = (event) => {
    const { name, value } = event.target;
    if (CHECKS[name].test(value)) {
      setvalidate({ ...validate, [name]: true });
      setFormdata({ ...Formdata, [name]: value });
    } else {
      setvalidate({ ...validate, [name]: false });
    }
  };

  const formchange = () => {
    setFormdata(INITIAL);
    seterror(false);
    setmessage(false);
    setshow(!show);
    const userelement = document.getElementsByName("email")[0];
    userelement.value = "";
    const passwordelement = document.getElementsByName("password")[0];
    passwordelement.value = "";
  };
  const submithandler = (event) => {
    event.preventDefault();
    const allTrueValues = Object.values(validate).every((value) => value === true);
    if (allTrueValues) {
      setspinner(true);
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

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json"
      },
      body: JSON.stringify(Formdata),
      mode: "cors"
    };
    const callingapi = async () => {
      try {
        const response = await fetch(apiendpoint, requestOptions);
        const data = await response.json();
        if (response.ok) {
          setmessage(data.message);
          if (apiendpoint === "/auth/login") {
            setLocalStorage(data);
            window.location.reload();
          }
        } else {
          seterror(data.message);
        }
        setspinner(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (spinner) {
      seterror(false);
      setmessage(false);
      callingapi();
    }
  }, [spinner]);

  return (
    <ModalWrapper close={props.close}>
      <div className="justify-center" id="modalsign">
        <div className="main_div">
          <div className="heading left">{title}</div>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <form id={formid} onSubmit={submithandler} name={formid}>
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
              {!spinner && (
                <button type="submit" style={{ height: "39px" }} disabled={spinner}>
                  Submit
                </button>
              )}
              {spinner && (
                <button type="submit" style={{ height: "39px" }} disabled={spinner}>
                  <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />
                </button>
              )}
            </div>
            {forgotpassword}
            <div style={{ marginTop: ".5rem" }} className="divider">
              <p className="para">{footerpara}</p>
              <span onClick={formchange} className="navlink_signin">
                {buttontext}
              </span>
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}
export default Sign;
