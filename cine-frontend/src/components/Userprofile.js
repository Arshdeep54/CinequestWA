import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
// import { LogOut } from 'lucide-react';
import axios from 'axios';
import '../cssFiles/UserProfile.css';
import { Navigate, useNavigate } from 'react-router-dom';
import UserReviews from './UserReviews';
// import Userinfo from './Userinfo';
function Userprofile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    LastName: '',
    dob: '',
    gender: '',
    email: '',
    mobile: '',
    aboutmovielife: '',
  });
  const getuserData = async () => {
    const token = localStorage.getItem('access');
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };
    const url = 'http://127.0.0.1:8000/auth/user/me/';
    const response = await axios.get(url, config);
    console.log(response.data.first_name);
    const userprofile = {
      firstName: response.data.first_name,
      LastName: response.data.last_name,
      dob: response.data.date_of_birth,
      gender: response.data.gender,
      mobile: response.data.mobile,
      aboutmovielife: response.data.aboutmovieLife,
      email: response.data.email,
    };
    console.log(userprofile);
    setUserProfile({ ...userprofile });
  };
  useEffect(() => {
    getuserData();
  }, [1000]);

  var today = new Date();
  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const handleSave = async () => {
    const token = localStorage.getItem('access');
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };
    const body = {
      first_name: userProfile.firstName,
      last_name: userProfile.LastName,
      date_of_birth: userProfile.dob,
      gender: userProfile.gender,
      mobile: userProfile.mobile,
      aboutmovieLife: userProfile.aboutmovielife,
    };
    const url = 'http://127.0.0.1:8000/auth/user/me/';
    const response = await axios.patch(url, body, config);
    if (response) {
      getuserData();
    }
  };
  const Logout = () => {
    localStorage.clear();
    navigate('/');
  };
  const changePassword = () => {
    navigate('/auth/changepassword');
  };

  // const Userinfo = ({ label, value, readonly }) => {
  //   return (
  //     <>
  //       <div
  //         style={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           boxSizing: 'border-box',
  //         }}
  //       >
  //         <label style={{ fontWeight: '700', color: '#000' }}>{label}</label>
  //         {readonly ? (
  //           <input
  //             name='inputInfo'
  //             type='text'
  //             readOnly
  //             value={value}
  //             style={{
  //               width: '100%',
  //               padding: '10px',
  //               border: '1px solid #ccc',
  //               borderRadius: '5px',
  //             }}
  //           />
  //         ) : (
  //           <input
  //             name='inputInfo'
  //             type='text'
  //             value={value}
  //             onChange={(e) => {
  //               setUserProfile({ ...userProfile, firstName: e.target.value });
  //             }}
  //             style={{
  //               width: '100%',
  //               padding: '10px',
  //               border: '1px solid #ccc',
  //               borderRadius: '5px',
  //             }}
  //           />
  //         )}
  //       </div>
  //     </>
  //   );
  // };
  return (
    <>
      <Navbar />
      <div className='MainPage'>
        <div className='leftLinksSection'>
          <div className='contenttext'>Contents</div>
          <br />
          <a href='#profile'>User Profile</a>
          <a href='#reviews'>Your Reviews</a>
          <a href='#favourites'>Favourite Movies </a>
          <a href='#accSettings'>Account Settings</a>
        </div>
        <div className='rightMain'>
          <div className='userInfo' id='profile'>
            <div className='textPersonalInfo'>Personal Info</div>
            <div className='upper'>
              <div className='upperleft'>
                <div className='profilepic'>
                  <img
                    src='https://reactjs.org/logo-og.png'
                    alt='React Image'
                  />
                </div>
              </div>
              <div className='upperright'>
                {/* <div className='textPersonalInfo'>Personal Info</div> */}
                <div className='inforow'>
                  <div className='form-group'>
                    <label style={{ fontWeight: '700', color: '#000' }}>
                      First Name
                    </label>
                    <input
                      name='inputInfo'
                      type='text'
                      value={userProfile.firstName}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          firstName: e.target.value,
                        });
                      }}
                      className='inputboxUser'
                    />
                  </div>
                  <div className='form-group'>
                    <label style={{ fontWeight: '700', color: '#000' }}>
                      Last Name
                    </label>
                    <input
                      name='inputInfo'
                      type='text'
                      value={userProfile.LastName}
                      className='inputboxUser'
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          LastName: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className='inforow'>
                  <div className='form-group'>
                    <label style={{ fontWeight: '700', color: '#000' }}>
                      Date of birth
                    </label>
                    <input
                      name='inputInfo'
                      type='text'
                      value={userProfile.dob != null ? userProfile.dob : date}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          dob: e.target.value,
                        });
                      }}
                      className='inputboxUser'
                    />
                  </div>
                  <div className='form-group'>
                    <label style={{ fontWeight: '700', color: '#000' }}>
                      Gender
                    </label>
                    <input
                      name='inputInfo'
                      type='text'
                      value={userProfile.gender}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          gender: e.target.value,
                        });
                      }}
                      className='inputboxUser'
                    />
                  </div>
                </div>
                <div className='inforow'>
                  <div className='form-group'>
                    <label style={{ fontWeight: '700', color: '#000' }}>
                      Email
                    </label>
                    <input
                      name='inputInfo'
                      type='text'
                      value={userProfile.email}
                      readOnly
                      className='inputboxUser'
                    />
                  </div>
                  <div className='form-group'>
                    <label style={{ fontWeight: '700', color: '#000' }}>
                      Mobile
                    </label>
                    <input
                      name='inputInfo'
                      type='text'
                      value={userProfile.mobile}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          mobile: e.target.value,
                        });
                      }}
                      className='inputboxUser'
                    />
                  </div>
                </div>
                <div className='AboutUsermovie'>
                  <div className='labeltext'>Tell About your Movie Life</div>
                  <textarea
                    className='textbox'
                    value={userProfile.aboutmovielife}
                    onChange={(e) => {
                      setUserProfile({
                        ...userProfile,
                        aboutmovielife: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            {/* <div className='lower'></div> */}
          </div>
          <div className='Savediv'>
            <button className='savebtn' onClick={handleSave}>
              Save
            </button>
            <button className='savebtn' onClick={Logout}>
              Log out
            </button>
            <button className='savebtn' onClick={changePassword}>
              Change password
            </button>
          </div>
          <UserReviews />
          <div className='userFavMovies' id='favourites'></div>
          <div className='userAccinfo' id='accSettings'></div>
        </div>
      </div>
      <footer>this is footer here </footer>
    </>
  );
}

export default Userprofile;
