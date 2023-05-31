import { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import ReactLoading from "react-loading";
import ModalWrapper from "../../helper/Modalwrapper";
import "./ForgotPassword.css";

function Enteremailmodal(props) {
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [Formdata, setFormdata] = useState("");
  const [valid, setvalid] = useState(false);

  const changehandler = (event) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value);
    setvalid(isValidEmail);
    if (isValidEmail) {
      setFormdata({ email: event.target.value });
    }
  };

  const submithandler = (event) => {
    event.preventDefault();
    if (valid) {
      setsubmitted(true);
    } else {
      const inputfield = document.querySelector(`input[name="email"]`);
      inputfield.focus();
      inputfield.scrollIntoView({ block: "center" });
    }
  };

  useEffect(() => {
    const callingapi = async () => {
      const requestOptions = {
        method: "POST",
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
      callingapi(Formdata);
    }
  }, [submitted]);

  return (
    <ModalWrapper close={props.close}>
      <div className="justify-center" id="modalsign">
        <div className="main_div">
          <div className="heading left">Enter registered email</div>
          {message && <p className="message">{message}</p>}
          {error && <p className="error">{error}</p>}
          <form id="forgotpassword" onSubmit={submithandler}>
            <Input
              label="EMAIL"
              placeholder="aps08@email.com"
              hints={["Enter a correct email address"]}
              change={changehandler}
              type="email"
              valid={valid}
            />
            <div className="form_element">
              {submitted ? (
                <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />
              ) : (
                <button type="submit">Submit</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default Enteremailmodal;
