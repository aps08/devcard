import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Card from "../../components/card/Card";
import Signup from "../../components/sign/Signup";
import Signin from "../../components/sign/Signin";
import Dashboard from "../dashboard/Dashboard";
import card from "../../assets/images/homecard.png";
import "./Home.css";

const CARDS = [
  {
    label: "Exclusive",
    para: "Experience exclusivity with three event exclusive cards.",
    list: ["Credit 5", "Mutiple designs"],
    buttonlabel: "Buy 5 credits",
    description:
      "Get 3 exclusive cards for exclusive events for premium audience. The main focus of these card are quality and durability. In this pack you get to choose mutiple design of cards, and purchase for only 5 credit points."
  },
  {
    label: "Bulk",
    para: "Elevate your daily routine with a pack of thirty cards.",
    list: ["Credit 6", "Single designs"],
    buttonlabel: "Buy 6 credits",
    description:
      "Get 50 cards for long term purpose. These are focused on the quantity and your daily routine. In this pack you get to choose a single design, and purchase for only 6 credit points."
  },
  {
    label: "Gifts",
    para: "Send mutiple devcard to your buddies and colleagues.",
    list: ["Credit customized", "Pay upon acceptance."],
    buttonlabel: "Buy credits",
    description:
      "Send one devcard to your buddies and colleagues. Credit will be deducted only if your friend has accepted the gift and provided there details."
  },
  {
    label: "Corporate",
    para: "Empowering corporate world with custom card and gifts.",
    list: ["Credit customized", "Early access."],
    buttonlabel: "Buy credits",
    description:
      "If you are organizing an event or from an organization, and want to give cards to you audience as an appreciation, then you can choose this offer. We will reach out to you for details."
  }
];

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
                <img className="image_view" src={card} alt="cardimage" />
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
