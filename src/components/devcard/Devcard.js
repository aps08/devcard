import "./Devcard.css";

function Devcard(props) {
  console.log(props.data);
  return <div>Devcard {props.data}</div>;
}

export default Devcard;
