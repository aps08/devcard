import './Card.css';

const Card = (props) => {
  return (
    <div className="card">
      <img
        className="card_visual"
        src="https://picsum.photos/300/300?grayscale"
        alt="cardimage"
      />
      <div className="description">
        <h3 className="heading">{props.label}</h3>
        <p className="para">{props.para}</p>
        <ul>
          {props.list.map((item) => (
            <li className="para" key={item}>
              {item}
            </li>
          ))}
        </ul>
        <button>{props.buttonlabel}</button>
      </div>
    </div>
  );
};

export default Card;
