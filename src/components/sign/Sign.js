import { useState } from "react";
import Input from "../input/Input";
import ReactLoading from "react-loading";
import ModalWrapper from "../../helper/Modalwrapper";
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

function Sign(props) {
  const [show, setshow] = useState(!props.show);
  const loading = <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />;
  const [spinner, setspinner] = useState(false);
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
      setspinner(true);
      console.log(Formdata);
      setTimeout(() => {
        setspinner(false);
        props.close();
      }, 5000);
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
          <div className="heading left">{show ? <>Create account</> : <>Get started</>}</div>
          <form id={show ? "signin" : "signup"} onSubmit={submithandler} name={show ? "signin" : "signup"}>
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
                {spinner ? loading : show ? <>Sign up</> : <>Sign in</>}
              </button>
            </div>
            <div style={{ marginTop: "1rem" }} className="divider">
              <p className="para">{show ? <>Already have an account ?</> : <>Don&apos;t have an account ?</>}</p>
              <span onClick={() => setshow(!show)} className="navlink_signin">
                {show ? <>Sign in</> : <>Sign up</>}
              </span>
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}
export default Sign;
