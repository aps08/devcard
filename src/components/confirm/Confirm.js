import ModalWrapper from "../../helper/Modalwrapper";
import "./Confirm.css";
function Confirm(props) {
  const setconfirmation = (setyesorno) => {
    props.check(setyesorno);
    props.close();
  };

  return (
    <ModalWrapper close={props.close}>
      <div className="justify-center" id="modalconfirm">
        <div className="main_div">
          <p className="para center mb-2">Are you sure ?</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setconfirmation("yes")}>Yes</button>
            <button onClick={() => setconfirmation("no")}>No</button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default Confirm;
