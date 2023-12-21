import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <>
      {/* <div className='movieCard'>
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
      </div> */}
      <div className='movie-card'>
        <Link to={`/movies/${movie.id}`} className='movie-link'>
          <img
            src={movie.poster_link}
            alt={movie.title}
            className='movie-image'
          />
          <div className='movie-details'>
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            {/* Add more details as needed */}
          </div>
        </Link>
      </div>
    </>
  );
};

export default MovieCard;
