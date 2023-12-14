import React from 'react';
import Navbar from './Navbar';
import { LogOut } from 'lucide-react';

function Userprofile() {
  // const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    // navigate('/login')
  };
  return (
    <>
      <Navbar />

      <div>user Page</div>
      <div onClick={logout}>logout</div>
      <LogOut onClick={logout} />
    </>
  );
}

export default Userprofile;
