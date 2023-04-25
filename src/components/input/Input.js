import { useState } from "react";
import "./Input.css";

function Input(props) {
  const [focused, setfocused] = useState(false);
  return (
    <div className="form_element">
      <label className="label">{props.label}</label>
      <input
        style={{ border: !props.valid && focused ? "2px solid brown" : "" }}
        onFocus={() => setfocused(true)}
        name={props.label.toLowerCase()}
        placeholder={props.placeholder}
        onChange={props.change}
        type={props.type || "text"}
        onBlur={() => setfocused(false)}
        autoComplete="off"
        defaultValue={props.setvalue || null}
        className={props.className || null}
      />
      {!props.valid && focused && (
        <ul className="hints">
          {props.hints &&
            props.hints.map((hint, index) => (
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
