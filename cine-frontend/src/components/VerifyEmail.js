import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../cssFiles/Login.css';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  console.log('verifypage');
  const navigate = useNavigate();
  const [emailpage, setEmailPage] = useState(true);

  const [currentUserEmail, setCurentUserEmail] = useState('');
  const getCurrUserEmail = async () => {
    const token = localStorage.getItem('access');
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    const url = 'http://127.0.0.1:8000/auth/user/me/';
    const response = await axios.get(url, config);
    setCurentUserEmail(response.data.email);
  };
  useEffect(() => {
    getCurrUserEmail();
  }, []);

  const EmailPage = () => {
    // const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const onVerify = async () => {
      if (email === currentUserEmail) {
        const userData = {
          email: email,
        };
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
        const url = 'http://127.0.0.1:8000/auth/user/send-otp/';
        const response = await axios.post(url, userData, config);
        if (response.status == 200) {
          alert('Otp sent');
          setEmailPage(false);
        } else {
          alert('Server Not Responding');
        }
      } else {
        alert('Type your currently registered email');
      }
    };
    return (
      <>
        <div className={'mainloginContainer'}>
          <div className={'titleloginContainer'}>
            <div>Verify Email</div>
          </div>
          <br />
          <div className={'inputContainer'}>
            <input
              value={email}
              placeholder='Enter your email here'
              onChange={(e) => setEmail(e.target.value)}
              className={'inputBox'}
            />
          </div>
          <br />
          <div className={'inputContainer'}>
            <input
              className={'inputButton'}
              type='button'
              onClick={onVerify}
              value={'Send OTP'}
            />
          </div>
        </div>
      </>
    );
  };
  const OtpPage = () => {
    const [otp, setOtp] = useState(null);
    const [otpError, setOtpError] = useState('');
    const onVerify = async () => {
      const userData = {
        email: currentUserEmail,
      };
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const url = 'http://127.0.0.1:8000/auth/user/send-otp/';
      const response = await axios.post(url, userData, config);
      if (response.status == 200) {
        alert('Otp sent');
        setEmailPage(false);
      } else {
        alert('Server Not Responding');
      }
    };
    const Verify = async () => {
      const userData = {
        email: currentUserEmail,
        verification_otp: otp,
      };
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const url = 'http://127.0.0.1:8000/auth/user/verify-otp/';
      const response = await axios.post(url, userData, config);
      if (response.status == 200) {
        alert('email verified');
        navigate('/auth/profile');
      } else {
        alert("OT didn't matched");
      }
    };
    return (
      <>
        <div className={'mainloginContainer'}>
          <div className={'titleloginContainer'}>
            <div>Enter otp</div>
          </div>
          <br />
          <div className={'inputContainer'}>
            <input
              value={otp}
              placeholder='Enter otp'
              type='number'
              onChange={(e) => setOtp(e.target.value)}
              className={'inputBox'}
            />
            <label className='errorLabel'>{otpError}</label>
          </div>
          <br />
          <div className={'inputContainer'}>
            <input
              className={'inputButton'}
              type='button'
              onClick={Verify}
              value={'Verify'}
            />
          </div>
          <div className='resend'>
            {' '}
            <input
              className={'inputButton'}
              type='button'
              onClick={onVerify}
              value={'Resend'}
            />
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      {emailpage ? <EmailPage /> : <OtpPage />}
    </>
  );
};

export default VerifyEmail;
