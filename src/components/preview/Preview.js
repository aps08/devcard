import './Preview.css';
import ReactDOM from 'react-dom';
import Backdrop from '../backdrop/Backdrop';
import Avatar from 'react-avatar-edit';
import { useState } from 'react';

const Preview = (props) => {
  const [Image, SetImage] = useState(URL.createObjectURL(props.file));
  const [Preview, setPreview] = useState(null);
  const ImageSavehandler = () => {
    props.mutator(Preview, false);
  };
  return (
    <div className="modal">
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById('root-backdrop')
      )}
      <div className="top">
        <h4>Crop your card image</h4>
      </div>
      <div className="body">
        <Avatar
          src={Image}
          imageWidth={260}
          shadingColor="#111111"
          shadingOpacity=".9"
          label="Browse file"
          labelStyle={{ color: 'whitesmoke' }}
          onClose={() => SetImage(null)}
          onCrop={(view) => setPreview(view)}
        />
      </div>
      <div className="bottom">
        <button onClick={ImageSavehandler}>Save</button>
      </div>
    </div>
  );
};

export default Preview;
