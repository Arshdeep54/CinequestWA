import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
// import { LogOut } from 'lucide-react';
import axios from 'axios';
import '../cssFiles/UserProfile.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import UserReviews from './UserReviews';
import Footer from './Footer';

import { ShieldAlert } from 'lucide-react';
import UserFavs from './UserFavs';
import { TailSpin } from 'react-loader-spinner';
// import Userinfo from './Userinfo';
function Userprofile() {
  const navigate = useNavigate();
  const pics = [
    'Java_1.png',
    'gamer.png',
    'cat.png',
    'hacker.png',
    'man(1).png',
    'man.png',
    'woman.png',
    'profile.png',
    'profile(1).png',
    'user.png',
  ];
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [profile_toShow, setProfileToShow] = useState(null);
  const assetsPath = '../assets';
  // const assetsPath = process.env.PUBLIC_URL + '/src/assets';

  const handleImageClick = (imageName) => {
    const imagePath = `${assetsPath}/${imageName}`;
    console.log(imagePath);
    setSelectedImage((prevSelectedImage) =>
      prevSelectedImage === imagePath ? null : imagePath
    );
  };
  const getuserData = async () => {
    const token = localStorage.getItem('access');
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    const url = `${process.env.REACT_APP_API_URL}auth/user/me/`;
    await axios
      .get(url, config)
      .then((response) => {
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
      })
      .catch((error) => {
        console.error(error);
        if (error.status == 401) {
          console.log('Token expired or invalid. Please log in again.');
          localStorage.removeItem('access');
          alert('Please login again');
          navigate('/auth/login');
        }
      });
  };
  useEffect(() => {
    getuserData();
  }, []);

  var today = new Date();
  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const handleSave = async () => {
    setSaving(true);
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
    if (selectedImage && !profile_picture) {
      formData.append('profile_picture', selectedImage);
    } else if (profile_picture && profile_picture[0]) {
      formData.append('profile_picture', profile_picture[0]);
    }
    const url = `${process.env.REACT_APP_API_URL}auth/user/me/`;
    await axios
      .patch(url, formData, config)
      .then((response) => {
        console.log(response.data);
        if (response) {
          setProfilePicture(null);
          document.getElementById('image').value = '';
          getuserData();
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.status == 401) {
          console.log('Token expired or invalid. Please log in again.');
          localStorage.removeItem('access');
          alert('Please login again');
          navigate('/auth/login');
        }
      });
    setSaving(false);
  };
  const Logout = () => {
    localStorage.clear();
    navigate('/');
  };
  const changePassword = () => {
    navigate('/auth/changepassword');
  };
  const yourActivityPage = () => {
    navigate('/auth/activity');
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
          {/* <Link to='/auth/profile#profile'>User Profile</Link>
          <Link to='/auth/profile#reviews'>Your Reviews</Link>
          <Link to='/auth/profile#favourites'>Favourite Movies </Link>
          <Link to='/auth/profile#accSettings'>Account Settings</Link> */}
          <a href='#profile'>User Profile</a>
          <a href='#reviews'>Your Reviews</a>
          <a href='#accSettings'>Account Settings</a>
          <a href='#favourites'>Favourite Movies </a>
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
                          : `${process.env.REACT_APP_API_URL}media/profile_images/defaultprofile.png`
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
                  <div style={{ display: 'none' }}>Choose Default</div>
                  <div style={{ display: 'none' }} className='picCont'>
                    <div className='row-1-pics'>
                      {pics.slice(0, 5).map((pic) => {
                        return (
                          <>
                            <div className='dimgCont'>
                              <img
                                onClick={() => handleImageClick(pic)}
                                src={`https://arshdeep54.pythonanywhere.com/media/profile_images/${pic}`}
                                style={{
                                  border:
                                    selectedImage === pic
                                      ? '2px solid black'
                                      : '1px solid transparent',
                                }}
                              />
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className='row-2-pics'>
                      {pics.slice(5, 10).map((pic) => {
                        return (
                          <>
                            <div className='dimgCont'>
                              <img
                                onClick={() => handleImageClick(pic)}
                                src={`https://arshdeep54.pythonanywhere.com/media/profile_images/${pic}`}
                                style={{
                                  border:
                                    selectedImage === pic
                                      ? '2px solid black'
                                      : '1px solid transparent',
                                }}
                              />
                            </div>
                          </>
                        );
                      })}
                    </div>
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
                        value={
                          userProfile.mobile === 0 ? '' : userProfile.mobile
                        }
                        onChange={(e) => {
                          setUserProfile({
                            ...userProfile,
                            mobile: e.target.value === '' ? 0 : e.target.value,
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
              {saving ? (
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
                <>Save</>
              )}
            </button>
          </div>
          <UserReviews />
          <UserFavs />

          <div className='userAccinfo' id='accSettings'>
            <div className='textPersonalInfo'>Account Settings </div>
            <div className='cbtn' onClick={yourActivityPage}>
              Your Activity
            </div>
            <div className='cbtn' onClick={changePassword}>
              Change password
            </div>
            <div className='cbtn' onClick={Logout}>
              Log out
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Userprofile;
