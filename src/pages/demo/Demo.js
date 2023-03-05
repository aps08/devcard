import Input from '../../components/input/Input';
import Preview from '../../components/preview/Preview';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import './Demo.css';

const MODAL_ELEMENT = document.getElementById('root-modal');

const Demo = () => {
  const [file, setfile] = useState(null);
  const [Select, setSelect] = useState({
    contact: '0',
    social: '0',
    showmodal: false,
    croppedImage: false
  });
  const mutate = (Preview, show) => {
    setSelect({ ...Select, showmodal: show, croppedImage: Preview });
  };

  return (
    <>
      <div className="progress-bar">
        <div style={{ width: '10%' }} className="bar"></div>
      </div>
      <div className="demo-form">
        <h3>
          Get started by filling out the exciting form below and create your
          very own demo developer card!
        </h3>
        <form>
          <Input
            label="Name"
            name="name"
            placeholder="required"
            required={true}
          />
          <Input
            label="Company"
            name="company"
            placeholder="required"
            required={true}
          />
          <Input
            label="Experience(in years)"
            name="experience"
            placeholder="required"
            required={true}
            type="number"
          />
          <Input
            label="Role"
            name="role"
            placeholder="required"
            required={true}
          />
          <div className="form_element">
            <label>Contact type</label>
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
            ''
          )}
          {Select.contact === 'phone' || Select.contact === 'both' ? (
            <Input
              label="Phone"
              name="phone"
              placeholder="required"
              required={true}
            />
          ) : (
            ''
          )}
          <div className="form_element">
            <label>Social media</label>
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
              <Input
                label="Linkedin"
                name="linkedin"
                placeholder="www.linkedin.com/in/{username}"
                required={false}
              />
              <Input
                label="GitHub"
                name="github"
                placeholder="www.github.com/{username}"
                required={false}
              />
              <Input
                label="Twitter"
                name="twitter"
                placeholder="www.twitter.com/{username}"
                required={false}
              />
              <Input
                label="Medium"
                name="medium"
                placeholder="www.medium.com/@{username}"
                required={false}
              />
            </>
          )}
          <div
            className="form_element"
            style={{
              gridColumn: 'span 2',
              margin: '.5rem 0',
              placeItems: 'center'
            }}>
            <label>Add image</label>
            <input
              name="image"
              accept="image/*"
              type="file"
              id="img"
              style={{ display: 'none' }}
              onChange={(event) => {
                setfile(event.target.files[0]);
                setSelect({ ...Select, showmodal: true });
              }}
            />
            {Select.showmodal &&
              ReactDOM.createPortal(
                <Preview
                  Select={Select}
                  mutator={mutate}
                  setSelect={setSelect}
                  file={file}
                />,
                MODAL_ELEMENT
              )}
            <label name="upload" id="upload" htmlFor="img">
              <div className="file_input_area">
                {Select.croppedImage ? (
                  <img src={Select.croppedImage} alt="alt image" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    width="40.000000pt"
                    height="40.000000pt"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      fill="#5A5A5A"
                      stroke="none">
                      <path d="M1032 5105 c-181 -40 -350 -176 -433 -350 -63 -132 -60 0 -57 -2225 l3 -2025 22 -65 c66 -191 210 -337 405 -408 l73 -27 1515 0 1515 0 73 27 c195 71 339 217 405 408 l22 65 3 1737 2 1737 -32 38 c-200 231 -947 1063 -970 1081 l-31 22 -1226 -1 c-995 0 -1238 -3 -1289 -14z m2378 -682 c0 -445 2 -491 18 -523 9 -19 28 -40 42 -47 19 -10 133 -13 463 -13 l437 0 0 -1622 c0 -1761 2 -1688 -55 -1790 -51 -91 -140 -165 -239 -196 -47 -16 -179 -17 -1516 -17 -1350 0 -1469 1 -1517 17 -116 37 -219 134 -266 250 l-22 53 -3 1990 c-2 1457 0 2006 8 2050 16 81 59 161 117 216 59 56 90 76 157 99 48 18 115 19 1214 19 l1162 1 0 -487z m530 -38 l302 -340 -298 -3 c-165 -1 -304 0 -311 3 -16 6 -19 689 -4 683 6 -1 146 -156 311 -343z" />
                      <path d="M1242 4037 c-49 -28 -69 -96 -43 -146 27 -50 34 -51 556 -51 414 0 490 2 515 15 36 18 52 47 52 90 0 43 -16 72 -52 90 -25 13 -101 15 -517 15 -372 -1 -493 -4 -511 -13z" />
                      <path d="M1244 3334 c-64 -31 -76 -113 -25 -165 l29 -29 1276 0 c932 0 1282 3 1300 11 25 12 56 63 56 94 0 32 -32 77 -65 91 -29 12 -227 14 -1287 14 -1106 0 -1257 -2 -1284 -16z" />
                      <path d="M1226 2799 c-28 -22 -45 -70 -38 -106 6 -32 47 -69 83 -77 18 -3 589 -6 1271 -6 1356 0 1290 -3 1322 59 27 51 17 97 -28 133 -20 16 -103 18 -1302 18 -1279 0 -1281 0 -1308 -21z" />
                      <path d="M1264 2303 c-12 -2 -34 -17 -49 -33 -53 -56 -28 -142 50 -168 30 -10 301 -12 1289 -10 1176 3 1253 4 1277 21 74 50 58 163 -28 186 -36 10 -2488 14 -2539 4z" />
                      <path d="M1244 1774 c-64 -31 -76 -113 -25 -165 l29 -29 1276 0 c932 0 1282 3 1300 11 25 12 56 63 56 94 0 32 -32 77 -65 91 -29 12 -227 14 -1287 14 -1106 0 -1257 -2 -1284 -16z" />
                      <path d="M1233 1260 c-64 -39 -59 -141 9 -176 40 -21 986 -21 1026 0 50 26 69 91 41 143 -28 53 -29 53 -556 53 -467 0 -489 -1 -520 -20z" />
                    </g>
                  </svg>
                )}
                <p>Browse files</p>
              </div>
            </label>
          </div>
          <div
            className="form_element"
            style={{
              gridColumn: 'span 2',
              placeItems: 'center'
            }}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Demo;
