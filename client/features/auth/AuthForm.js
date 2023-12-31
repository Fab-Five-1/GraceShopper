import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

import { Link } from 'react-router-dom';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
    // need to write logic that navigate them to admin if not admin navigate them to homepage or elsewhere its in 'navigate' in reactor-router dom
  };

  return (
    <div>
      <div className="logInContainer">
        <h2> Sign in</h2>
        <form className="logIn" onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button className="formButton" type="submit">{displayName}</button>
          </div >
          {/* {error && <div> {error} </div>} */}
          {error && <div style={{ color: "red" }}>Please fill in correct username/password or Create an Account</div>}
        </form>
      </div>
      <hr className="loginHR"></hr>
      <div className="createContainer">
        <h4>New here?</h4>
        <Link to="/signup">
          <button>Create an Account</button>
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
