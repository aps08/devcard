import ReactDOM from "react-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Card from "../../components/card/Card";
import Sign from "../../components/sign/Sign";
import "./Home.css";

const MODAL_ELEMENT = document.getElementById("root-modal");
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
  const [show, setshow] = useState(false);

  const showmodalhandler = () => {
    document.body.style.overflow = "hidden";
    setshow(true);
  };

  const closemodal = () => {
    setshow(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      {show && ReactDOM.createPortal(<Sign show={false} close={closemodal} />, MODAL_ELEMENT)}
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
            <img className="showcase" src="https://picsum.photos/600/320?grayscale" alt="cardimage" />
          </div>
        </div>
      </section>
      <section className="section">
        <div>
          <div className="left">
            <img className="showcase" src="https://picsum.photos/600/320?grayscale" alt="cardimage" />
          </div>
        </div>
        <div className="second">
          <h3 className="heading">
            Get exclusive devcard.
            <br />
            In four easy steps.
          </h3>
          <p className="para">
            Create your account.
            <br />
            Buy or earn credits.
            <br />
            Fill skills and other details.
            <br />
            Get your devcard on your doorstep.
          </p>
          <button onClick={showmodalhandler}>Sign up for free</button>
        </div>
      </section>
      <div className="mt-2">
        <h3 className="heading center line">What we offer ?</h3>
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
      </div>
    </>
  );
}

export default Home;
