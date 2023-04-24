import Input from "../input/Input";
import "./Professional.css";

function Professional() {
  return (
    <form id="professionaldetails">
      <p className="para" style={{ fontSize: "16px", textAlign: "left", marginBottom: "1rem", marginLeft: ".5rem" }}>
        Information will be used for generating the devcard.
      </p>
      <div className="user_name">
        <Input label="Company" change={null} hints={null} type="text" placeholder="enter company name" valid={true} />
        <Input label="Role" change={null} hints={null} type="text" placeholder="enter your role" valid={true} />
        <Input
          label="Experience"
          change={null}
          hints={null}
          type="number"
          placeholder="enter experience(in years)"
          valid={true}
        />
        <Input
          label="Primary language"
          change={null}
          hints={null}
          type="text"
          placeholder="enter primary language"
          valid={true}
        />
        <Input
          label="Secondary language"
          change={null}
          hints={null}
          type="text"
          placeholder="enter secondary language"
          valid={true}
        />
        <div className="form_element occupy_three">
          <label className="label">Other stack</label>
          <input name="github" type="text" placeholder="enter other tools, stacks" />
        </div>
      </div>
      <button style={{ marginTop: "1rem", fontSize: "1.2rem" }} type="submit">
        Save
      </button>
    </form>
  );
}

export default Professional;
