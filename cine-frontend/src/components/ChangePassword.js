import React, { useState } from 'react';
import '../cssFiles/Login.css';
import Navbar from './Navbar';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GrHide } from 'react-icons/gr';
import { FiEye, FiEyeOff } from 'react-icons/fi';
function ChangePassword() {
  const navigate = useNavigate();
  const { uid, sent_token } = useParams();
  // console.log(uid, sent_token);
  const [password, setPassword] = useState('');
  const [passwordhide, setPasswordhide] = useState(true);

  const [passwordhide2, setPasswordhide2] = useState(true);
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
      const url = ` ${process.env.REACT_APP_API_URL}auth/user/resetpassword/${uid}/${sent_token}/`;
      const response = await axios.post(url, body, config);
      console.log(response.data);
      if (response.status == 200) {
        alert('Password Changed');
        navigate('/auth/login');
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
      const url = `${process.env.REACT_APP_API_URL}auth/user/changepassword/`;
      const response = await axios.post(url, body, config);
      console.log(response.data);
      if (response.status == 200) {
        alert('Password Changed');
        navigate('/auth/profile');
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
        <div className={'inputContainer'} style={{ position: 'relative' }}>
          <input
            value={password}
            type={passwordhide ? 'password' : 'text'}
            placeholder='New password '
            onChange={(e) => setPassword(e.target.value)}
            className={'inputBox'}
          />
          <span
            style={{
              position: 'absolute',
              top: '31%',
              right: '4%',
              zIndex: 22,
              cursor: 'pointer',
            }}
            onClick={() => {
              setPasswordhide(!passwordhide);
            }}
          >
            {passwordhide ? <FiEye /> : <FiEyeOff />}
          </span>
        </div>
        <br />
        <div className={'inputContainer'} style={{ position: 'relative' }}>
          <input
            value={password2}
            type='password'
            placeholder='Confirm password'
            onChange={(ev) => setPassword2(ev.target.value)}
            className={'inputBox'}
          />
          <span
            style={{
              position: 'absolute',
              top: '31%',
              right: '4%',
              zIndex: 22,
              cursor: 'pointer',
            }}
            onClick={() => {
              setPasswordhide2(!passwordhide2);
            }}
          >
            {passwordhide2 ? <FiEye /> : <FiEyeOff />}
          </span>
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
