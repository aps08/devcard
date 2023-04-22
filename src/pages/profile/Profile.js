import { useState } from "react";
import Personal from "../../components/personalinfo/Personal";
import Professional from "../../components/professional/Professional";
import Account from "../../components/account/Account";
import Orders from "../../components/orders/Orders";
import Gifts from "../../components/gifts/Gifts";
import "./Profile.css";

const routes = {
  personal: <Personal />,
  professional: <Professional />,
  account: <Account />,
  orders: <Orders />,
  gifts: <Gifts />
};
function Profile() {
  const [key, setkey] = useState("personal");
  return (
    <>
      <section className="section profile">
        <div className="pro-menu">
          <div>
            <img className="pro-image" src="https://picsum.photos/600/320?grayscale" alt="user image" />
          </div>
          <ul className="pro-list">
            <li className={key === "personal" ? "list-item active" : "list-item"} onClick={() => setkey("personal")}>
              Personal details
            </li>
            <li
              className={key === "professional" ? "list-item active" : "list-item"}
              onClick={() => setkey("professional")}>
              Professional details
            </li>
            <li className={key === "account" ? "list-item active" : "list-item"} onClick={() => setkey("account")}>
              Account settings
            </li>
            <li className={key === "orders" ? "list-item active" : "list-item"} onClick={() => setkey("orders")}>
              Orders
            </li>
            <li className={key === "gifts" ? "list-item active" : "list-item"} onClick={() => setkey("gifts")}>
              Gifts
            </li>
            <li className="list-item">Sign out</li>
          </ul>
        </div>
        <div className="pro-panel">{routes[key]}</div>
      </section>
    </>
  );
}

export default Profile;
