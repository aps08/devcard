import Input from '../../components/input/Input';
import './About.css';

function About() {
  return (
    <>
      <section className="section" style={{ gridTemplateColumns: '1fr' }}>
        <div>
          <h3 className="heading">About us</h3>
          <p className="para">
            DevCard is the go-to platform for developers to create professional
            business cards that showcase their skills and expertise. Our
            user-friendly platform allows you to get cards that reflect your
            brand and communicate your value proposition. Join us today to
            elevate your professional image and succeed in your career!
          </p>
          <p className="para">
            Give our demo a try if you&apos;re unsure whether you need it or
            not.
          </p>
        </div>
        <div>
          <h3 className="heading">What we do</h3>
          <p className="para">
            We help you stand out in a crowded market and elevate your
            professional image with our exceptional business cards.Our
            exceptional business cards are designed to elevate your profile and
            differentiate you from your competitors.
          </p>
          <p className="para">
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
      <h3 className="heading">Contacts and Feedback</h3>
      <section className="section">
        <div>
          <form className="contact_form">
            <Input label="NAME" required={true} placeholder="enter full name" />
            <Input
              label="EMAIL"
              type="email"
              required={true}
              placeholder="enter email"
            />
            <Input
              label="SUBJECT"
              required={true}
              placeholder="enter subject"
            />
            <Input
              label="MESSAGE"
              required={true}
              placeholder="enter your message"
            />
            <div className="form_element">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div>
          <div className="right">
            <img
              id="form_inline_image"
              src="https://picsum.photos/600/320?grayscale"
              alt="cardimage"
            />
          </div>
        </div>
      </section>
      <section className="cards">
        <div>
          <h3 className="heading">How to earn credits?</h3>
          <p className="para">
            In simple words, you can contribute to this project and earn
            credits, you can use those credits to get your favorite card. There
            are two ways to contribute.
          </p>
          <ul className="about_step">
            <li className="para">
              1. Submit new card design and earn 1 credit point
            </li>
            <li className="para">
              2. Write and submit code for the submitted design and earn 2
              credit points
            </li>
          </ul>
          <p className="para">
            Follow the steps below in order to submit your design or code:
          </p>
        </div>
        <ul className="about_step">
          <li className="para">1. Create your account</li>
          <li className="para">2. Go to dashboard</li>
          <li className="para">3. Click on contribution</li>
          <li className="para">4. Select design or code, and submit it.</li>
        </ul>
      </section>
    </>
  );
}

export default About;
