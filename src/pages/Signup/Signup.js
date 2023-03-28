import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import logo from "../../assets/images/logo.png";
import "./Signup.css";

const CHECKS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^.{8,20}$/,
  confirm_password: /^.{8,20}$/
};
const HINTS = {
  password: ["Password must be 8 to 20 characters long"],
  email: ["Enter a correct email address"],
  confirm_password: ["Password must match"]
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

function Signup() {
  const navigate = useNavigate();
  const [Formdata, setFormdata] = useState(INITIAL);
  const [validate, setvalidate] = useState(INITIAL);
  const matchpasswordhandler = (event) => {
    if (event.target.value === Formdata["password"]) {
      setvalidate({ ...validate, confirm_password: true });
      setFormdata({ ...Formdata, confirm_password: event.target.value });
    } else {
      setvalidate({ ...validate, confirm_password: false });
    }
  };
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
            <Input
              label="CONFIRM PASSWORD"
              change={matchpasswordhandler}
              valid={validate["confirm_password"]}
              type="password"
              placeholder="***********"
              hints={HINTS["confirm_password"]}
            />
            <div className="form_element">
              <button type="submit">Create account</button>
            </div>
          </form>
          <div style={{ marginTop: "1rem" }} className="divider">
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
          <div className="divider">
            <NavLink onClick={() => navigate(-1)}>
              <span className="navlink_signin" style={{ fontSize: "1.2rem" }}>
                Go Back
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
