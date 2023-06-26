import Backdrop from "./Backdrop";
import ReactLoading from "react-loading";
import ReactDOM from "react-dom";
import { LOADING_ELEMENT } from "./Constants";

function Loading(props) {
  const { spinner } = props;
  return (
    <>
      {spinner &&
        ReactDOM.createPortal(
          <Backdrop close={null} class="backdropup">
            <ReactLoading type="spin" color="#fff" height="100px" width="100px" />
          </Backdrop>,
          LOADING_ELEMENT
        )}
    </>
  );
}

export default Loading;
