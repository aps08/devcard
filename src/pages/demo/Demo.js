import Input from '../../components/input/Input';
import Preview from '../../components/preview/Preview';
import BrowseLogo from '../../assets/images/browselogo.svg';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import './Demo.css';

const MODAL_ELEMENT = document.getElementById('root-modal');
const INPUTS = [
  { label: 'name', placeholder: 'required', required: true },
  { label: 'company', placeholder: 'required', required: true },
  { label: 'experience', placeholder: 'required', required: true },
  { label: 'role', placeholder: 'required', required: true },
  {
    label: 'linkedin',
    placeholder: 'www.linkedin.com/in/{username}',
    required: false
  },
  {
    label: 'github',
    placeholder: 'www.github.com/{username}',
    required: false
  },
  {
    label: 'twitter',
    placeholder: 'www.twitter.com/{username}',
    required: false
  },
  {
    label: 'medium',
    placeholder: 'www.medium.com/@{username}',
    required: false
  }
];

const Demo = () => {
  const [Formdata, setFormdata] = useState({
    name: '',
    company: '',
    experience: 0,
    role: '',
    contact_type: '',
    social_media: '',
    linkedin: '',
    twitter: '',
    medium: '',
    github: '',
    image: ''
  });
  const [file, setfile] = useState(null);
  const [Select, setSelect] = useState({
    contact: '0',
    social: '0',
    showmodal: false,
    croppedImage: false
  });
  const mutate = (Preview) => {
    document.body.style.overflow = 'unset';
    setSelect({ ...Select, showmodal: false });
    setFormdata({ ...Formdata, image: Preview });
  };
  const imagechangehandler = (event) => {
    document.body.style.overflow = 'hidden';
    setfile(event.target.files[0]);
    setSelect({ ...Select, showmodal: true });
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
      {Select.showmodal &&
        ReactDOM.createPortal(
          <Preview
            Select={Select}
            mutator={mutate}
            setSelect={setSelect}
            file={file}
            close={() => setSelect({ ...Select, showmodal: false })}
          />,
          MODAL_ELEMENT
        )}
      <section className="center">
        <h3 className="heading">
          Get started by filling out the exciting form below and create your
          very own developer card!
        </h3>
        <form id="demo_form" onBlur={formchangehandler}>
          {INPUTS.slice(0, 4).map((input) => (
            <Input
              key={input.label}
              label={input.label.toUpperCase()}
              name={input.label}
              placeholder={input.placeholder}
              required={input.required}
            />
          ))}
          <div className="form_element">
            <label>CONTACT TYPE</label>
            <select
              name="contact_type"
              title="contact_type"
              defaultValue={Select.contact}
              onChange={(event) => {
                setSelect({
                  ...Select,
                  contact: event.target.value.toLowerCase()
                });
              }}
              required>
              <option value="0" disabled>
                required
              </option>
              <option value="email">Email</option>
              <option value="phone">Phone number</option>
              <option value="both">Both</option>
            </select>
          </div>
          {Select.contact === 'email' || Select.contact === 'both' ? (
            <Input
              label="Personal email"
              name="email"
              placeholder="required"
              required={true}
              type="email"
            />
          ) : (
            <></>
          )}
          {Select.contact === 'phone' || Select.contact === 'both' ? (
            <Input
              label="Phone"
              name="phone"
              placeholder="required"
              required={true}
            />
          ) : (
            <></>
          )}
          <div className="form_element">
            <label>SOCIAL MEDIA</label>
            <select
              name="scocial_media"
              title="scocial_media"
              defaultValue={Select.social}
              onChange={(event) => {
                setSelect({
                  ...Select,
                  social: event.target.value.toLowerCase() == 'true'
                });
              }}
              required>
              <option value="0" disabled>
                required
              </option>
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </div>
          {Select.social === true && (
            <>
              {INPUTS.slice(4, 8).map((input) => (
                <Input
                  key={input.label}
                  label={input.label.toUpperCase()}
                  name={input.label}
                  placeholder={input.placeholder}
                  required={input.required}
                />
              ))}
            </>
          )}
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
          <div
            className="form_element grid_span_two"
            style={{ margin: '0 10px' }}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Demo;
