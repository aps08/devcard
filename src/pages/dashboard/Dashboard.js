import card from "../../assets/images/cardhome.png";
import cardone from "../../assets/images/cardhome1.png";
import cardtwo from "../../assets/images/cardhome2.png";
import cardthree from "../../assets/images/cardhome3.png";
import cardfour from "../../assets/images/cardhome3.png";
import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      {/* <h2 className="center" style={{ color: "white" }}>
        THIS PROJECT IS INCOMPLETE
      </h2> */}
      <div className="dashboard">
        <div className="devcard" style={{ backgroundImage: `url(${card})` }}></div>
        <div className="devcard" style={{ backgroundImage: `url(${cardone})` }}></div>
        <div className="devcard" style={{ backgroundImage: `url(${cardtwo})` }}></div>
        <div className="devcard" style={{ backgroundImage: `url(${cardthree})` }}></div>
        <div className="devcard" style={{ backgroundImage: `url(${cardfour})` }}></div>
      </div>
    </>
  );
}

export default Dashboard;
