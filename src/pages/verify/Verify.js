import { useParams } from "react-router-dom";
import { useState } from "react";
import ReactLoading from "react-loading";
import "./Verify.css";

function Verify() {
  const [check, setcheck] = useState(false);
  const [verified, setverified] = useState(false);
  const { token } = useParams();
  console.log(token, setcheck, setverified);

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
          {verified && (
            <p className={`para ${check ? "success" : "failed"}`}>
              {check ? (
                <>
                  Your email is verified successfully.
                  <br /> Sign In and enjoy our services.
                </>
              ) : (
                <>
                  Email verification failed. <br />
                  We have resent an email for verification.
                  <br /> Kindly check your email inbox for verification link.
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Verify;
