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
    <div className="logindiv">
      <div className="login_header">
      <button onClick={() => closeModal()} className="closeButton">X</button>
      <div className="login_text">Log In</div>
      </div>
    <form className="loginform" onSubmit={handleSubmit}>
      <h2>Welcome to Airbb</h2>
      <div>
     
        <input
          className="loginemail"
          placeholder="Email or Username"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}

        />

      </div>
      <div>


        <input
          className="loginpass"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />

      </div>
      <button className="loginbutton" type="submit">Log In</button>
    </form>
      <div className="loginerror">
        {errors.map((error, idx) => (
          <div className="loginerror_text" key={idx}>{error}</div>
        ))}
      </div>
    </div>
  );
}

export default LoginForm;
