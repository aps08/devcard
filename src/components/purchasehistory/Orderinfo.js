function Orderinfo(props) {
  const date = new Date(props.ordered);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <div className="order_card">
      <div className="order_card_top">
        <div className="order_block">
          <div className="order_info">
            <p className="label_order">Order placed</p>
            <p className="label_info">{formattedDate}</p>
          </div>
          <div className="order_info">
            <p className="label_order">Name</p>
            <p className="label_info">{props.name}</p>
          </div>
        </div>
        <div className="order_block">
          <div className="order_info">
            <p className="label_order">Status</p>
            <p className="label_info">{props.status}</p>
          </div>
          <div className="order_info">
            <p className="label_order">type</p>
            <p className="label_info">{props.type}</p>
          </div>
        </div>
        <div className="order_block">
          <div className="order_info">
            <p className="label_order">ORDER ID</p>
            <p className="label_info">{props.orderid}</p>
          </div>
          <div className="order_info">
            <button style={{ fontSize: "1rem", margin: "0", opacity: "1" }}>Raise issue</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orderinfo;
