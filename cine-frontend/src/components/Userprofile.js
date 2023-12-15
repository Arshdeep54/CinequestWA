import React from 'react';
import Navbar from './Navbar';
import { LogOut } from 'lucide-react';
import '../cssFiles/UserProfile.css';
import Userinfo from './Userinfo';
function Userprofile() {
  // const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    // navigate('/login')
  };
  return (
    <>
      <Navbar />
      <div className='userPofileMain'>
        <div className='userInfo'>
          <div className='upper'>
            <div className='upperleft'>
              <div className='profilepic'>
                {/* <img src='https://reactjs.org/logo-og.png' alt='React Image' /> */}
              </div>
            </div>
            <div
              className='upperright'
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <Userinfo label='First Name' value='dude' readonly={true} />
              <Userinfo label='Last Name' value='perfect' readonly={true} />
            </div>
          </div>
          <div className='lower'></div>
        </div>
        <div className='userPrevApp'></div>
        <div className='userAccinfo'></div>
      </div>
    </>
  );
}

export default Userprofile;
