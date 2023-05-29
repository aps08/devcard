import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import Input from "../../components/input/Input";
import "./ForgotPassword.css";

const INITIAL = {
  password: false,
  confirm: false
};

function ChangePassword() {
  const { token } = useParams();
  const method = token ? "PUT" : "POST";
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);
  const [ChangePass, setChangePass] = useState(INITIAL);
  const [validPass, setvalidPass] = useState(INITIAL);
  const [spinner, setspinner] = useState(false);
  const [Formdata, setFormdata] = useState("");
  const [valid, setvalid] = useState(false);
  const loading = <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />;
  const buttonpasswordcontent = spinner ? loading : <>Change password</>;
  const changeemailhandler = (event) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value);
    setvalid(isValidEmail);
    if (isValidEmail) {
      setFormdata({ email: event.target.value });
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
      delete ChangePass.confirm;
      setChangePass({ ...ChangePass, token: token });
      setspinner(true);
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
    const callingapi = async (BODY) => {
      const requestOptions = {
        method: method,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json"
        },
        body: JSON.stringify(BODY),
        mode: "cors"
      };
      try {
        const response = await fetch("/public/forgot_password", requestOptions);
        const data = await response.json();
        console.log(data, BODY);
        if (response.ok) {
          setmessage(data.message);
        } else {
          seterror(data.message);
        }
      } catch (error) {
        console.log(error);
      }
      setspinner(false);
    };

    if (spinner) {
      setmessage(false);
      seterror(false);
      if (token) {
        callingapi(ChangePass);
      } else {
        callingapi(Formdata);
      }
    }
  }, [spinner, token]);

  return (
    <div className="verify">
      <div className="verify_box">
        {token ? (
          <>
            <p className="para" style={{ marginTop: "1rem", color: "whitesmoke" }}>
              Enter new password
            </p>
            {message && (
              <p style={{ margin: "0 1rem" }} className="message">
                {message}
              </p>
            )}
            {error && (
              <p style={{ margin: "0 1rem" }} className="error">
                {error}
              </p>
            )}
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
            {message && (
              <p style={{ margin: "0 1rem" }} className="message">
                {message}
              </p>
            )}
            {error && (
              <p style={{ margin: "0 1rem" }} className="error">
                {error}
              </p>
            )}
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
