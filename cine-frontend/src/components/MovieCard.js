import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <>
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
