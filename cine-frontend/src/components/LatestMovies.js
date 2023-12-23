import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import {
  ChevronLeft,
  ChevronLeftCircle,
  ChevronLeftSquare,
  ChevronRight,
  ChevronRightSquare,
} from 'lucide-react';
const LatestMovies = ({ orderBy }) => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;
  const [ifhoveredp, setIfHoveredp] = useState(false);
  const [ifhoveredn, setIfHoveredn] = useState(false);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = latestMovies.slice(startIndex, endIndex);
  const getLatestMovies = async () => {
    const url = `http://127.0.0.1:8000/moviesapi/movies/?ordering=-${orderBy}`;
    const response = await axios.get(url);
    // console.log(response.data);
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
      <div className='moviesSection'>
        <div className='headText'>
          {orderBy == 'release_date' ? 'Latest' : 'Popular'} Movies
        </div>
        <div className='horCont'>
          {currentPage > 1 && (
            <span className='pbtn' onClick={handlePrevPage}>
              <ChevronLeft
                color={!ifhoveredp ? '#9aa0a6' : 'white'}
                size={'32px'}
                onMouseEnter={() => setIfHoveredp(!ifhoveredp)}
                onMouseLeave={() => setIfHoveredp(!ifhoveredp)}
              />
            </span>
          )}
          {currentMovies.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
          {latestMovies.length > endIndex && (
            <span className='nbtn' onClick={handleNextPage}>
              <ChevronRight
                color={!ifhoveredn ? '#9aa0a6' : 'white'}
                size={'32px'}
                onMouseEnter={() => setIfHoveredn(!ifhoveredn)}
                onMouseLeave={() => setIfHoveredn(!ifhoveredn)}
              />
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default LatestMovies;
