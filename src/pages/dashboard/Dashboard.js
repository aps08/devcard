import Devcard from "../../components/devcard/Devcard";
import "./Dashboard.css";

const items = ["1"];

function Dashboard() {
  return <div className="dashboard">{items && items.map((item) => <Devcard key={item} data={item} />)}</div>;
}

export default Dashboard;
