import './Input.css';
const Input = (props) => {
  return (
    <div className="form_element">
      {props.label && <label>{props.label}</label>}
      <input
        name={props.name}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        required
      />
    </div>
  );
};

export default Input;
