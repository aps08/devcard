import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import "./Verify.css";

function Verify() {
  const [check, setcheck] = useState(false);
  const [verified, setverified] = useState(false);
  const [message, setmessage] = useState("");
  const { token } = useParams();
  const apiendpoint = "/public/verify_email?token=" + token;
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json"
      },
      mode: "cors"
    };

    const callingapi = async () => {
      try {
        const response = await fetch(apiendpoint, requestOptions);
        const data = await response.json();
        setverified(true);
        setmessage(data.message);
        if (response.ok) {
          setcheck(true);
        } else {
          setcheck(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      callingapi();
    }
  }, [token]);

  return (
    <div className="verify">
      <div className="verify_box">
        <div>
          {!verified && !check && (
            <>
              <ReactLoading type="bars" height="60px" width="60px" className="reactloading" />
              <p className="para progress">Please wait while we verify your email address.</p>
            </>
          )}
          {verified && <p className={`para ${check ? "message" : "error"}`}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Verify;
