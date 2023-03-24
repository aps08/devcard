import ReactDOM from "react-dom";
import Backdrop from "../components/backdrop/Backdrop";
function ModalWrapper(props) {
  return (
    <div className="modal" id={props.id || null}>
      {ReactDOM.createPortal(<Backdrop close={props.close} />, document.getElementById("root-backdrop"))}
      {props.children}
    </div>
  );
}

export default ModalWrapper;
