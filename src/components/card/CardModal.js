import ModalWrapper from "../../utils/Modalwrapper";
function CardModal(props) {
  return (
    <ModalWrapper close={props.close}>
      <div className="main_div justify-center">
        <div className="card_modal">
          <div className="heading center">{props.heading}</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img className="card_visual" src="https://picsum.photos/300/200?grayscale" alt="cardimage" />
          </div>
          <p className="label">{props.description}</p>
          <button onClick={props.close}>close</button>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default CardModal;
