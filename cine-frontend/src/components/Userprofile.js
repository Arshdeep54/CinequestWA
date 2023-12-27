import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
// import { LogOut } from 'lucide-react';
import axios from 'axios';
import '../cssFiles/UserProfile.css';
import { Navigate, useNavigate } from 'react-router-dom';
import UserReviews from './UserReviews';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ShieldAlert } from 'lucide-react';
// import Userinfo from './Userinfo';
function Userprofile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    LastName: '',
    dob: null,
    gender: '',
    email: '',
    isEmailVerified: false,
    mobile: '',
    aboutmovielife: '',
  });
  const [profile_picture, setProfilePicture] = useState(null);
  const [profile_toShow, setProfileToShow] = useState(null);
  const getuserData = async () => {
    const token = localStorage.getItem('access');
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    const url = 'http://127.0.0.1:8000/auth/user/me/';
    const response = await axios.get(url, config);
    console.log(response.data.profile_picture);
    const userprofile = {
      firstName:
        response.data.first_name === 'null' ? '' : response.data.first_name,
      LastName:
        response.data.last_name === 'null' ? '' : response.data.last_name,
      dob: response.data.date_of_birth,
      gender: response.data.gender,
      mobile: response.data.mobile === 'null' ? '' : response.data.mobile,
      aboutmovielife:
        response.data.aboutmovieLife === 'null'
          ? ''
          : response.data.aboutmovieLife,
      email: response.data.email,
      isEmailVerified: response.data.email_verified,
    };
    console.log(userprofile);
    setUserProfile({ ...userprofile });
    setProfileToShow(response.data.profile_picture);
  };
  useEffect(() => {
    getuserData();
  }, []);

  var today = new Date();
  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const handleSave = async () => {
    const token = localStorage.getItem('access');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${token}`,
      },
    };
    // const body = {
    //   profile_picture: userProfile.profile_picture,
    //   first_name: userProfile.firstName,
    //   last_name: userProfile.LastName,
    //   date_of_birth: userProfile.dob,
    //   gender: userProfile.gender,
    //   mobile: userProfile.mobile,
    //   aboutmovieLife: userProfile.aboutmovielife,
    // };
    const formData = new FormData();

    formData.append('first_name', userProfile.firstName);
    formData.append('last_name', userProfile.LastName);
    formData.append('date_of_birth', userProfile.dob);
    formData.append('gender', userProfile.gender);
    formData.append('mobile', userProfile.mobile);
    formData.append('aboutmovieLife', userProfile.aboutmovielife);
    if (profile_picture && profile_picture[0]) {
      formData.append('profile_picture', profile_picture[0]);
    }
    const url = 'http://127.0.0.1:8000/auth/user/me/';
    const response = await axios.patch(url, formData, config);
    console.log(response.data);
    if (response) {
      setProfilePicture(null);
      document.getElementById('image').value = '';
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
  const handleVerify = () => {
    navigate('/auth/verifyemail');
  };

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
            <form encType='multipart/form-data'>
              <div className='upper'>
                <div className='upperleft'>
                  <div className='profilepic'>
                    <img
                      src={
                        profile_toShow
                          ? profile_toShow
                          : 'http://127.0.0.1:8000/media/profile_images/defaultprofile.png'
                      }
                      alt='React Image'
                    />
                  </div>
                  <div className='inputfile'>
                    <input
                      type='file'
                      id='image'
                      accept='image/png, image/jpeg, image/jpg'
                      onChange={(e) => {
                        console.log(e.target.files);
                        setProfilePicture(e.target.files);
                      }}
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
                        Email{' '}
                        {!userProfile.isEmailVerified && (
                          <span title='Verify Email'>
                            <ShieldAlert
                              color='red'
                              size={'18px'}
                              onClick={handleVerify}
                            />
                          </span>
                        )}
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
            </form>
          </div>
          <div className='Savediv'>
            <button className='savebtn' onClick={handleSave}>
              Save
            </button>
          </div>
          <UserReviews />
          <div className='userFavMovies' id='favourites'></div>
          <div className='userAccinfo' id='accSettings'>
            <button className='savebtn' onClick={Logout}>
              Log out
            </button>
            <button className='savebtn' onClick={changePassword}>
              Change password
            </button>
            {/* <button className='savebtn' onClick={verifyEmail}>
              Verify email
            </button> */}
          </div>
        </div>
      </div>
      <footer>this is footer here </footer>
    </>
  );
}

export default Userprofile;
