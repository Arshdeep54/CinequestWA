import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const GoogleAuth = () => {
  const onGoogleLoginSuccess = async (response) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}auth/google_authenticate/`,
        {
          access_token: response.accessToken,
        }
      );

      // Handle success (e.g., set user state, redirect)
      console.log('Social login success:', res.data);
    } catch (error) {
      // Handle error
      console.error('Social login error:', error);
    }
  };

  const onGoogleLoginFailure = (error) => {
    // Handle failure
    console.error('Social login failure:', error);
  };

  return (
    <GoogleLogin
      clientId='your-google-client-id'
      buttonText='Login with Google'
      onSuccess={onGoogleLoginSuccess}
      onFailure={onGoogleLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleAuth;
