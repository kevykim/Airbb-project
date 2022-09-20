import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginFormModal.css'

function LoginForm({closeModal}) {
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
      <div className="login_header">
      <button onClick={() => closeModal()} className="closeButton">X</button>
      <div className="login_text">Log In</div>
      </div>
    <form style={{ width: "568px", padding: "24px"}}onSubmit={handleSubmit}>
      <h2>Welcome to Airbb</h2>
      <div>
     
        <input
          className="loginemail"
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
      <ul className="loginerror">
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </ul>
    </div>
  );
}

export default LoginForm;
