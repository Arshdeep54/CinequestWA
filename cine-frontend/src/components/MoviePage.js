import React from 'react';
import Navbar from './Navbar';

const MoviePage = ({ movie }) => {
  return (
    <>
      <Navbar />
      <div className='MovieContainer'></div>
    </>
  );
};

export default MoviePage;
