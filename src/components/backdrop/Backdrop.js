import "./Backdrop.css";
function Backdrop(props) {
  return <div onClick={props.close || null} className="backdrop"></div>;
}

export default Backdrop;
