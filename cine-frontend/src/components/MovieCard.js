import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <>
      <div className='movieCard'>
        <div className='cardFront'>
          <div className='imagecont'>
            <img className='img' src={movie.poster_link}></img>
          </div>
        </div>
        <div className='cardBack'>
          <div>Title: {movie.title}</div>
          <div>Released On: {movie.release_date}</div>
          <div>Rating: {movie.rating}/10</div>
          <div>Available On: {movie.platform}</div>
          <div>Available In: {movie.language}</div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
