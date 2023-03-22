import { useState } from 'react';
import ModalWrapper from '../../helper/Modalwrapper';
import Username from '../../assets/images/user.png';
import Email from '../../assets/images/mail.png';
import Password from '../../assets/images/pass.png';
import './SignUp.css';

const FORM_INITIAL = {
  username: null,
  email: null,
  password: null
};

const SignUp = (props) => {
  const [errors, seterrors] = useState(FORM_INITIAL);
  const [Valid, setValid] = useState(FORM_INITIAL);
  const [timeoutId, setTimeoutId] = useState(null);
  const [formdata, setformdata] = useState(FORM_INITIAL);
  const [isDisabled, setisDisabled] = useState(true);

  const usernamehandler = (event) => {
    const { name, value } = event.target;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(() => {
        if (value.length === 0) {
          seterrors({ ...errors, [name]: 'Username is required' });
        } else if (value.length > 10) {
          seterrors({
            ...errors,
            [name]: 'Username cannot be more than 10 characters'
          });
        } else if (!/^[a-z0-9]{1,10}$/.test(value)) {
          seterrors({
            ...errors,
            [name]: 'Username can only contain lower case alphabets and numbers'
          });
        } else {
          seterrors({
            ...errors,
            [name]: null
          });
          setValid({ ...Valid, [name]: false });
          setformdata({ ...formdata, [name]: value });
        }
        setValid({ ...Valid, [name]: true });
      }, 500)
    );
  };

  const emailhanlder = (event) => {
    const { name, value } = event.target;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(() => {
        if (value.length === 0) {
          seterrors({ ...errors, [name]: 'Email is required' });
        } else if (value.length > 30) {
          seterrors({
            ...errors,
            [name]: 'Email cannot be more than 30 characters long'
          });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          seterrors({
            ...errors,
            [name]: 'Enter a valid email'
          });
        } else {
          seterrors({
            ...errors,
            [name]: null
          });
          setValid({ ...Valid, [name]: false });
          setformdata({ ...formdata, [name]: value });
        }
        setValid({ ...Valid, [name]: true });
      }, 500)
    );
  };
  const passwordhandler = (event) => {
    const { name, value } = event.target;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(() => {
        if (value.length === 0) {
          seterrors({ ...errors, [name]: 'Password is required' });
        } else if (value.length < 8) {
          seterrors({
            ...errors,
            [name]: 'Password should have a minimum length of 8 characters'
          });
        } else if (value.length > 20) {
          seterrors({
            ...errors,
            [name]: 'Password cannot have more than 20 characters'
          });
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+~`\-={}[\]:;'<>,.?]{8,20}$/.test(
            value
          )
        ) {
          seterrors({
            ...errors,
            [name]:
              'Password must contain special symbols, numbers,upper case and lower case characters'
          });
        } else {
          seterrors({
            ...errors,
            [name]: null
          });
          setValid({ ...Valid, [name]: false });
          setformdata({ ...formdata, [name]: value });
        }
        setValid({ ...Valid, [name]: true });
      }, 500)
    );
  };

  const formchangehandler = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(() => {
        const allFalse = Object.values(Valid).every((value) => value === true);
        console.log(allFalse, Valid);
        if (allFalse) {
          setisDisabled(false);
        } else {
          setisDisabled(true);
        }
      }, 500)
    );
  };
  const submithandler = (event) => {
    event.preventDefault();
    console.log(formdata);
    props.close();
  };

  return (
    <ModalWrapper close={props.close} id="signup">
      <div className="top">
        <h2>Create your free account</h2>
      </div>
      <div className="body" style={{ padding: '0 1rem' }}>
        <form
          id="signupform"
          onSubmit={submithandler}
          onChange={formchangehandler}>
          <div className="form_element">
            <label>Username</label>
            <div style={{ display: 'flex', position: 'relative' }}>
              <input
                name="username"
                type="text"
                placeholder="aps08"
                required={true}
                onChange={usernamehandler}
                onFocus={usernamehandler}
                autoComplete={false}
              />
              <img className="input_logo" src={Username} />
            </div>
            {errors.username && (
              <ul className="hints">
                <li className="hint-item">{errors.username}</li>
              </ul>
            )}
          </div>
          <div className="form_element">
            <label>Email</label>
            <div style={{ display: 'flex', position: 'relative' }}>
              <input
                name="email"
                type="email"
                placeholder="aps08@outlook.com"
                required={true}
                onChange={emailhanlder}
                onFocus={emailhanlder}
                autoComplete={false}
              />
              <img className="input_logo" src={Email} />
            </div>
            {errors.email && (
              <ul className="hints">
                <li className="hint-item">{errors.email}</li>
              </ul>
            )}
          </div>
          <div className="form_element">
            <label>Password</label>
            <div style={{ display: 'flex', position: 'relative' }}>
              <input
                name="password"
                type="password"
                placeholder="************"
                required={true}
                onChange={passwordhandler}
                autoComplete={false}
                onFocus={passwordhandler}
              />
              <img className="input_logo" src={Password} />
            </div>
            {errors.password && (
              <ul className="hints">
                <li className="hint-item">{errors.password}</li>
              </ul>
            )}
          </div>
        </form>
      </div>
      <div className="bottom">
        <button
          form="signupform"
          type="submit"
          style={{ margin: '0 1rem' }}
          disabled={isDisabled}>
          Sign Up For Free
        </button>
      </div>
    </ModalWrapper>
  );
};

export default SignUp;
