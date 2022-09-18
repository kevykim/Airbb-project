import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginFormModal.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
      dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
      );
    };
    
  return (
    <div className="loginform">
      <h1>Log In</h1>
    <form onSubmit={handleSubmit}>
      <ul className="loginerror">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div>
     
        <input
          className="loginemailuser"
          placeholder="Email or Username"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />

      </div>
      <div>


        <input
          className="loginpass"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

      </div>
      <button className="loginbutton" type="submit">Log In</button>
    </form>
    </div>
  );
}

export default LoginForm;
