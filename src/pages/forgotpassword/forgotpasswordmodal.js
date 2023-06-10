import { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import ReactLoading from "react-loading";
import ModalWrapper from "../../helper/Modalwrapper";
import "./ForgotPassword.css";

const INITIAL = {
  password: false,
  confirm: false
};

function Forgotpasswordmodal(props) {
  const [Formdata, setFormdata] = useState(INITIAL);
  const [valid, setvalid] = useState(INITIAL);
  const [submitted, setsubmitted] = useState(false);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);

  const changedhandler = (event) => {
    const isMatched = event.target.value === Formdata.password;
    setvalid({
      ...valid,
      confirm: isMatched
    });
    if (isMatched) {
      setFormdata({ ...Formdata, confirm: event.target.value });
    }
  };

  const submithandler = (event) => {
    event.preventDefault();
    const validation = valid.password && valid.confirm;
    if (validation) {
      delete Formdata.confirm;
      setFormdata({ ...Formdata, token: props.token });
      setsubmitted(true);
    } else {
      for (const key in valid) {
        if (valid[key] !== true) {
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
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json"
        },
        body: JSON.stringify(Formdata),
        mode: "cors"
      };
      try {
        const response = await fetch("/public/forgot_password", requestOptions);
        const data = await response.json();
        if (response.ok) {
          setmessage(data.message);
        } else {
          seterror(data.message);
        }
      } catch (error) {
        console.log(error);
      }
      setsubmitted(false);
    };
    if (submitted) {
      setmessage(false);
      seterror(false);
      callingapi();
    }
  }, [submitted]);

  return (
    <ModalWrapper close={props.close}>
      <div className="justify-center">
        <div className="main_div">
          <div className="heading left">Reset password</div>
          {message && <p className="message">{message}</p>}
          {error && <p className="error">{error}</p>}
          <form id="changepassword" onSubmit={submithandler}>
            <Input
              label="PASSWORD"
              placeholder="*********"
              hints={["Password must be 8 to 20 characters long"]}
              change={changedhandler}
              type="password"
              valid={valid["password"]}
            />
            <Input
              label="CONFIRM"
              placeholder="*********"
              hints={["Confirm password must match with password"]}
              change={changedhandler}
              type="password"
              valid={valid["confirm"]}
            />
            <div className="form_element">
              {submitted ? (
                <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />
              ) : (
                <button type="submit">Change password</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default Forgotpasswordmodal;
