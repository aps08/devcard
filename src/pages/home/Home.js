import Card from '../../components/card/Card';
import './Home.css';

const Home = () => {
  return (
    <>
      <section className="tag-card">
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
          <div className="card">
            <img
              src="https://picsum.photos/600/320?grayscale"
              alt="cardimage"
            />
          </div>
        </div>
      </section>
      <section className="stepper">
        <div>
          <div className="card">
            <img
              src="https://picsum.photos/600/320?grayscale"
              alt="cardimage"
            />
          </div>
        </div>
        <div className="steps">
          <h3>Get your devcard. In four steps.</h3>
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
      <section className="offers">
        <h3 className="head">What we offer ?</h3>
        <div className="offer-cards">
          <Card
            label="Event exclusive"
            para="Experience exclusivity with event-exclusive
                  cards."
            list={['Get three cards', 'Credit 5', 'Mutiple designs']}
          />
          <Card
            label="Bulk cards"
            para="Elevate your daily routine with a pack of cards."
            list={['Get thirty cards', 'Credit 6', 'Single designs']}
          />
          <Card
            label="Send gifts"
            para="Send devcard to your buddies and colleagues."
            list={[
              'Send mutiple devcards',
              'Credit customized',
              'Pay upon acceptance.'
            ]}
          />
          <Card
            label="Organization"
            para="Empowering organizations with custom card and  gifts."
            list={[
              'Get mutiple cards.',
              'Credit customized',
              'Early access to latest design.'
            ]}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
