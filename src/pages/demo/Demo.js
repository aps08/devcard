import { useState } from "react";
import Loading from "../../utils/Loading";
import Preview from "../../components/preview/Preview";
import BrowseLogo from "../../assets/images/browselogo.svg";
import Input from "../../components/input/Input";
import Callendpoint from "../../utils/Callendpoint";
import "./Demo.css";
import DemoCard from "../../components/democard/Democard";

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
  name: ["Only alphabets and spaces are allowed", "Name should not exceed 30 characters"],
  company: ["Only alphabets and spaces are allowed", "Company should not exceed 20 characters"],
  experience: ["Experience cannot be less than 0 or more than 50."],
  role: ["Example: Back-end Developer, Python Developer"],
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
  const [democard, setdemocard] = useState(false);
  const [demodata, setdemodata] = useState(false);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [demoimage, setdemoimage] = useState(null);
  const [Formdata, setFormdata] = useState(INITIAL);
  const [validate, setvalidate] = useState(INITIAL);
  const [file, setfile] = useState(null);
  const [showmodal, setshowmodal] = useState(false);

  const mutate = (url) => {
    seterror(false);
    setdemoimage(url);
    setFormdata({ ...Formdata, image: true });
    setvalidate({ ...validate, image: true });
    setshowmodal(false);
  };

  const closemodal = () => {
    setmessage(false);
    seterror(false);
    setdemoimage(false);
    setshowmodal(false);
    setvalidate({ ...validate, image: false });
  };

  const imagechangehandler = (event) => {
    setmessage(false);
    seterror(false);
    if (event.target.files.length !== 0) {
      const file = event.target.files[0];
      if (file.size / (1024 * 1024) > 5) {
        seterror("File size exceeds the limit of 5MB");
      } else {
        setfile(event.target.files[0]);
        setshowmodal(true);
      }
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

  const submithandler = async (event) => {
    setmessage(false);
    seterror(false);
    event.preventDefault();
    const allTrueValues = Object.values(validate).every((value) => value === true);
    if (allTrueValues) {
      setsubmitted(true);
      const { data, statuscode } = await Callendpoint("post", "/public/demo", null, Formdata);
      if (statuscode === 200) {
        setdemodata({ ...data, image: demoimage });
        setdemocard(true);
      } else {
        seterror(data.message);
      }
      setsubmitted(false);
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

  return (
    <>
      {showmodal && (
        <Preview Select={showmodal} mutator={mutate} setSelect={setshowmodal} file={file} close={closemodal} />
      )}
      {democard && (
        <DemoCard
          data={demodata}
          close={() => {
            setdemocard(false);
            setmessage(false);
            seterror(false);
          }}
        />
      )}
      <section className="center">
        <form id="demo_form" className="justify-center" onSubmit={submithandler}>
          <p className="para">Filling out the exciting form below and create your devcard!</p>
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
            <button type="submit">Submit</button>
          </div>
        </form>
        <Loading spinner={submitted} />
      </section>
    </>
  );
}

export default Demo;
