import React, { useState } from 'react';
import Navbar from './Navbar';
import { Search } from 'lucide-react';

function Homepage() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <Navbar loggedIn={loggedIn} />
      <div className='homeContainer'>
        <div className='searchCont'>
          <div className='searchBox'>
            <input />
            <div>
              <Search />
            </div>
          </div>
        </div>
        <div className='filersCont'>
          <select>
            <option>choice 1 </option>
            <option>choice 2 </option>
            <option>choice 3 </option>
          </select>
          <select>
            <option>choice 1 </option>
            <option>choice 2 </option>
            <option>choice 3 </option>
          </select>
          <select>
            <option>choice 1 </option>
            <option>choice 2 </option>
            <option>choice 3 </option>
          </select>
        </div>
        <div className='MovieCont'></div>
      </div>
    </>
  );
}

export default Homepage;
