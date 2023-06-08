import ReactDOM from "react-dom";
import { useState } from "react";
import CardModal from "./CardModal";
import "./Card.css";

const MODAL_ELEMENT = document.getElementById("root-modal");

function Card(props) {
  const [show, setshow] = useState(false);
  return (
    <>
      {show &&
        ReactDOM.createPortal(
          <CardModal heading={props.label} description={props.description} close={() => setshow(false)} />,
          MODAL_ELEMENT
        )}
      <div className="card">
        <img className="card_visual" src="https://picsum.photos/300/200?grayscale" alt="cardimage" />
        <div className="description">
          <h3 className="heading">{props.label}</h3>
          <p className="para" style={{ padding: "0" }}>
            {props.para}
          </p>
          <ul>
            {props.list.map((item) => (
              <li className="para" key={item}>
                {item}
              </li>
            ))}
          </ul>
          <button onClick={() => setshow(true)}>Read more</button>
        </div>
      </div>
    </>
  );
}

export default Card;
