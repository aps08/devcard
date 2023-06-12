import { useEffect, useState } from "react";
import Input from "../input/Input";
import ReactLoading from "react-loading";
import ModalWrapper from "../../utils/Modalwrapper";
import Callendpoint from "../../utils/Callendpoint";
import "./Updatepassword.css";
import { clearlocaldata } from "../../store/localstorage";

const CHECKS = {
  old_password: /^.{8,20}$/,
  new_password: /^.{8,20}$/
};

const HINTS = {
  old_password: ["Password must be 8 to 20 characters long"],
  new_password: ["Password must be 8 to 20 characters long", "New password cannot be same as old password"]
};

const INITIAL = {
  old_password: false,
  new_password: false
};

function Updatepassword(props) {
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [Formdata, setFormdata] = useState(INITIAL);
  const [validate, setvalidate] = useState(INITIAL);

  const changedhandler = (event) => {
    seterror(false);
    setmessage(false);
    const { name, value } = event.target;
    if (CHECKS[name].test(value)) {
      setvalidate({ ...validate, [name]: true });
      setFormdata({ ...Formdata, [name]: value });
    } else {
      setvalidate({ ...validate, [name]: false });
    }
  };

  const submithandler = async (event) => {
    seterror(false);
    setmessage(false);
    event.preventDefault();
    const allTrueValues = Object.values(validate).every((value) => value === true);
    if (allTrueValues) {
      if (Formdata["new_password"] === Formdata["old_password"]) {
        seterror("Both password cannot be same");
      } else {
        setsubmitted(true);
        const { data, statuscode } = await Callendpoint("post", "/user/profile", null, Formdata, true);
        if (statuscode === 200) {
          setmessage(data.message);
        } else {
          seterror(data.message);
        }
        setsubmitted(false);
      }
    } else {
      for (const key in validate) {
        if (validate[key] !== true) {
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
          <div className="heading left">Update password</div>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <form id="updatepassword" onSubmit={submithandler} name="updatepassword">
            <Input
              label="old password"
              name="old_password"
              type="password"
              setvalue={null}
              change={changedhandler}
              hints={HINTS["old_password"]}
              valid={validate["old_password"]}
            />
            <Input
              label="new password"
              name="new_password"
              type="password"
              setvalue={null}
              change={changedhandler}
              hints={HINTS["new_password"]}
              valid={validate["new_password"]}
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

export default Updatepassword;
