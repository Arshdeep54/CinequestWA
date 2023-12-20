import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
const PopularMovies = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;

  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = latestMovies.slice(startIndex, endIndex);
  const getLatestMovies = async () => {
    const url = 'http://127.0.0.1:8000/moviesapi/movies/?ordering=-rating';
    const response = await axios.get(url);
    console.log(response.data);
    const latest_movies = response.data.slice(0, 20);
    setLatestMovies([...latest_movies]);
  };
  useEffect(() => {
    getLatestMovies();
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <>
      <div>Popular Movies </div>
      <div style={{ display: 'flex' }} className='LatestMovies'>
        {currentPage > 1 && (
          <button onClick={handlePrevPage}>Show Previous 6 Movies</button>
        )}
        {currentMovies.map((movie) => {
          return <MovieCard movie={movie} />;
        })}
        {latestMovies.length > endIndex && (
          <button onClick={handleNextPage}>Show Next 6 Movies</button>
        )}
      </div>
    </>
  );
};

export default PopularMovies;
