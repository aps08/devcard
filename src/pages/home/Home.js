import Card from '../../components/card/Card';
import './Home.css';

const Home = () => {
  return (
    <>
      <section>
        <div className="tag">
          <h3>
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
          <button className="l-text"></button>
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
      <section>
        <div>
          <div className="text-left">
            <img
              src="https://picsum.photos/600/320?grayscale"
              alt="cardimage"
            />
          </div>
        </div>
        <div className="tag">
          <h3>
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
            Select and get your devcard.
          </p>
          <button>Try demo now</button>
        </div>
      </section>
      <div>
        <h3 className="service text-style">What we offer ?</h3>
        <section className="offer-cards">
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
