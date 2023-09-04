import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Callendpoint from "../../utils/Callendpoint";

function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);

  const verifytoken = async () => {
    const { data, statuscode } = await Callendpoint("GET", "/public/verify_email", { token: token }, null);
    if (statuscode === 200) {
      setmessage(data.message);
      console.log(message);
    } else {
      seterror(data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token.length === 22) {
      verifytoken();
    } else {
      navigate("/home");
    }
  }, [token]);

  return (
    <>
      <div
        className="justify-center"
        id="modalsign"
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <div className="main_div" style={{ width: "320px" }}>
          <div className="heading center mb-2">Verifying email</div>
          {message && <p className="message">{message}</p>}
          {error && <p className="error">{error}</p>}
          {!message && !error && (
            <div className="form_element">
              <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />
              <p className="para center">Please wait while we verify your email address.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Verify;
