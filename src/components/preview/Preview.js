import { useState, useEffect } from "react";
import ModalWrapper from "../../utils/Modalwrapper";
import Avatar from "react-avatar-edit";
import Loading from "react-loading";
import Callendpoint from "../../utils/Callendpoint";
import "./Preview.css";

function Preview(props) {
  const [error, seterror] = useState(false);
  const [Image, SetImage] = useState(null);
  const [Preview, setPreview] = useState(null);
  const [submitted, setsubmitted] = useState(false);

  const closeavataredit = () => {
    setPreview(null);
    SetImage(null);
    seterror(false);
  };

  const ImageSavehandler = async () => {
    if (Preview) {
      seterror(false);
      setsubmitted(true);
      const { data, statuscode } = await Callendpoint(
        "put",
        "/public/demo",
        null,
        JSON.stringify({ image: Preview }),
        true
      );
      if (statuscode === 200) {
        props.mutator(data.message);
      } else {
        seterror(data.message);
      }
      setsubmitted(false);
    } else {
      seterror("Select an image");
    }
  };

  useEffect(() => {
    if (props.file) {
      SetImage(URL.createObjectURL(props.file));
    }
  }, [props.file]);

  return (
    <>
      <Loading spinner={submitted} />
      {!submitted && (
        <ModalWrapper close={props.close}>
          <div className="justify-center">
            <div className="top">
              <h3>Crop your devcard image</h3>
            </div>
            <div>
              {error && <p className="error center">{error}</p>}
              <div className="body">
                {Image && (
                  <Avatar
                    src={Image}
                    imageWidth={320}
                    shadingColor="#111111"
                    shadingOpacity=".9"
                    label="Browse file"
                    exportAsSquare="true"
                    labelStyle={{ color: "whitesmoke" }}
                    onClose={closeavataredit}
                    onCrop={(view) => {
                      setPreview(view);
                      seterror(false);
                    }}
                  />
                )}
                {!Image && (
                  <Avatar
                    imageWidth={320}
                    shadingColor="#111111"
                    shadingOpacity=".9"
                    label="Browse file"
                    exportAsSquare="true"
                    labelStyle={{ color: "whitesmoke" }}
                  />
                )}
              </div>
            </div>
            <div className="bottom">
              <div id="preview_bottom">
                <button onClick={ImageSavehandler}>Save</button>
              </div>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
}

export default Preview;
