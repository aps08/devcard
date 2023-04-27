import "./Purchasehistory.css";

function Purchasehistory() {
  const date = new Date("2023-02-27");
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  console.log(formattedDate);
  return (
    <div className="purchasehistory">
      <h2 style={{ marginBottom: "1rem" }}>Your orders</h2>
      <div className="order_card">
        <div className="order_card_top">
          <div>
            <p className="label_order">Order placed</p>
            <p className="order_date">{formattedDate}</p>
          </div>
          <div>
            <p className="label_order">type</p>
            <p className="order_date">Purchase</p>
          </div>
          <div>
            <p className="label_order">ORDER IB</p>
            <p className="order_date">sdjsndjnsjnsjcnsjcv </p>
          </div>
        </div>
        <div className="order_card_body">
          <div>
            <p className="label_order">Status</p>
            <p className="order_date">In porgress</p>
          </div>
          <div>
            <p className="label_order">shipped to</p>
            <p className="order_date">Anoop</p>
          </div>
          <div>
            <p className="label_order">Credits spent</p>
            <p className="order_date">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Purchasehistory;
