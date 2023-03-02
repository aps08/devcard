import Input from '../../components/input/Input';
import { useState } from 'react';
import './Demo.css';

const Demo = () => {
  const [Select, setSelect] = useState({
    contact: '0',
    social: '0',
    file: ''
  });
  const imagehandler = (event) => {
    setSelect({ ...Select, file: event.target.files[0].name });
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
          <div>
            <h3>About you</h3>
            <div className="grid_three">
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
              <div className="form_element" onChange={imagehandler}>
                <label>Add image</label>
                <input
                  name="image"
                  type="file"
                  id="img"
                  style={{ display: 'none' }}
                />
                <label name="upload" id="upload" htmlFor="img">
                  {Select.file ? (
                    <>{Select.file.slice(0, 17) + '...'}</>
                  ) : (
                    <>select image</>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div>
            <h3>Connect your way</h3>
            <div className="grid_three">
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
                <label>Social links</label>
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
            </div>
          </div>
          <div>
            <h3>Your tech stack</h3>
            <div className="grid_three">
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
            </div>
          </div>
          <div className="grid_three">
            <div
              className="form_element"
              style={{
                gridColumn: 'span 3',
                placeItems: 'center'
              }}>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Demo;
