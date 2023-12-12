import React, { useState } from "react";
import Navbar from "./Navbar";
import "../cssFiles/Login.css";
import {
  NavLink,
  Navigate,
  useNavigate,
  useNavigation,
} from "react-router-dom";
function Signuppage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const onButtonClick = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className={"mainloginContainer"}>
        <div className={"titleloginContainer"}>
          <div>Sign Up</div>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={username}
            placeholder="Enter your name here"
            onChange={(e) => setUsername(e.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(e) => setEmail(e.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="button"
            onClick={onButtonClick}
            value={"Sign Up"}
          />
        </div>
        <div className="texttosignup">
          <text>Already have an account </text>
          <NavLink to="/login">Log In</NavLink>
        </div>
      </div>
    </>
  );
}

export default Signuppage;
