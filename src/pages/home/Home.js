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
      <section className="offers" style={{ display: 'block' }}>
        <div>
          <h1>What we offer ?</h1>
        </div>
        <div className="offer-cards">
          <div style={{ display: 'flex' }}>
            <div className="card">
              <img
                src="https://picsum.photos/600/320?grayscale"
                alt="cardimage"
              />
              <div className="text">
                <h3>Exclusive</h3>
                <p>
                  Experience exclusivity with a pack of three event-exclusive
                  cards.
                </p>
              </div>
            </div>
            <div className="card">
              <img
                src="https://picsum.photos/600/320?grayscale"
                alt="cardimage"
              />
              <div className="text">
                <h3>Bulk</h3>
                <p>Elevate your daily routine with a pack of fifty cards.</p>
              </div>
            </div>
          </div>
          <div className="next-line">
            <div className="card">
              <img
                src="https://picsum.photos/600/320?grayscale"
                alt="cardimage"
              />
              <div className="text">
                <h3>Gift</h3>
                <p>
                  Make your buddies, colleagues or friends feel loved with
                  gifts.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="learn">
          <button>Learn more</button>
        </div>
      </section>
    </>
  );
};

export default Home;
