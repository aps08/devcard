import Orderinfo from "./Orderinfo";
import "./Purchasehistory.css";

function Purchasehistory() {
  const date = new Date("2023-02-27");
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const orders = [
    {
      ordered: "2023-02-27",
      name: "Gold flex",
      orderid: "1234567",
      status: "Shipping",
      type: "Purcchase"
    }
  ];
  console.log(formattedDate);
  return (
    <div className="purchasehistory">
      <h2 style={{ marginBottom: "1rem" }}>Your orders</h2>
      {orders.length > 0 &&
        orders.map((order) => (
          <Orderinfo
            key={order.orderid}
            ordered={order.ordered}
            name={order.name}
            orderid={order.orderid}
            status={order.status}
            type={order.type}
          />
        ))}
      {orders.length === 0 && <p style={{ textAlign: "center" }}>No order information found.</p>}
    </div>
  );
}

export default Purchasehistory;
