import React, { useState } from 'react';
import Navbar from './Navbar';
import '../cssFiles/Login.css';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FileX } from 'lucide-react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { TailSpin } from 'react-loader-spinner';

function Loginpage() {
  const navigate = useNavigate();
  const [resetScreen, setresetScreen] = useState(false);

  const ResetPasswordScreen = () => {
    // console.log('reset');
    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const [loggingin, setLoggingin] = useState(false);

    const onReset = async () => {
      setLoggingin(true);
      const userData = {
        email: email,
      };
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const url = `${process.env.REACT_APP_API_URL}auth/user/send-reset-password-email/`;
      await axios
        .post(url, userData, config)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors['non_field_errors']);
          const error_message = error.response.data.errors['non_field_errors'];
          alert(error_message);
        });
      setLoggingin(false);
    };
    return (
      <>
        <div className={'mainloginContainer'}>
          <div className={'titleloginContainer'}>
            <div>Reset your password </div>
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
              className={'inputButton'}
              type='button'
              onClick={onReset}
              value={'Send Reset Link'}
            />
          </div>
          <div
            className='textforgot'
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: '5px',
            }}
          >
            <text>Remember password </text>
            <div
              className='linktext'
              onClick={() => setresetScreen(!resetScreen)}
            >
              {loggingin ? (
                <TailSpin
                  visible={true}
                  height='25'
                  width='25'
                  color='#4fa94d'
                  ariaLabel='tail-spin-loading'
                  radius='1'
                  wrapperStyle={{}}
                  wrapperClass=''
                />
              ) : (
                <>Login</>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordhide, setPasswordhide] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [loggingin, setLoggingin] = useState(false);
    const onButtonClick = async () => {
      setLoggingin(true);
      const userData = {
        email: email,
        password: password,
      };
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const url = `${process.env.REACT_APP_API_URL}auth/user/login/`;
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
          console.log(error.response.data.errors['non_field_errors']);
          const error_message = error.response.data.errors['non_field_errors'];
          setPasswordError(error_message);
          // alert(error_message);
        });
      setLoggingin(false);
      // navigate("/");
    };
    return (
      <>
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
          <div className={'inputContainer'} style={{ position: 'relative' }}>
            <input
              type={passwordhide ? 'password' : 'text'}
              value={password}
              placeholder='Enter your password here'
              onChange={(ev) => setPassword(ev.target.value)}
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
            <label className='errorLabel'>{passwordError}</label>
          </div>
          <br />
          <div className={'inputContainer'}>
            {loggingin ? (
              <TailSpin
                visible={true}
                height='25'
                width='25'
                color='#4fa94d'
                ariaLabel='tail-spin-loading'
                radius='1'
                wrapperStyle={{}}
                wrapperClass=''
              />
            ) : (
              <>
                <input
                  className={'inputButton'}
                  type='button'
                  onClick={onButtonClick}
                  value={'Log in'}
                />
              </>
            )}
          </div>
          <div
            className='textforgot'
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: '5px',
            }}
          >
            <text>Forget password? </text>
            <div
              className='linktext'
              onClick={() => setresetScreen(!resetScreen)}
            >
              Reset
            </div>
          </div>
          <div className='texttosignup'>
            <text>Don't have an account </text>
            <Link to='/auth/signup'>Sign Up</Link>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />

      {resetScreen ? <ResetPasswordScreen /> : <LoginScreen />}
    </>
  );
}

export default Loginpage;
