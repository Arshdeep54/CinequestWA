import React, { useState } from 'react';
import Navbar from './Navbar';
import '../cssFiles/Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
function Signuppage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const onButtonClick = async () => {
    const userData = {
      email: email,
      name: username,
      password: password,
      password2: confirmpassword,
    };
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const url = `${process.env.REACT_APP_API_URL}auth/user/register/`;
    await axios
      .post(url, userData, config)
      .then((response) => {
        console.log(response.data);
        console.log(response.data['msg']);
        console.log(response.data['token']['access']);
        if (response.data['token']) {
          localStorage.setItem('access', response.data['token']['access']);
          localStorage.setItem('refresh', response.data['token']['refresh']);
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error.response.data.errors['email']);
        console.log(error.response.data.errors);
        const error_message = error.response.data.errors;
        if (error_message['email']) {
          setPasswordError(error_message['email']);
        } else {
          setPasswordError(error_message['non_field_errors']);
        }
        // alert(error_message);
      });

    // navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className={'mainloginContainer'}>
        <div className={'titleloginContainer'}>
          <div>Sign Up</div>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={username}
            placeholder='Enter your name here'
            onChange={(e) => setUsername(e.target.value)}
            className={'inputBox'}
          />
          <label className='errorLabel'>{emailError}</label>
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
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={confirmpassword}
            placeholder='Confirm the password'
            onChange={(ev) => setConfirmPassword(ev.target.value)}
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
            value={'Sign Up'}
          />
        </div>
        {/* <div>
          <GoogleAuth />
        </div> */}
        <div className='texttosignup'>
          <text>Already have an account </text>
          <Link to='/auth/login'>Log In</Link>
        </div>
      </div>
    </>
  );
}

export default Signuppage;
