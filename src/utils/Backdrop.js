function Backdrop(props) {
  return (
    <div onClick={props.close || null} className={props.class ? props.class : "backdrop"}>
      <div className="modal">{props.children}</div>
    </div>
  );
}

export default Backdrop;
