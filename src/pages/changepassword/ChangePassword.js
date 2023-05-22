import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import Input from "../../components/input/Input";
import "./ChangePassword.css";

function ChangePassword() {
  const { token } = useParams();
  const [spinner, setspinner] = useState(false);
  const [Formdata, setFormdata] = useState("");
  const [valid, setvalid] = useState(false);
  const loading = <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />;
  const buttonemailcontent = spinner ? loading : <>Forgot password</>;
  const buttonpasswordcontent = spinner ? loading : <>Change password</>;
  const changeemailhandler = (event) => {
    const value = event.target.value;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setvalid(true);
      setFormdata(value);
    } else {
      setvalid(false);
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
            <p className="para">Enter new password</p>
            <form id="changepassword" onSubmit={submitemailhandler}>
              <Input
                label="PASSWORD"
                placeholder="*********"
                hints={["Password must be 8 to 20 characters long"]}
                change={null}
                type="password"
                valid={false}
              />
              <Input
                label="CONFIRM PASSWORD"
                placeholder="*********"
                hints={["Password must be 8 to 20 characters long", "Confirm password must match with password"]}
                change={null}
                type="password"
                valid={false}
              />
              <button type="submit" disabled={spinner}>
                {buttonpasswordcontent}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="para">Enter your registered email address</p>
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
                {buttonemailcontent}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
