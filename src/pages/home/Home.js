import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Card from "../../components/card/Card";
import Signup from "../../components/sign/Signup";
import Signin from "../../components/sign/Signin";
import Dashboard from "../dashboard/Dashboard";
import { CARDS } from "../../utils/Constants";
import "./Home.css";

function Home() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [showsignin, setshowsignin] = useState(false);
  const [showsignup, setshowsignup] = useState(false);

  const showmodalhandler = (type) => {
    if (type === "signin") {
      setshowsignin(true);
    }
    if (type === "signup") {
      setshowsignup(true);
    }
  };

  const formchange = () => {
    setshowsignin(!showsignin);
    setshowsignup(!showsignup);
  };

  const closemodal = () => {
    setshowsignin(false);
    setshowsignup(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <>
          {showsignin && <Signin formchange={formchange} close={closemodal} />}
          {showsignup && <Signup formchange={formchange} close={closemodal} />}
          <section className="section">
            <div className="first">
              <h3 className="heading">
                Impress with Devcards.
                <br />
                Showcase expertise
                <br />
                professionally.
              </h3>
              <p className="para">
                Stand out from the competition with our high-quality business cards designed to showcase your skills and
                expertise as a developer.
              </p>
              <NavLink to="/demo">
                <button>Try demo now</button>
              </NavLink>
            </div>
            <div>
              <div className="right">
                <img className="image_view" src="https://picsum.photos/600/320?grayscale" alt="cardimage" />
              </div>
            </div>
          </section>
          <section className="section mt-2">
            <div>
              <div className="left">
                <img className="image_view" src="https://picsum.photos/600/320?grayscale" alt="cardimage" />
              </div>
            </div>
            <div className="second">
              <h3 className="heading">
                Get exclusive devcard.
                <br />
                In five easy steps.
              </h3>
              <p className="para">
                Create your account.
                <br />
                Fill skills and other details.
                <br />
                Buy credits.
                <br />
                Order your favorite card.
                <br />
                Get your devcard on your doorstep.
              </p>
              <button onClick={() => showmodalhandler("signup")}>Sign up for free</button>
            </div>
          </section>
          <h3 className="heading center mt-2">What we offer ?</h3>
          <section className="section">
            {CARDS.map((card) => (
              <Card
                key={card.label}
                label={card.label}
                para={card.para}
                list={card.list}
                buttonlabel={card.buttonlabel}
                description={card.description}
              />
            ))}
          </section>
        </>
      )}
    </>
  );
}

export default Home;
