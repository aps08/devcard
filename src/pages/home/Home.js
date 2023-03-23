import { NavLink } from 'react-router-dom';
import Card from '../../components/card/Card';
import './Home.css';

function Home() {
  return (
    <>
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
            Stand out from the competition with our high-quality business cards
            designed to showcase your skills and expertise as a developer.
          </p>
          <NavLink to="/demo">
            <button>Try demo now</button>
          </NavLink>
        </div>
        <div>
          <div className="right">
            <img
              className="showcase"
              src="https://picsum.photos/600/320?grayscale"
              alt="cardimage"
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div>
          <div className="left">
            <img
              className="showcase"
              src="https://picsum.photos/600/320?grayscale"
              alt="cardimage"
            />
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
          <NavLink to="/signup">
            <button>Sign up for free</button>
          </NavLink>
        </div>
      </section>
      <div>
        <h3 className="heading center line">What we offer ?</h3>
        <section className="section cards">
          <Card
            label="Event exclusive"
            para="Experience exclusivity with three event-exclusive
                  cards."
            list={['Credit 5', 'Mutiple designs']}
            buttonlabel="Buy 5 credits"
          />
          <Card
            label="Bulk cards"
            para="Elevate your daily routine with a pack of thirty cards."
            list={['Credit 6', 'Single designs']}
            buttonlabel="Buy 6 credits"
          />
          <Card
            label="Send gifts"
            para="Send mutiple devcard to your buddies and colleagues."
            list={['Credit customized', 'Pay upon acceptance.']}
            buttonlabel="Buy credits"
          />
          <Card
            label="Organization"
            para="Empowering organizations with custom card and gifts."
            list={['Credit customized', 'Early access.']}
            buttonlabel="Buy credits"
          />
        </section>
      </div>
    </>
  );
}

export default Home;
