import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const LatestMovies = ({ orderBy }) => {
  const navigate = useNavigate();
  const [latestMovies, setLatestMovies] = useState([]);
  const [allMovies, setallMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = window.matchMedia('(max-width:767px)').matches ? 4 : 6;
  const [ifhoveredp, setIfHoveredp] = useState(false);
  const [ifhoveredn, setIfHoveredn] = useState(false);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = latestMovies.slice(startIndex, endIndex);
  const getAllMovies = async () => {
    const url = ` ${process.env.REACT_APP_API_URL}moviesapi/movies/`;
    const response = await axios.get(url);
    // console.log(response.data);
    const all_movies = response.data;
    setallMovies([...all_movies]);
    // allmovies_length = allMovies.length;
  };
  const getLatestMovies = async () => {
    const url = ` ${process.env.REACT_APP_API_URL}moviesapi/movies/?ordering=-${orderBy}`;
    const response = await axios.get(url);
    // console.log(response.data);
    const latest_movies = response.data.slice(0, 18);
    setLatestMovies([...latest_movies]);

    // try {
    //   if (localStorage.getItem('access')) {
    //     const token = localStorage.getItem('access');
    //     const config = {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `JWT ${token}`,
    //       },
    //     };
    //     const url = `${process.env.REACT_APP_API_URL}moviesapi/user-favourite-movies`;
    //     await axios
    //       .get(url, config)
    //       .then((response) => {
    //         const fav_movies = response.data.map((fav_movie) => {
    //           const movie_id = fav_movie['movie'];
    //           const movie = allMovies.find(
    //             (movie) => movie['id'] === movie_id
    //           );
    //           return movie;
    //         });

    //         console.log(fav_movies);

    //         const favTags = fav_movies.flatMap((movie) =>
    //           movie.genre ? movie.genre.split(',') : []
    //         );

    //         console.log(favTags);

    //         const recMovies = allMovies
    //           .filter((movie) =>
    //             movie.genre
    //               ? movie.genre
    //                   .split(',')
    //                   .some((genre) => favTags.includes(genre))
    //               : false
    //           )
    //           .sort((a, b) => b.rating - a.rating);

    //         setLatestMovies([...recMovies, ...allMovies].slice(0, 12));
    //       })
    //       .catch((error) => {
    //         if (error.status == 401) {
    //           console.log('Token expired or invalid. Please log in again.');
    //           localStorage.removeItem('access');
    //           alert('Please login again');
    //           navigate('/auth/login');
    //         }
    //       });
    //   } else {
    //     setLatestMovies([...allMovies]);
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   // Handle the error appropriately (e.g., display an error message to the user)
    // }
  };
  const getRecommendedMovies = async () => {
    try {
      if (localStorage.getItem('access')) {
        const token = localStorage.getItem('access');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
        };

        const url = `${process.env.REACT_APP_API_URL}moviesapi/user-favourite-movies`;
        const response = await axios.get(url, config);

        const favMovies = response.data.map((favMovie) => favMovie.movie);
        if (allMovies.length > 0) {
          const favMovieGenres = allMovies
            .filter((movie) => favMovies.includes(movie.id))
            .flatMap((movie) =>
              movie.genre
                ? movie.genre.split(',').map((genre) => genre.trim())
                : []
            )
            .filter((genre) => genre);
          console.log(favMovieGenres);
          const matchMovies = allMovies.filter((movie) => {
            const genres = movie.genre
              ? movie.genre
                  .split(',')
                  .map((genre) => genre.trim())
                  .filter((genre) => genre)
              : [];
            const matchingGenres = genres.filter((genre) =>
              favMovieGenres.includes(genre.trim())
            );

            console.log('Movie:', movie.title);
            console.log('Genres:', genres);
            console.log('Matching Genres:', matchingGenres);

            return matchingGenres.length > 0; // Adjust the condition as needed
          });
          console.log(matchMovies);
          const recMovies = matchMovies.sort((a, b) => b.rating - a.rating);

          setLatestMovies([...recMovies, ...allMovies].slice(0, 12));
        } else {
          console.log('getting all');
          getAllMovies();
        }
        // .flatMap((movie) =>
        //   movie.genre
        //     ? movie.genre.split(',').map((genre) => genre.trim())
        //     : []
        // );
      } else {
        // If user is not logged in, show all movies
        console.log('getting default');
        setLatestMovies([...allMovies]);
      }
    } catch (error) {
      console.error('Error fetching recommended movies:', error);
    }
  };
  useEffect(() => {
    getAllMovies();
  }, []);
  useEffect(() => {
    if (orderBy === 'recommended') {
      getRecommendedMovies();
    } else {
      getLatestMovies();
    }
  }, [orderBy, allMovies]);
  useEffect(() => {
    console.log(latestMovies);
  }, [latestMovies]);
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
          {orderBy == 'release_date'
            ? 'Latest Movies'
            : orderBy == 'rating'
            ? 'Popular Movies'
            : 'You May Also Like'}
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
