import { useEffect, useState } from "react";
import Updatepassword from "../updatpassword/Updatepassword";
import Input from "../input/Input";
import Confirm from "../confirm/Confirm";
import Callendpoint from "../../utils/Callendpoint";
import { clearlocaldata } from "../../store/localstorage";
import Loading from "../../utils/Loading";
import { useSelector } from "react-redux";

function Account() {
  const uemail = useSelector((state) => state.userInfo?.profile?.email);
  const ucredits = useSelector((state) => state.userInfo?.profile?.credit);
  const [validemail, setvalidemail] = useState(true);
  const [newemail, setnewemail] = useState(null);
  const [email, setemail] = useState("");
  const [credits, setcredits] = useState(0);
  const [submitted, setsubmitted] = useState(false);
  const [message, setmessage] = useState(false);
  const [error, seterror] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [updatepass, setupdatepass] = useState(false);

  useEffect(() => {
    if (uemail || ucredits) {
      setemail(uemail);
      setcredits(ucredits);
    }
    if (error || message) {
      setTimeout(() => {
        seterror(false);
        setmessage(false);
      }, 5000);
    }
  }, [uemail, ucredits, message, error]);

  useEffect(() => {}, []);

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
        }, 6000);
      } else {
        seterror(data.message);
      }
      setsubmitted(false);
    }
  };

  const emailchangehandler = (event) => {
    const { value } = event.target;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value !== email) {
      setnewemail({ email: value });
      setvalidemail(true);
    } else {
      setvalidemail(false);
    }
  };

  const changeemailsubmithandler = async (event) => {
    event.preventDefault();
    console.log();
    if (validemail && newemail) {
      setsubmitted(true);
      const { data, statuscode } = await Callendpoint("put", "/user/profile", null, newemail, true);
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

  return (
    <>
      <Loading spinner={submitted} />
      {updatepass && <Updatepassword close={() => setupdatepass(false)} />}
      {confirm && <Confirm close={() => setconfirm(false)} check={checkconfirmation} />}
      <div className="account">
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
        <h2 className="mb-1 para">Email settings</h2>
        <form id="change_email" onSubmit={changeemailsubmithandler}>
          <Input
            label="Email"
            className="mb-1"
            type="email"
            change={emailchangehandler}
            setvalue={email}
            valid={validemail}
          />
          <button type="submit">change email</button>
        </form>
        <div className="divider mt-1"></div>
        <h2 className="para">Credits</h2>
        <p className="para">{`You have ${credits} devcard credits.`}</p>
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
