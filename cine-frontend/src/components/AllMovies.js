import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
const AllMovies = () => {
  const itemsPerPage = 15;
  const [allMovies, setAllMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(itemsPerPage);
  const [originalVisibleMovies, setOriginalVisibleMovies] =
    useState(itemsPerPage);
  // var allmovies_length = 15;
  const showMoreMovies = () => {
    setOriginalVisibleMovies(visibleMovies);
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + itemsPerPage);
  };
  const getAllMovies = async () => {
    const url = ` ${process.env.REACT_APP_API_URL}moviesapi/movies/`;
    const response = await axios.get(url);
    // console.log(response.data);
    const all_movies = response.data;
    setAllMovies([...all_movies]);
    // allmovies_length = allMovies.length;
  };
  const showLessMovies = () => {
    setVisibleMovies(originalVisibleMovies);
  };
  useEffect(() => {
    getAllMovies();
  }, []);

  const visibleMoviesList = allMovies.slice(0, visibleMovies);
  return (
    <>
      <div className='allMovies'>
        <div className='headText'>All Movies</div>
        <div className='movie-grid'>
          {visibleMoviesList.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>

        {visibleMovies > itemsPerPage && (
          <div style={{ marginTop: '10px' }}>
            <button onClick={showLessMovies}>See Less</button>
          </div>
        )}

        <div style={{ marginTop: '10px' }}>
          <button onClick={showMoreMovies}>See More</button>
        </div>
      </div>
    </>
  );
};

export default AllMovies;
