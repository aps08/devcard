import { useState } from "react";
import Input from "../input/Input";
import ReactDOM from "react-dom";
import "./Account.css";
import Confirm from "../confirm/Confirm";

const MODAL_ELEMENT = document.getElementById("root-modal");

function Account() {
  const [confirm, setconfirm] = useState(false);
  const email = "8anoopsinngh@gmail.com";

  const checkconfirmation = (yesorno) => {
    console.log(yesorno);
  };

  return (
    <>
      {confirm &&
        ReactDOM.createPortal(<Confirm close={() => setconfirm(false)} check={checkconfirmation} />, MODAL_ELEMENT)}
      <div className="account">
        <h2 className="mb-2">Email settings</h2>
        <form id="change_email">
          <Input
            label="Email"
            className="occupy_two"
            type="email"
            setvalue={email}
            change={null}
            hints={null}
            valid={true}
          />
          <button type="submit">change email</button>
        </form>
        <div className="single_line"></div>
        <h2 className="mb-2">Credits</h2>
        <p style={{ marginLeft: ".4rem" }}>You have 0 devcard credits.</p>
        <div className="privacy_item form_element">
          <button>Buy credits</button>
        </div>
        <div className="single_line"></div>
        <h2 className="mb-2">Security and Privacy settings</h2>
        <div className="privacy">
          <div className="privacy_item form_element">
            <button>Update password</button>
            <p className="para">An email will be sent to your registered email with instructions to change password.</p>
          </div>
          <div className="privacy_item form_element">
            <button>Export account data</button>
            <p className="para">
              Export all information and profile metadata. Exports will be available within an hour.
            </p>
          </div>
          <div className="privacy_item form_element">
            <button onClick={() => setconfirm(true)}>Delete account</button>
            <p className="para">Once you delete your account, there is no going back. Please be certain.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
