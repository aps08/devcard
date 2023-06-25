import { useEffect, useState } from "react";
import Updatepassword from "../updatpassword/Updatepassword";
import ReactLoading from "react-loading";
import Input from "../input/Input";
import ReactDOM from "react-dom";
import Confirm from "../confirm/Confirm";
import Backdrop from "../../utils/Backdrop";
import Callendpoint from "../../utils/Callendpoint";
import { MODAL_ELEMENT, BACKDROP_ELEMENT } from "../../utils/Constants";
import { clearlocaldata } from "../../store/localstorage";

function Account() {
  const [submitted, setsubmitted] = useState(false);
  const [message, setmessage] = useState(false);
  const [error, seterror] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [updatepass, setupdatepass] = useState(false);
  const email = "8anoopsinngh@gmail.com";

  const exporthandler = async () => {
    setsubmitted(true);
    const { data, statuscode } = await Callendpoint("get", "/user/account", null, null, true);
    if (statuscode === 200) {
      setmessage(data.message);
    } else {
      seterror(data.message);
    }
    setsubmitted(false);
  };

  const checkconfirmation = async (yesorno) => {
    if (yesorno) {
      setsubmitted(true);
      const { data, statuscode } = await Callendpoint("delete", "/user/account", null, null, true);
      if (statuscode === 200) {
        setmessage(data.message);
        setTimeout(() => {
          clearlocaldata();
          window.location.reload();
        }, 3000);
      } else {
        seterror(data.message);
      }
      setsubmitted(false);
    }
  };

  useEffect(() => {
    if (error || message) {
      setTimeout(() => {
        seterror(false);
        setmessage(false);
      }, 3000);
    }
  }, [error, message]);

  return (
    <>
      {submitted &&
        ReactDOM.createPortal(
          <Backdrop close={null}>
            <ReactLoading type="spin" color="#fff" height="100px" width="100px" />
          </Backdrop>,
          BACKDROP_ELEMENT
        )}
      {updatepass && ReactDOM.createPortal(<Updatepassword close={() => setupdatepass(false)} />, MODAL_ELEMENT)}
      {confirm &&
        ReactDOM.createPortal(<Confirm close={() => setconfirm(false)} check={checkconfirmation} />, MODAL_ELEMENT)}
      <div className="account">
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
        <h2 className="mb-1 para">Email settings</h2>
        <form id="change_email">
          <Input label="Email" className="mb-1" type="email" setvalue={email} change={null} hints={null} valid={true} />
          <button type="submit">change email</button>
        </form>
        <div className="divider mt-1"></div>
        <h2 className="para">Credits</h2>
        <p className="para">You have 0 devcard credits.</p>
        <div className=" form_element">
          <button>Buy credits</button>
        </div>
        <div className="divider mt-1"></div>
        <h2 className="mb-1 para">Security and Privacy settings</h2>
        <div className="form_element">
          <button onClick={() => setupdatepass(true)}>Update password</button>
          <p className="para">An email will be sent to your registered email with instructions to change password.</p>
        </div>
        <div className="form_element">
          <button onClick={exporthandler}>Export account data</button>
          <p className="para">Export all information and profile metadata. Exports will be available within an hour.</p>
        </div>
        <div className="form_element">
          <button onClick={() => setconfirm(true)}>Delete account</button>
          <p className="para">Once you delete your account, there is no going back. Please be certain.</p>
        </div>
      </div>
    </>
  );
}

export default Account;
