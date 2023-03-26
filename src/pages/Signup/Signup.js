import { useState } from "react";
import Input from "../../components/input/Input";
import logo from "../../assets/images/logo.png";
import "./Signup.css";
const CHECKS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/
};
const HINTS = {
  password: [
    "Password should contains uppercase letters, lowercase letters, numbers, and must be between 8 and 20 characters long"
  ],
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
    placeholder: "**************"
  }
];
const INITIAL = {
  email: "",
  password: ""
};
function Signup() {
  const [buttondisabled, setbuttondisabled] = useState(true);
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
    const allTrueValues = Object.values(validate).every((value) => value === true);
    console.log(allTrueValues);
    if (allTrueValues) {
      setbuttondisabled(false);
    } else {
      setbuttondisabled(true);
    }
  };
  const submithandler = (event) => {
    event.preventDefault();
    console.log(Formdata);
  };
  return (
    <>
      <div className="branding pd-4">
        <img className="brand_image" src={logo} alt="React Image" />
        <span className="brand_name">Devcards</span>
      </div>
      <div className="justify-center">
        <div style={{ display: "block" }}>
          <div className="heading left">Create your account for free</div>
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
              <button type="submit" disabled={buttondisabled}>
                Create account
              </button>
              {buttondisabled && (
                <p className="para center" style={{ fontSize: "14px" }}>
                  Fill the form to make this button clickable.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
