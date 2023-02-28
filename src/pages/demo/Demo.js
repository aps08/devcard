import Input from '../../components/input/Input';
import './Demo.css';
{
  /* <Input
            label="Middle name"
            name="middle_name"
            placeholder="optional"
            required={false}
          />
          <Input
            label="Last name"
            name="last_name"
            placeholder="optional"
            required={false}
          /> */
}
const Demo = () => {
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
              <div className="form_element">
                <label>Type</label>
                <select
                  name="work_type"
                  title="work_type"
                  defaultValue="0"
                  required>
                  <option value="0" disabled>
                    required
                  </option>
                  <option value="Professional">Professional</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Student">Student</option>
                </select>
              </div>
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
                  defaultValue="0"
                  required>
                  <option value="0" disabled>
                    required
                  </option>
                  <option value="email">Email</option>
                  <option value="number">Phone number</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <Input
                label="Personal email"
                name="email"
                placeholder="required"
                required={true}
                type="email"
              />
              <Input
                label="Phone"
                name="phone"
                placeholder="required"
                required={true}
              />
              <div
                className="form_element"
                style={{
                  gridColumn: 'span 2',
                  width: '95%',
                  padding: '0 .5rem'
                }}>
                <label>Social media links</label>
                <Input name="link_1" placeholder="optional" required={false} />
                <button>Add more</button>
              </div>
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
