import './Home.css';
import logo from '../../assets/images/logo.png';

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
            <img src={logo} alt="cardimage" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
