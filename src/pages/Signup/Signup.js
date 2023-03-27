import { useState } from "react";
import { NavLink } from "react-router-dom";
import Input from "../../components/input/Input";
import logo from "../../assets/images/logo.png";
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
    placeholder: "**************"
  }
];
const INITIAL = {
  email: "",
  password: ""
};

function Signup() {
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
      console.log(Formdata);
    }
  };
  return (
    <>
      <div className="branding pd-4">
        <img className="brand_image" src={logo} alt="React Image" />
        <span className="brand_name">Devcards</span>
      </div>
      <div className="justify-center">
        <div className="main_div">
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
              <button type="submit">Create account</button>
            </div>
          </form>
          <div className="divider">
            <p className="para">Already have an account ?</p>
            <NavLink to="/signin">
              <span className="navlink_signin">Sign In</span>
            </NavLink>
          </div>
          <div className="divider">
            <p className="para" style={{ fontSize: "14px" }}>
              By creating an account, you agree to the Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
