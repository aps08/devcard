import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { BACKDROP_ELEMENT } from "./Constants";

function ModalWrapper(props) {
  return (
    <div className="modal">
      {ReactDOM.createPortal(<Backdrop close={props.close} />, BACKDROP_ELEMENT)}
      {props.children}
    </div>
  );
}

export default ModalWrapper;
