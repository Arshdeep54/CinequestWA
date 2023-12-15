import React, { useState } from 'react';
import Navbar from './Navbar';
import '../cssFiles/Login.css';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Loginpage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const onButtonClick = async () => {
    const userData = {
      email: email,
      password: password,
    };
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const url = 'http://127.0.0.1:8000/auth/user/login/';
    const response = await axios.post(url, userData, config);
    console.log(response.data);
    console.log(response.data['msg']);
    console.log(response.data['token']['access']);
    if (response.data['token']) {
      localStorage.setItem('access', response.data['token']['access']);
      localStorage.setItem('refresh', response.data['token']['refresh']);
      navigate('/');
    }

    // navigate("/");
  };

  return (
    <>
      <Navbar />
      {/* <div className="mainlogindiv">
        <text className="logintext">Login</text>
        <div className="loginbox">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(text) => setUsername(text)}
            required
          />

          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(text) => setPassword(text)}
            required
          />
          <button>Login</button>
        </div>
      </div> */}
      <div className={'mainloginContainer'}>
        <div className={'titleloginContainer'}>
          <div>Login</div>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={email}
            placeholder='Enter your email here'
            onChange={(e) => setEmail(e.target.value)}
            className={'inputBox'}
          />
          <label className='errorLabel'>{emailError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={password}
            placeholder='Enter your password here'
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className='errorLabel'>{passwordError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            className={'inputButton'}
            type='button'
            onClick={onButtonClick}
            value={'Log in'}
          />
        </div>
        <div className='textforgot'>
          <text>Forget password? </text>
          <Link to='/signup'>Reset</Link>
        </div>
        <div className='texttosignup'>
          <text>Don't have an account </text>
          <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
