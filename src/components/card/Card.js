import './Card.css';

const Card = (props) => {
  return (
    <div className="card">
      <img src="https://picsum.photos/300/300?grayscale" alt="cardimage" />
      <div className="description">
        <h3>{props.label}</h3>
        <p>{props.para}</p>
        <ul>
          {props.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
