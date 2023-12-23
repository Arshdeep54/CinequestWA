import React, { useState } from 'react';
import MovieCard from './MovieCard';
import LatestMovies from './LatestMovies';
import PopularMovies from './PopularMovies';
import AllMovies from './AllMovies';

const MoviePageWithoutFilters = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [bestof23Movies, setBestof23Movies] = useState([]);

  return (
    <>
      <LatestMovies orderBy={'release_date'} />
      <LatestMovies orderBy={'rating'} />
      <AllMovies />
    </>
  );
};

export default MoviePageWithoutFilters;
