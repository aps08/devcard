import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Preview from "../../components/preview/Preview";
import BrowseLogo from "../../assets/images/browselogo.svg";
import Input from "../../components/input/Input";
import { useState } from "react";
import ReactDOM from "react-dom";
import "./Demo.css";

const MODAL_ELEMENT = document.getElementById("root-modal");
const ELEMENTS = [
  {
    label: "NAME",
    placeholder: "enter your name"
  },
  {
    label: "COMPANY",
    placeholder: "enter your company name"
  },
  {
    label: "EXPERIENCE",
    placeholder: "enter experience in number of years"
  },
  {
    label: "ROLE",
    placeholder: "enter your role"
  }
];
const HINTS = {
  name: [
    "Name is required",
    "Only alphabets and spaces are allowed",
    "Type first name or full name that will be visible in your devcard"
  ],
  company: [
    "Company name is required",
    "Only alphabets and spaces are allowed",
    "Make sure you type correct company name"
  ],
  experience: ["Experience is required", "Experience cannot be less than 0 or more than 50."],
  role: ["Role is requried", "Only alphabets and spaces are allowed", "Example: Back-end Developer, Python Developer"],
  image: ["Image is required", "Image must be png,jpg or jpeg format"]
};
const CHECKS = {
  name: /^[A-Za-z][A-Za-z\s]{0,28}[A-Za-z]$/,
  company: /^[A-Za-z][A-Za-z-.\s]{0,18}[A-Za-z]$/,
  experience: /^([0-9]|[1-4][0-9]|50)$/,
  role: /^[A-Za-z][A-Za-z-\s]{0,28}[A-Za-z]$/
};
const INITIAL = {
  name: "",
  company: "",
  experience: 0,
  role: "",
  image: ""
};
function Demo() {
  const [Formdata, setFormdata] = useState(INITIAL);
  const [validate, setvalidate] = useState(INITIAL);
  const [file, setfile] = useState(null);
  const [showmodal, setshowmodal] = useState(false);
  const mutate = (Preview) => {
    document.body.style.overflow = "unset";
    setshowmodal(false);
    setvalidate({ ...validate, image: true });
    setFormdata({ ...Formdata, image: Preview });
  };
  const imagechangehandler = (event) => {
    document.body.style.overflow = "hidden";
    setfile(event.target.files[0]);
    setshowmodal(true);
  };
  const changehandler = (event) => {
    const { name, value } = event.target;
    if (name !== "image") {
      if (CHECKS[name].test(value)) {
        setvalidate({ ...validate, [name]: true });
        setFormdata({ ...Formdata, [name]: value });
      } else {
        setvalidate({ ...validate, [name]: false });
      }
    }
  };
  const submithandler = (event) => {
    event.preventDefault();
    const allTrueValues = Object.values(validate).every((value) => value === true);
    if (allTrueValues) {
      console.log(Formdata);
    } else {
      alert("Some field is missing. If not reload page and try again.");
    }
  };
  return (
    <>
      <Header />
      <main>
        {showmodal &&
          ReactDOM.createPortal(
            <Preview
              Select={showmodal}
              mutator={mutate}
              setSelect={setshowmodal}
              file={file}
              close={() => setshowmodal(false)}
            />,
            MODAL_ELEMENT
          )}
        <section className="center">
          <h3 className="heading" style={{ marginTop: "1rem" }}>
            Get started by filling out the exciting form below and create your very own developer card!
          </h3>
          <form id="demo_form" onSubmit={submithandler}>
            {ELEMENTS.map((element, index) => (
              <Input
                key={index}
                label={element.label}
                type={element.type || "text"}
                placeholder={element.placeholder}
                hints={HINTS[element.label.toLowerCase()]}
                change={changehandler}
                valid={validate[element.label.toLowerCase()]}
              />
            ))}
            <div className="form_element">
              <label style={{ textAlign: "center" }}>ADD IMAGE</label>
              <input
                name="image"
                accept="image/*"
                type="file"
                id="img"
                style={{ display: "none" }}
                onChange={imagechangehandler}
              />
              <label name="upload" id="upload" htmlFor="img" style={{ marginLeft: "0" }}>
                <div className="file_input_area">
                  <img
                    className="preview_image_area"
                    src={Formdata.image ? Formdata.image : BrowseLogo}
                    alt="browselogo"
                  />
                  <p>Browse files</p>
                </div>
              </label>
            </div>
            <div className="form_element">
              <button type="submit">Get a demo now</button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Demo;
