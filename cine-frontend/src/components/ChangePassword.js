import React, { useState } from 'react';
import '../cssFiles/Login.css';
import Navbar from './Navbar';
import axios from 'axios';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
function ChangePassword() {
  const navigate = useNavigate();
  const { uid, sent_token } = useParams();
  console.log(uid, sent_token);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const onButtonClick = async () => {
    if (uid && sent_token) {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const body = {
        password: password,
        password2: password2,
      };
      const url = `http://127.0.0.1:8000/auth/user/resetpassword/${uid}/${sent_token}/`;
      const response = await axios.post(url, body, config);
      console.log(response.data);
      if (response) {
        navigate('/auth/profile');
      }
    } else {
      const token = localStorage.getItem('access');
      const body = {
        password: password,
        password2: password2,
      };
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      };
      const url = 'http://127.0.0.1:8000/auth/user/changepassword/';
      const response = await axios.post(url, body, config);
      console.log(response.data);
      if (response) {
        navigate('/auth/login');
      }
    }

    // navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className={'mainloginContainer'}>
        <div className={'titlechangeContainer'}>
          <div>Change Password</div>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={password}
            placeholder='New password '
            onChange={(e) => setPassword(e.target.value)}
            className={'inputBox'}
          />
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={password2}
            placeholder='Confirm password'
            onChange={(ev) => setPassword2(ev.target.value)}
            className={'inputBox'}
          />
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            className={'inputButton'}
            type='button'
            onClick={onButtonClick}
            value={'Confirm Change'}
          />
        </div>
        <div className='textforgot'>
          <text>Cancel </text>
          <Link to={uid && sent_token ? '/auth/login' : '/auth/profile'}>
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
