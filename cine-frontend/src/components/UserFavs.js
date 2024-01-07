import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import '../cssFiles/HomePage.css';
import { Link } from 'react-router-dom';
const UserFavs = () => {
  const [favMovies, setFavMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [rendered, setRendered] = useState(false);
  const getFavs = async () => {
    const token = localStorage.getItem('access');
    const config = {
      headers: {
        'Content-Type': 'aplication/json',
        Authorization: `JWT ${token}`,
      },
    };
    const url = `${process.env.REACT_APP_API_URL}moviesapi/user-favourite-movies/`;
    const fav_movies = await axios.get(url, config);
    if (fav_movies.status == 200) {
      setFavMovies([...fav_movies.data]);
      console.log(fav_movies.data);
    }
  };
  const getMovies = async () => {
    const url = `${process.env.REACT_APP_API_URL}moviesapi/movies/`;
    const response = await axios.get(url);
    // console.log(response.data);
    setMovies([...response.data]);
  };
  useEffect(() => {
    getFavs();
    getMovies();
    setRendered(true);
  }, []);
  return (
    <>
      <div className='userFavMovies' id='favourites'>
        <div className='textPersonalInfo'>Your Favourite Movies</div>
        <div className='moviesContainer movie-grid-fav'>
          {rendered ? (
            favMovies.length > 0 ? (
              favMovies.map((fav_movie) => {
                const movie_id = fav_movie['movie'];
                const movie = movies.find((movie) => movie['id'] === movie_id);
                console.log(movies, movie);
                if (movie) {
                  return (
                    <>
                      <div className='movie-card-fav'>
                        <Link
                          to={`/movies/${movie['id']}`}
                          className='movie-link'
                        >
                          <img
                            src={movie.poster_link}
                            alt={movie.title}
                            className='movie-image'
                          />
                        </Link>
                      </div>
                    </>
                  );
                } else {
                  return <div>No movie Found</div>;
                }
              })
            ) : (
              <div>No Favourite Movie</div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserFavs;
