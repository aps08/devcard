function Backdrop(props) {
  return (
    <div onClick={props.close || null} className="backdrop">
      <div className="modal">{props.children}</div>
    </div>
  );
}

export default Backdrop;
