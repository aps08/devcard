import { useState, useEffect } from "react";
import ModalWrapper from "../../utils/Modalwrapper";
import ReactLoading from "react-loading";
import Avatar from "react-avatar-edit";
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

  const ImageSavehandler = () => {
    if (Preview) {
      seterror(false);
      setsubmitted(true);
    } else {
      seterror("Select an image");
    }
  };

  useEffect(() => {
    if (props.file) {
      SetImage(URL.createObjectURL(props.file));
    }
  }, [props.file]);

  useEffect(() => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json"
      },
      body: JSON.stringify({ image: Preview }),
      mode: "cors"
    };
    const callingapi = async () => {
      try {
        const response = await fetch("/public/demo", requestOptions);
        const data = await response.json();
        if (response.ok) {
          props.mutator(data.message);
        } else {
          seterror(data.message);
        }
        setsubmitted(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (submitted) {
      callingapi();
    }
  }, [submitted]);

  return (
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
            {submitted ? (
              <ReactLoading type="spin" color="#fff" height="35px" width="35px" className="reactloading" />
            ) : (
              <button onClick={ImageSavehandler}>Save</button>
            )}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default Preview;
