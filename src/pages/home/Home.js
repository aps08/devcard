import Card from '../../components/card/Card';
import './Home.css';

const Home = () => {
  return (
    <>
      <section className="section">
        <div className="tagline">
          <h3 className="heading">
            Impress with Devcards.
            <br />
            Showcase expertise
            <br />
            professionally.
          </h3>
          <p>
            Stand out from the competition with our high-quality business cards
            designed to showcase your skills and expertise as a developer.
          </p>
          <button>Try demo now</button>
        </div>
        <div>
          <div className="text-right">
            <img
              src="https://picsum.photos/600/320?grayscale"
              alt="cardimage"
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div>
          <div className="text-left">
            <img
              src="https://picsum.photos/600/320?grayscale"
              alt="cardimage"
            />
          </div>
        </div>
        <div className="tag">
          <h3 className="heading">
            Get exclusive devcard.
            <br />
            In four easy steps.
          </h3>
          <p>
            Create your account.
            <br />
            Buy or earn credits.
            <br />
            Fill skills and other details.
            <br />
            Get your devcard on your doorstep.
          </p>
          <button className="long-text"></button>
        </div>
      </section>
      <div>
        <h3 className="heading service text-style">What we offer ?</h3>
        <section className="section offer-cards" id="offers">
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
};

export default Home;
