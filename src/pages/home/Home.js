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
          <h3>Get your devcard. In three steps.</h3>
          <p>
            Create your account.
            <br />
            Fill skills and other details.
            <br />
            Select and get your devcard.
          </p>
          <button>Try demo now</button>
        </div>
      </section>
    </>
  );
};

export default Home;
