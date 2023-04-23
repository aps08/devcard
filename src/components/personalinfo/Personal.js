import Input from "../input/Input";
import "./Personal.css";
const CITIES = [
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Pune, Maharashtra",
  "Mumbai, Maharashtra",
  "Noida, Uttar Pradesh",
  "Gurgaon, Haryana",
  "New Delhi",
  "Kolkata, West Bengal",
  "Ahmedabad, Gujarat"
];
// quote
// linkedin
// twitter
// github
function Personal() {
  return (
    <form id="personaldetails">
      <div className="user_name">
        <Input label="first name" change={null} hints={null} placeholder="enter first name" valid={true} />
        <Input label="middle name" change={null} hints={null} placeholder="enter middle name" valid={true} />
        <Input label="Last name" change={null} hints={null} placeholder="enter last name" valid={true} />
        <div className="form_element">
          <label className="label">gender</label>
          <select name="gender" title="gender" defaultValue={""}>
            <option value="">Don&apos;t specify</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form_element">
          <label className="label">City</label>
          <select name="city" title="city" defaultValue={""}>
            <option value="">Don&apos;t specify</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="form_element">
          <label className="label">country</label>
          <input name="country" type="text" value="India" disabled />
        </div>
        <div className="form_element occupy_three">
          <label className="label">Quote</label>
          <input name="quote" type="text" placeholder="enter your favorite quote from your dev universe" />
        </div>
        <div className="single_line"></div>
        <div className="form_element occupy_two">
          <label className="label">Linkedin</label>
          <input name="linkedin" type="text" placeholder="take us to your linkedin" />
        </div>
        <div className="form_element occupy_two">
          <label className="label">Github</label>
          <input name="github" type="text" placeholder="take us to your github" />
        </div>
        <div className="form_element occupy_two">
          <label className="label">Twitter</label>
          <input name="twitter" type="text" placeholder="take us to your twitter" />
        </div>
      </div>
    </form>
  );
}

export default Personal;
