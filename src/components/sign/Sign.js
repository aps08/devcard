import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Input from "../input/Input";
import ReactLoading from "react-loading";
import ModalWrapper from "../../helper/Modalwrapper";
import useFetchpublic from "../../helper/useFetchPublic";
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
  const loading = <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />;
  const [spinner, setspinner] = useState(false);
  const [Formdata, setFormdata] = useState(INITIAL);
  const [validate, setvalidate] = useState(INITIAL);
  const title = show ? <>Create account</> : <>Get started</>;
  const formid = show ? "signin" : "signup";
  const footerpara = show ? <>Already have an account ?</> : <>Don&apos;t have an account ?</>;
  const buttoncontent = spinner ? loading : show ? <>Sign up</> : <>Sign in</>;
  const footernav = show ? <>Sign in</> : <>Sign up</>;
  const apiendpoint = show ? "/auth/register" : "/auth/login";
  const forgotpassword = show ? (
    ""
  ) : (
    <p onClick={props.close} className="forgot_pass">
      Forgot password
    </p>
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
    const callingapi = async () => {
      const { response, statuscode } = useFetchpublic(apiendpoint, "POST", Formdata);
      if (show && statuscode === 200) {
        setmessage(response);
      } else if (!show && statuscode === 200) {
        setLocalStorage(response);
        window.location.reload();
      } else {
        seterror(response);
      }

      setspinner(false);
    };

    if (spinner) {
      callingapi();
    }
  }, [spinner]);

  return (
    <ModalWrapper close={props.close}>
      <div className="justify-center">
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
              <button type="submit" style={{ height: "39px" }} disabled={spinner}>
                {buttoncontent}
              </button>
            </div>
            <NavLink to="/forgotpassword">{forgotpassword}</NavLink>
            <div style={{ marginTop: ".5rem" }} className="divider">
              <p className="para">{footerpara}</p>
              <span onClick={() => setshow(!show)} className="navlink_signin">
                {footernav}
              </span>
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}
export default Sign;
