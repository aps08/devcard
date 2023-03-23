import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Preview from '../../components/preview/Preview';
import BrowseLogo from '../../assets/images/browselogo.svg';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import './Demo.css';

const MODAL_ELEMENT = document.getElementById('root-modal');

function Demo() {
  const [Formdata, setFormdata] = useState({
    name: '',
    company: '',
    experience: 0,
    role: '',
    image: ''
  });
  const [file, setfile] = useState(null);
  const [showmodal, setshowmodal] = useState(false);
  const mutate = (Preview) => {
    document.body.style.overflow = 'unset';
    setshowmodal(false);
    setFormdata({ ...Formdata, image: Preview });
  };
  const imagechangehandler = (event) => {
    document.body.style.overflow = 'hidden';
    setfile(event.target.files[0]);
    setshowmodal(true);
  };
  const formchangehandler = (event) => {
    const { name, value } = event.target;
    if (name !== 'image') {
      setFormdata({
        ...Formdata,
        [name]: value
      });
    }
    console.log(Formdata);
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
          <h3 className="heading">
            Get started by filling out the exciting form below and create your
            very own developer card!
          </h3>
          <form id="demo_form" onChange={formchangehandler}>
            <div className="form_element">
              <label>NAME</label>
              <input
                name="name"
                type="text"
                placeholder="enter your name"
                required={true}
              />
            </div>
            <div className="form_element">
              <label>COMPANY</label>
              <input
                name="company"
                type="text"
                placeholder="enter your company name"
                required={true}
              />
            </div>
            <div className="form_element">
              <label>EXPERIENCE</label>
              <input
                name="experience"
                type="number"
                placeholder="enter number of experience"
                required={true}
              />
            </div>
            <div className="form_element">
              <label>ROLE</label>
              <input
                name="role"
                type="text"
                placeholder="enter your role"
                required={true}
              />
            </div>
            <div className="form_element grid_span_two">
              <label>ADD IMAGE</label>
              <input
                name="image"
                accept="image/*"
                type="file"
                id="img"
                style={{ display: 'none' }}
                onChange={imagechangehandler}
              />
              <label name="upload" id="upload" htmlFor="img">
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
            <div className="form_element grid_span_two">
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
