import Input from "../../components/input/Input";
import Loading from "../../utils/Loading";
import { useEffect, useState } from "react";
import Callendpoint from "../../utils/Callendpoint";
import "./About.css";
import { useSelector } from "react-redux";

const ELEMENTS = [
  { label: "NAME", placeholder: "enter full name" },
  { label: "EMAIL", placeholder: "enter your email" },
  { label: "MESSAGE", placeholder: "enter your messsage" }
];
const HINTS = {
  name: ["Name should not exceed 30 characters"],
  email: ["Email should not exceed 30 characters"],
  message: ["Message should not exeed 100 characters"]
};
const CHECKS = {
  name: /^[A-Za-z][A-Za-z\s]{0,28}[A-Za-z]$/,
  email: /^[^\s@]{1,30}@[^\s@]+\.[^\s@]+$/,
  message: /^[A-Za-z][A-Za-z\s]{0,98}$/
};
const INITIAL = {
  name: "",
  email: "",
  message: ""
};
function About() {
  const email = useSelector((state) => state.userInfo?.profile?.email);
  const name = useSelector((state) => state.userInfo?.personal?.first_name);
  const [submitted, setsubmitted] = useState(false);
  const [validate, setvalidate] = useState(INITIAL);
  const [Formdata, setFormdata] = useState(INITIAL);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);

  useEffect(() => {
    setFormdata({ ...Formdata, email: email, name: name });
    if (CHECKS["email"].test(email)) {
      setvalidate({ ...validate, email: true });
    }
    if (CHECKS["name"].test(name)) {
      setvalidate({ ...validate, name: true });
    }
  }, [email, name]);

  const changehandler = (event) => {
    const { name, value } = event.target;
    if (CHECKS[name].test(value)) {
      setvalidate({ ...validate, [name]: true });
      setFormdata({ ...Formdata, [name]: value });
    } else {
      setvalidate({ ...validate, [name]: false });
    }
  };
  const submithandler = async (event) => {
    event.preventDefault();
    seterror(false);
    setmessage(false);
    const allTrueValues = Object.values(validate).every((value) => value === true);
    if (allTrueValues) {
      setsubmitted(true);
      const { data, statuscode } = await Callendpoint("post", "/public/feeback_contact", null, Formdata);
      if (statuscode === 200) {
        setmessage(data.message);
      } else {
        seterror(data.message);
      }
      setsubmitted(false);
    } else {
      for (const key in validate) {
        if (validate[key] !== true) {
          const inputfield = document.querySelector(`input[name=${key}]`);
          inputfield.focus();
          inputfield.scrollIntoView({ block: "center" });
          break;
        }
      }
    }
  };

  return (
    <>
      <Loading spinner={submitted} />
      <section className="section" id="about_section">
        <div>
          <h3 className="heading">About us</h3>
          <p className="para">
            DevCard is the go-to platform for developers to create professional business cards that showcase their
            skills and expertise. Our user-friendly platform allows you to get cards that reflect your brand and
            communicate your value proposition. Join us today to elevate your professional image and succeed in your
            career!
          </p>
          <p className="para">Give our demo a try if you&apos;re unsure whether you need it or not.</p>
        </div>
        <div>
          <h3 className="heading">What we do</h3>
          <p className="para">
            We help you stand out in a crowded market and elevate your professional image with our exceptional business
            cards.Our exceptional business cards are designed to elevate your profile and differentiate you from your
            competitors.
          </p>
          <p className="para">
            As a developer, your skills and expertise are vital to your success, and our high-quality cards are tailored
            to showcase them. With a focus on quality, our cards are crafted using premium materials and modern designs
            that exude professionalism and sophistication. Whether you&lsquo;re networking at a conference or meeting a
            potential client, our cards will make a lasting impression and communicate your brand&lsquo;s value.
          </p>
        </div>
      </section>
      <h3 className="heading">Contacts and Feedback</h3>
      <section className="section" id="contactform">
        <div className="contact_form">
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <form onSubmit={submithandler}>
            {ELEMENTS.map((element, index) => (
              <Input
                key={index}
                change={changehandler}
                hints={HINTS[element.label.toLowerCase()]}
                label={element.label}
                setvalue={Formdata[element.label.toLowerCase()]}
                valid={validate[element.label.toLowerCase()]}
                placeholder={element.placeholder}
              />
            ))}
            <div className="form_element">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default About;
