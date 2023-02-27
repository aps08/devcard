import './Select.css';

const Select = () => {
  return (
    <div className="form_element">
      <select required>
        <option defaultValue></option>
        <option>A</option>
      </select>
      <label>Work</label>
    </div>
  );
};

export default Select;
