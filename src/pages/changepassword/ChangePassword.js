import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import Input from "../../components/input/Input";
import "./ChangePassword.css";

function ChangePassword() {
  const { token } = useParams();
  const [ChangePass, setChangePass] = useState({
    password: "",
    confirm: ""
  });
  const [validPass, setvalidPass] = useState({
    password: false,
    confirm: false
  });
  const [spinner, setspinner] = useState(false);
  const [Formdata, setFormdata] = useState("");
  const [valid, setvalid] = useState(false);
  const loading = <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />;
  const buttonpasswordcontent = spinner ? loading : <>Change password</>;
  const changeemailhandler = (event) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value);
    setvalid(isValidEmail);
    if (isValidEmail) {
      setFormdata(event.target.value);
    }
  };

  const newpasswordhandler = (event) => {
    const isValidPassword = /^.{8,}$/.test(event.target.value);
    setvalidPass({ ...validPass, password: isValidPassword });
    if (isValidPassword) {
      setChangePass({ ...ChangePass, password: event.target.value });
    }
  };

  const confirmpasswordhandler = (event) => {
    const isMatched = event.target.value === ChangePass.password;
    setvalidPass({
      ...validPass,
      confirm: isMatched
    });
    if (isMatched) {
      setChangePass({ ...ChangePass, confirm: event.target.value });
    }
  };

  const submitemailhandler = (event) => {
    event.preventDefault();
    if (valid) {
      setspinner(true);
    } else {
      const inputfield = document.querySelector(`input[name="email"]`);
      inputfield.focus();
      inputfield.scrollIntoView({ block: "center" });
    }
  };
  const submitpasswordhandler = (event) => {
    event.preventDefault();
    const validation = validPass.password && validPass.confirm;
    if (validation) {
      console.log(ChangePass);
    } else {
      for (const key in validPass) {
        if (validPass[key] !== true) {
          const inputfield = document.querySelector(`input[name=${key}]`);
          inputfield.focus();
          inputfield.scrollIntoView({ block: "center" });
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (spinner) {
      console.log({ email: Formdata });
    }
  }, [spinner]);

  return (
    <div className="verify">
      <div className="verify_box">
        {token ? (
          <>
            <p className="para" style={{ marginTop: "1rem", color: "whitesmoke" }}>
              Enter new password
            </p>
            <form id="changepassword" onSubmit={submitpasswordhandler}>
              <Input
                label="PASSWORD"
                placeholder="*********"
                hints={["Password must be 8 to 20 characters long"]}
                change={newpasswordhandler}
                type="password"
                valid={validPass["password"]}
              />
              <Input
                label="CONFIRM"
                placeholder="*********"
                hints={["Confirm password must match with password"]}
                change={confirmpasswordhandler}
                type="password"
                valid={validPass["confirm"]}
              />
              <button type="submit" disabled={spinner}>
                {buttonpasswordcontent}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="para" style={{ marginTop: "1rem", color: "whitesmoke" }}>
              Enter your registered email address
            </p>
            <form id="forgotpassword" onSubmit={submitemailhandler}>
              <Input
                label="EMAIL"
                placeholder="aps08@email.com"
                hints={["Enter a correct email address"]}
                change={changeemailhandler}
                type="email"
                valid={valid}
              />
              <button type="submit" disabled={spinner}>
                {buttonpasswordcontent}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
