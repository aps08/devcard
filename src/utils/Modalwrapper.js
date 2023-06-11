import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
function ModalWrapper(props) {
  return (
    <div className="modal">
      {ReactDOM.createPortal(<Backdrop close={props.close} />, document.getElementById("root-backdrop"))}
      {props.children}
    </div>
  );
}

export default ModalWrapper;
