import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Input from "../input/Input";
import ReactLoading from "react-loading";
import ModalWrapper from "../../helper/Modalwrapper";
import { setLocalStorage } from "../../store/localstorageoperations";
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

function Signin(props) {
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
        const response = await fetch("/auth/login", requestOptions);
        const data = await response.json();
        if (response.ok) {
          setmessage(data.message);
          setLocalStorage(data);
          window.location.reload();
        } else {
          seterror(data.message);
        }
        setsubmitted(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (submitted) {
      seterror(false);
      setmessage(false);
      callingapi();
    }
  }, [submitted]);

  return (
    <ModalWrapper close={props.close}>
      <div className="justify-center" id="modalsign">
        <div className="main_div">
          <div className="heading left">Get started</div>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <form id="signin" onSubmit={submithandler} name="signin">
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
              <button type="submit" style={{ height: "39px" }} disabled={submitted}>
                {!submitted ? (
                  <>Submit</>
                ) : (
                  <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />
                )}
              </button>
            </div>
            <NavLink to="/forgotpassword">
              <p onClick={props.close} className="forgot_pass">
                Forgot password
              </p>
            </NavLink>
            <div style={{ marginTop: ".5rem" }} className="divider">
              <p className="para">Don&apos;t have an account ?</p>
              <span onClick={props.formchange} className="navlink_signin">
                Sign up
              </span>
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default Signin;
