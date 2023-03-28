import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import logo from "../../assets/images/logo.png";
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
  password: ""
};
const HINTS = {
  password: ["Password is requried"],
  email: ["Email address is requried"]
};
function Signin() {
  const navigate = useNavigate();
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
          <div className="heading left">Sign in and get started</div>
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
              <button type="submit">Sign In</button>
            </div>
            <div style={{ marginTop: "1rem" }} className="divider">
              <p className="para">
                Don<>&apos;</>t have an account ?
              </p>
              <NavLink to="/signup">
                <span className="navlink_signin">Sign Up</span>
              </NavLink>
            </div>
            <div className="divider">
              <NavLink onClick={() => navigate(-1)}>
                <span className="navlink_signin" style={{ fontSize: "1.2rem" }}>
                  Go Back
                </span>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Signin;
