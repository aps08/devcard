import "./Card.css";

function Card(props) {
  return (
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
        <button>Read more</button>
      </div>
    </div>
  );
}

export default Card;
