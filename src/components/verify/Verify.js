import { useParams } from "react-router-dom";
import { useState } from "react";
import ReactLoading from "react-loading";
import "./Verify.css";

function Verify() {
  const [quote, setquote] = useState([]);
  const [check, setcheck] = useState(false);
  const [verified, setverified] = useState(false);
  const { token } = useParams();
  const factshandler = async () => {
    try {
      const response = await fetch("https://animechan.vercel.app/api/random");
      const data = await response.json();
      setquote(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="verify">
      <div className="verify_box">
        <div>
          {!verified && !check && (
            <>
              <ReactLoading type="bars" color="#9B870C" height="80px" width="80px" className="reactloading" />
              <p className="para" style={{ color: "rgba(255, 255, 0,.6)" }}>
                Please wait while we verify your email address.
                <br /> Meanwhile, you can click on the button below to read something.
              </p>
              {quote && (
                <p className="para" style={{ fontSize: "1rem", color: "rgba(255, 255, 0,.6)", fontWeight: "bold" }}>
                  {quote.quote}
                </p>
              )}
              <button onClick={factshandler}>Click me</button>
            </>
          )}
          {verified && check && (
            <p className="para" style={{ color: "rgba(0, 255, 0,.6)" }}>
              Your email is verified successfully.
              <br /> Sign In and enjoy our services.
            </p>
          )}
          {verified && !check && (
            <p className="para" style={{ color: "brown" }}>
              Email verification failed. <br />
              We have resent an email for verification.
              <br /> Kindly check your email inbox for verification link.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Verify;
