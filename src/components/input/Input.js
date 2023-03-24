import { useState } from "react";
import "./Input.css";

function Input(props) {
  const [focused, setfocused] = useState(false);
  return (
    <div className="form_element">
      <label>{props.label}</label>
      <input
        onFocus={() => setfocused(true)}
        name={props.label.toLowerCase()}
        type={props.type || "text"}
        placeholder={props.placeholder}
        onChange={props.change}
      />
      {!props.valid && focused && (
        <ul className="hints">
          {props.hints.map((hint, index) => (
            <li className="hint-item" key={index}>
              {hint}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Input;
