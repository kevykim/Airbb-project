import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import "./SignupForm.css";

function SignupFormPage({closeModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);


  
  // const history = useHistory([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const validData = await dispatch(
        sessionActions.signup({ email, username, firstName, lastName, password })
        ).catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
        if (validData) closeModal()
        return validData;
      }
      return setErrors([
        "Password must match", 
      ]);
      
    };
    // history.push('/')

    const DemoClick = async (event) => {
      await dispatch(sessionActions.thunkDemoUser())
      closeModal()
    }


  return (
    <div className="signupdiv">
      <div className="signup_header">
        <button onClick={() => closeModal(false)} className="closeButton">
          X
        </button>
        <div className="signup_text">Sign up</div>
      </div>
      <form className="signupform" onSubmit={handleSubmit}>
        <h2>Welcome to Airbb</h2>
        <div className="signuperror">
          {errors.map((error, idx) => (
            <div className="signuperror_text" key={idx}>
              {error}
            </div>
          ))}
        </div>
        <div>
          <input
            className="signupemail"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="signupusername"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            className="signupfirst"
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <input
            className="signuplast"
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            className="signuppass"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            className="signupconfpass"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="signupbutton" type="submit">
          Sign Up
        </button>
      </form>
          <button onClick={DemoClick} className="signupdemo">Demo User</button>
    </div>
  );
}

export default SignupFormPage;
