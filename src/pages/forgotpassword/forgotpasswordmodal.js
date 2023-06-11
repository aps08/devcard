import { useState } from "react";
import Input from "../../components/input/Input";
import ReactLoading from "react-loading";
import ModalWrapper from "../../utils/Modalwrapper";
import Callendpoint from "../../utils/Callendpoint";
import "./ForgotPassword.css";

const INITIAL = {
  password: false,
  confirm: false
};

function Forgotpasswordmodal(props) {
  const [Formdata, setFormdata] = useState({ ...INITIAL, token: props.token });
  const [valid, setvalid] = useState(INITIAL);
  const [submitted, setsubmitted] = useState(false);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);

  const changedhandler = (event) => {
    const { name, value } = event.target;
    if (name === "password" && /^.{8,20}$/.test(value)) {
      setvalid({ ...valid, password: true });
      setFormdata({ ...Formdata, password: value });
    }
    if (name === "confirm" && /^.{8,20}$/.test(value) && value === Formdata.password) {
      setvalid({ ...valid, confirm: true });
      setFormdata({ ...Formdata, confirm: value });
    }
  };

  const submithandler = async (event) => {
    event.preventDefault();
    const validation = valid.password && valid.confirm;
    if (validation) {
      console.log(Formdata);
      delete Formdata.confirm;
      setsubmitted(true);
      console.log(Formdata);
      const { data, statuscode } = await Callendpoint("put", "/public/forgot_password", null, Formdata);
      if (statuscode === 200) {
        setmessage(data.message);
      } else {
        seterror(data.message);
      }
      setsubmitted(false);
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
