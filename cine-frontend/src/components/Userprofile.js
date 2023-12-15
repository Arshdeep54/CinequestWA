import React, { useState } from 'react';
import Navbar from './Navbar';
import { LogOut } from 'lucide-react';
import '../cssFiles/UserProfile.css';
// import Userinfo from './Userinfo';
function Userprofile() {
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    LastName: '',
    dob: '',
    gender: '',
    email: '',
    mobile: '',
    aboutmovielife: '',
  });
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [dob, setDob] = useState('');
  // const [gender, setGender] = useState('');
  // const [email, setEmail] = useState('');
  // const [mobile, setmobile] = useState('');
  // const [aboutmovielife, setAboutmovielife] = useState('');
  const logout = () => {
    localStorage.clear();
    // navigate('/login')
  };
  var today = new Date(),
    date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
  const handleSave = () => {
    console.log('Saved');
  };
  // const changeValue = (value) => {
  //   setFirstName(value);
  // };
  const handleinputChange = (nvalue) => {
    const updatedUserProfile = {
      ...userProfile,
      firstName: nvalue,
    };
    setUserProfile(updatedUserProfile);
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
      <div className='userPofileMain'>
        <div className='userInfo'>
          <div className='upper'>
            <div className='upperleft'>
              <div className='profilepic'>
                <img src='https://reactjs.org/logo-og.png' alt='React Image' />
              </div>
            </div>
            <div className='upperright'>
              <div className='textPersonalInfo'>Personal Info</div>
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
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                    }}
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
                    value={userProfile.dob.length > 0 ? userProfile.dob : date}
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
                    onChange={(e) => {
                      setUserProfile({
                        ...userProfile,
                        email: e.target.value,
                      });
                    }}
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
        </div>
        <div className='userPrevApp'></div>
        <div className='userAccinfo'></div>
      </div>
    </>
  );
}

export default Userprofile;
