import './Input.css';
const Input = (props) => {
  return (
    <div className="form_element">
      <input type="text" required />
      <label>{props.name}</label>
    </div>
  );
};

export default Input;
