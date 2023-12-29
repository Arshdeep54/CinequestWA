import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Bookmark, Info, PlayCircle, Star, Youtube } from 'lucide-react';
import IMDBlogo from '../assets/imdblogo.png';
import YoutubeLogo from '../assets/youtubelogo.png';
import '../cssFiles/MoviePage.css';
const MoviePage = () => {
  const { uid } = useParams();
  const [movie, setMovie] = useState({
    title: '',
    trailer_link: '',
    description: '',
    poster_link: '',
    duration: '',
    language: '',
    rating: '',
    platform: '',
    genre: '',
    release_date: '',
    director: '',
    writers: '',
    starcast: '',
    production: '',
  });
  const [reviews, setReviews] = useState([]);
  const [isHovered, setHovered] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [fav_id, setFav_id] = useState(null);
  const getMovieAndReviews = async () => {
    console.log(uid);
    const movie_url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${uid}`;
    const response = await axios.get(movie_url);
    const movie_data = response.data;
    setMovie({ ...movie_data });
    const review_url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${uid}/webreviews/`;
    const reviews_res = await axios.get(review_url);
    console.log(reviews_res.status);
    if (reviews_res.status == 200) {
      setReviews([...reviews_res.data]);
    }
    if (localStorage.getItem('access').length > 0) {
      const token = localStorage.getItem('access');
      const config = {
        headers: {
          'Content-Type': 'aplication/json',
          Authorization: `JWT ${token}`,
        },
      };
      const url = `${process.env.REACT_APP_API_URL}moviesapi/user-favourite-movies/`;
      const fav_movies = await axios.get(url, config);
      console.log(fav_movies.data);
      const isFavourite = fav_movies.data.some((movie) => movie.movie == uid);
      const fav_movie = fav_movies.data.find((movie) => movie.movie == uid);
      console.log(fav_movie);
      if (fav_movie) {
        setFav_id(fav_movie.id);
      }
      console.log(isFavourite);
      setFavourite(isFavourite);
    }
  };
  const convertDate = (input_date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(input_date);
    const converted_date = date.toLocaleDateString('en-US', options);
    return converted_date;
  };
  const getYear = (date) => {
    return date.toString().substring(0, 4);
  };
  useEffect(() => {
    getMovieAndReviews();
  }, []);

  const handleFavourite = async () => {
    if (localStorage.getItem('access').length > 0) {
      const token = localStorage.getItem('access');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      };
      if (favourite) {
        const url = `${process.env.REACT_APP_API_URL}moviesapi/favourite-movies/${fav_id}/`;
        await axios
          .delete(url, config)
          .then((res) => {
            if (res.status == 204) {
              console.log('deleted');
              setFavourite(false);
            } else {
              console.log('something went wrong');
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        const body = {
          movie: uid,
        };
        const url = `${process.env.REACT_APP_API_URL}moviesapi/user-favourite-movies/`;
        await axios
          .post(url, body, config)
          .then((res) => {
            console.log(res.status);
            if (res.status == 201) {
              console.log('doneee');
              setFavourite(true);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className='MovieContainer'>
        <div className='topCont flex-cont'>
          <div className='topCont-left'>
            <div className='top-left-top flex-cont'>
              <div className='titleCont'>{movie.title}</div>
              <div
                className='watch-i-btn'
                onMouseEnter={() => {
                  setHovered(true);
                }}
                onMouseLeave={() => {
                  setHovered(false);
                }}
                style={{ position: 'relative', display: 'inline-block' }}
              >
                <a href={movie.trailer_link}>
                  {/* <img src={YoutubeLogo} width={'100%'} /> */}
                  <span title='Watch Trailer'>
                    <PlayCircle color='black' />
                  </span>
                </a>
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#333',
                      color: '#fff',
                      width: '100px',
                      padding: '5px',
                      borderRadius: '3px',
                      zIndex: '1000',
                    }}
                  >
                    Watch Trailer
                  </div>
                )}
              </div>
            </div>
            <div className='top-left-bottom'>{getYear(movie.release_date)}</div>
          </div>
          <div className='topCont-right'>
            <div className='ratingCont'>
              <div className='labelText'>Rating</div>
              <div className='ratingNumber'>
                <span className='star-cont'>
                  <Star color='#c77f02' width={22} height={22} />
                </span>
                <span>{movie.rating}/10</span>
              </div>
              <div className='imdb-logo'>
                <span>
                  <img src={IMDBlogo} width={'100%'} height={'100%'} />
                </span>
                <a href='https://www.imdb.com' title='Rate on Official Website'>
                  <Info color='black' />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='middleCont flex-cont'>
          <div className='middleCont-left flex-cont'>
            <div className='imageCont'>
              <img src={movie.poster_link} />
            </div>
            <div
              className='addtofav-cont flex-cont'
              style={{
                backgroundColor: favourite ? 'black' : 'white',
                color: favourite ? 'white' : 'black',
              }}
              onClick={handleFavourite}
            >
              <div className='addtofav-text'>
                {favourite ? 'Added' : 'Add'} to Favourites
              </div>
              <div className='bookmark-logo'>
                <Bookmark />
              </div>
            </div>
          </div>
          <div className='middleCont-right'>
            <div className='cont-a flex-cont'>
              <div className='releasedCont flex-cont'>
                <div className='labelText'>Released On</div>
                <div className='releasedOnText'>
                  {convertDate(movie.release_date)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <img src={movie.poster_link}></img>
        <div>Title: {movie.title}</div>
        {Object.entries(movie).map(([key, value]) => {
          return (
            <div>
              {key}:{value}
            </div>
          );
        })}
        {reviews.map((review) => {
          return (
            <>
              <div>{review.oneliner}</div>
              <div>{review.description}</div>
              <div>{review.user}</div>
              <br></br>
            </>
          );
        })}
      </div> */}
    </>
  );
};

export default MoviePage;
