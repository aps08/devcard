import './About.css';
import Input from '../../components/input/Input';

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div>
          <h3>About us</h3>
          <p>
            DevCard is the go-to platform for developers to create professional
            business cards that showcase their skills and expertise. Our
            user-friendly platform allows you to get cards that reflect your
            brand and communicate your value proposition. Join us today to
            elevate your professional image and succeed in your career!
          </p>
          <p>
            Give our demo a try if you&apos;re unsure whether you need it or
            not.{' '}
          </p>
          <button>Try demo now</button>
        </div>
        <div>
          <h3>What we do</h3>
          <p>
            We help you stand out in a crowded market and elevate your
            professional image with our exceptional business cards.Our
            exceptional business cards are designed to elevate your profile and
            differentiate you from your competitors.
          </p>
          <p>
            As a developer, your skills and expertise are vital to your success,
            and our high-quality cards are tailored to showcase them. With a
            focus on quality, our cards are crafted using premium materials and
            modern designs that exude professionalism and sophistication.
            Whether you&lsquo;re networking at a conference or meeting a
            potential client, our cards will make a lasting impression and
            communicate your brand&lsquo;s value.
          </p>
        </div>
      </section>
      <section id="contactfeedback">
        <div>
          <h3>Contacts and Feedback</h3>
          <p>Fill the form below for contacting or any feedback.</p>
          <form className="cfform">
            <Input label="NAME" required={true} placeholder="enter full name" />
            <Input
              label="EMAIL"
              type="email"
              required={true}
              placeholder="enter email"
            />
            <div className="form_element cfmessage">
              <label>MESSAGE</label>
              <textarea
                style={{ height: '4rem' }}
                placeholder="type you message here"
                required
                name="message"></textarea>
            </div>
            <div className="form_element">
              <button type="submit">Submit</button>
            </div>
          </form>
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
      <section className="about" id="earncredits">
        <div>
          <h3>How to earn credits?</h3>
          <p>
            In simple words, you can contribute to this project and earn
            credits, you can use those credits to get your favorite card. There
            are two ways to contribute.
          </p>
          <ul>
            <li>1. Submit new card design and earn 1 credit point</li>
            <li>
              2. Write and submit code for the submitted design and earn 2
              credit points
            </li>
          </ul>
          <p>Follow the steps below in order to submit your design or code:</p>
        </div>
        <ul>
          <li>1. Create your account</li>
          <li>2. Go to dashboard</li>
          <li>3. Click on contribution</li>
          <li>4. Select design or code, and submit it.</li>
        </ul>
      </section>
    </>
  );
};

export default About;
