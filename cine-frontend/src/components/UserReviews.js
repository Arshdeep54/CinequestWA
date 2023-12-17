import React, { useEffect, useState } from 'react';
import '../cssFiles/UserProfile.css';
import axios from 'axios';
import { Delete, DeleteIcon, EditIcon, Trash2 } from 'lucide-react';
function UserReviews() {
  const [userReviews, setUserReviews] = useState([]);
  const [movies, setMovies] = useState([]);
  const [rendered, setRendered] = useState(false);
  const getUserReviews = async () => {
    const token = localStorage.getItem('access');
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };
    const url = 'http://127.0.0.1:8000/moviesapi/user-reviews/';
    const response = await axios.get(url, config);
    // console.log(response.data[0]);

    const reviews = [...response.data];
    setUserReviews(reviews);
  };
  const getMovies = async () => {
    const url = 'http://127.0.0.1:8000/moviesapi/movies/';
    const response = await axios.get(url);
    // console.log(response.data);
    setMovies([...response.data]);
  };

  useEffect(() => {
    getUserReviews();
    getMovies();
    setRendered(true);
  }, []);

  const RenderReviews = userReviews.map((element) => {
    // const movie = {
    //   id: 0,
    //   poster_link: ' ',
    //   title: ' ',
    // };
    const movie_id = element.movie;
    // getMovieById(movie_id).then((res) => {
    //   movie.title = res[0];
    //   movie.poster_link = res[1];
    // });
    // movie.id = movie_id;
    // console.log(movie);
    const movie = movies.filter((movie) => {
      return movie.id == movie_id;
    });

    return (
      <>
        <div className='userreview'>
          <div className='leftsec'>
            <div className='reviewImg'>
              <img
                src={
                  movie[0].poster_link == null
                    ? 'https://reactjs.org/logo-og.png'
                    : movie[0].poster_link
                }
              />
            </div>
            <div className='movieName'>{movie[0].title}</div>
          </div>
          <div className='rightsec'>
            <div className='rightTop'>
              <div className='rightTopLeft'>{element.made_at}</div>
              <div className='rightIcons'>
                <EditIcon />
                <Trash2 />
              </div>
            </div>
            <div className='rightBottom'>{element.description}</div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className='userReviews' id='reviews'>
        <div className='textPersonalInfo'>Your Reviews</div>
        <div className='reviewContainer'>{rendered ? RenderReviews : ' '}</div>
      </div>
    </>
  );
}

export default UserReviews;
