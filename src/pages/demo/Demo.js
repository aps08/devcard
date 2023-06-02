import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactLoading from "react-loading";
import Preview from "../../components/preview/Preview";
import BrowseLogo from "../../assets/images/browselogo.svg";
import Input from "../../components/input/Input";
import "./Demo.css";

const MODAL_ELEMENT = document.getElementById("root-modal");
const ELEMENTS = [
  {
    label: "NAME",
    placeholder: "Anoop Singh"
  },
  {
    label: "COMPANY",
    placeholder: "Tenxlab"
  },
  {
    label: "EXPERIENCE",
    placeholder: "2"
  },
  {
    label: "ROLE",
    placeholder: "Full-stack developer"
  }
];
const HINTS = {
  name: [
    "Name is required",
    "Only alphabets and spaces are allowed",
    "Type first name or full name that will be visible in your devcard",
    "Name should not exceed 30 characters"
  ],
  company: [
    "Company name is required",
    "Only alphabets and spaces are allowed",
    "Make sure you type correct company name",
    "Company should not exceed 20 characters"
  ],
  experience: ["Experience is required", "Experience cannot be less than 0 or more than 50."],
  role: [
    "Role is requried",
    "Only alphabets and spaces are allowed",
    "Company should not exceed 20 characters",
    "Example: Back-end Developer, Python Developer"
  ],
  image: ["Image is required", "Image must be png,jpg or jpeg format"]
};
const CHECKS = {
  name: /^[A-Za-z][A-Za-z\s]{0,28}[A-Za-z]$/,
  company: /^[A-Za-z][A-Za-z-.\s]{0,18}[A-Za-z]$/,
  experience: /^([0-9]|[1-4][0-9]|50)$/,
  role: /^[A-Za-z][A-Za-z-\s]{0,18}[A-Za-z]$/
};
const INITIAL = {
  name: "",
  company: "",
  experience: 0,
  role: "",
  image: false
};
function Demo() {
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [demoimage, setdemoimage] = useState(false);
  const [Formdata, setFormdata] = useState(INITIAL);
  const [validate, setvalidate] = useState(INITIAL);
  const [file, setfile] = useState(null);
  const [showmodal, setshowmodal] = useState(false);

  const mutate = (Preview) => {
    seterror(false);
    setFormdata({ ...Formdata, image: true });
    setdemoimage(Preview);
    document.body.style.overflow = "unset";
    setshowmodal(false);
    setvalidate({ ...validate, image: true });
  };

  const closemodal = () => {
    setdemoimage(false);
    document.body.style.overflow = "unset";
    setshowmodal(false);
    setvalidate({ ...validate, image: false });
  };

  const imagechangehandler = (event) => {
    seterror(false);
    if (event.target.files.length !== 0) {
      document.body.style.overflow = "hidden";
      setfile(event.target.files[0]);
      setshowmodal(true);
    }
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
      setsubmitted(true);
    } else {
      for (const key in validate) {
        if (validate[key] !== true) {
          if (key === "image") {
            const err = key.charAt(0).toUpperCase() + key.slice(1) + " field is missing.";
            seterror(err);
          } else {
            const inputfield = document.querySelector(`input[name=${key}]`);
            inputfield.focus();
            inputfield.scrollIntoView({ block: "center" });
          }
          break;
        }
      }
    }
  };

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json"
      },
      body: JSON.stringify(Formdata),
      mode: "cors"
    };
    const callingapi = async () => {
      try {
        const response = await fetch("/public/demo", requestOptions);
        const data = await response.json();
        if (response.ok) {
          setmessage(data.message);
        } else {
          seterror(data.message);
        }
        setsubmitted(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (submitted) {
      seterror(false);
      setmessage(false);
      callingapi();
    }
  }, [submitted]);

  return (
    <>
      {showmodal &&
        ReactDOM.createPortal(
          <Preview Select={showmodal} mutator={mutate} setSelect={setshowmodal} file={file} close={closemodal} />,
          MODAL_ELEMENT
        )}
      <section className="center">
        <form id="demo_form" className="justify-center" onSubmit={submithandler}>
          <h3 className="heading" style={{ marginBottom: "2rem" }}>
            Filling out the exciting form below and create your devcard!
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
          </div>
          {ELEMENTS.map((element, index) => (
            <Input
              key={index}
              label={element.label}
              placeholder={element.placeholder}
              hints={HINTS[element.label.toLowerCase()]}
              change={changehandler}
              valid={validate[element.label.toLowerCase()]}
            />
          ))}
          <div className="form_element">
            <label className="label">ADD IMAGE</label>
            <input name="image" accept="image/*" type="file" id="img" onChange={imagechangehandler} />
            <label name="upload" id="upload" htmlFor="img">
              <div className="file_input_area">
                <img
                  className={Formdata.image ? "preview_image_after" : "preview_image_before"}
                  src={demoimage ? demoimage : BrowseLogo}
                  alt="browselogo"
                />
                <p className="label">{Formdata.image ? <>Change image</> : <>Browse files</>}</p>
              </div>
            </label>
          </div>
          <div className="form_element">
            {submitted ? (
              <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />
            ) : (
              <button type="submit">Submit</button>
            )}
          </div>
        </form>
      </section>
    </>
  );
}

export default Demo;
