import './Backdrop.css';
const Backdrop = (props) => {
  return <div onClick={props.close || null} className="backdrop"></div>;
};

export default Backdrop;
