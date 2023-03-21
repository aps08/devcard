import ModalWrapper from '../../helper/Modalwrapper';
import './SignUp.css';

const SignUp = (props) => {
  const submithandler = () => {
    props.close();
  };

  return (
    <ModalWrapper close={props.close} id="signup">
      <div className="top">
        <h3>Crop your devcard image</h3>
      </div>
      <div className="body">form value</div>
      <div className="bottom" style={{ justifyContent: 'center' }}>
        <button onClick={submithandler}>Sign Up</button>
      </div>
    </ModalWrapper>
  );
};

export default SignUp;
