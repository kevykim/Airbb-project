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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, firstName, lastName, password })
        ).catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
      }
      return setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);

    };
    // history.push('/')


  return (
    <div className="signupform">
        <div className="signup_header">
          <button onClick={() => closeModal()} className="closeButton">X</button>
          <div className="signup_text">Sign up</div>
        </div>
      <form style={{ width: "568px", padding: "24px" }} onSubmit={handleSubmit}>
        <h2>Welcome to Airbb</h2>
        <div>
          <input
            className="signupemail"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="signupusername"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="signupfirst"
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="signuplast"
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="signuppass"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="signupconfpass"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <ul className="signuperror">
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </ul>
        <button className="signupbutton" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage;
