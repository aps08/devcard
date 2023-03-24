import "./Preview.css";
import ModalWrapper from "../../helper/Modalwrapper";
import Avatar from "react-avatar-edit";
import { useState } from "react";

function Preview(props) {
  const [Image, SetImage] = useState(URL.createObjectURL(props.file));
  const [Preview, setPreview] = useState(null);
  const ImageSavehandler = () => {
    props.mutator(Preview);
  };
  return (
    <ModalWrapper close={props.close}>
      <div className="top">
        <h3>Crop your devcard image</h3>
      </div>
      <div className="body">
        <Avatar
          src={Image}
          imageWidth={320}
          shadingColor="#111111"
          shadingOpacity=".9"
          label="Browse file"
          labelStyle={{ color: "whitesmoke" }}
          onClose={() => {
            setPreview(null);
            SetImage(null);
          }}
          onCrop={(view) => setPreview(view)}
        />
      </div>
      <div className="bottom">
        <button onClick={ImageSavehandler}>Save</button>
      </div>
    </ModalWrapper>
  );
}

export default Preview;
