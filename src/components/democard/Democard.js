import ModalWrapper from "../../utils/Modalwrapper";
import "./Democard.css";

function DemoCard({ close, data }) {
  const { background, image, logo, name, role, company, experience } = data;
  return (
    <ModalWrapper close={close}>
      <div className="democardbox" style={{ backgroundImage: `url(${background})` }}>
        <div className="demo-container">
          <div className="center">
            <img className="demo-image" src={image} />
          </div>
          <div className="details">
            <p className="para">{name}</p>
            <p className="para">
              {role.toUpperCase()}|{company.toUpperCase()}
            </p>
            <p className="para" style={{ fontSize: "2rem" }}>
              Experience:{experience}+
            </p>
            {logo && <img src={logo} height="35" width="35" />}
          </div>
        </div>
      </div>
      <p className="para center">Sign up for more design and options</p>
    </ModalWrapper>
  );
}

export default DemoCard;
