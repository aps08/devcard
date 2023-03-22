import './Input.css';

const Input = (props) => {
  return (
    <div className="form_element">
      <label>{props.label}</label>
      <input
        name={props.name}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        required={props.required || false}
      />
    </div>
  );
};

export default Input;
