import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Bookmark, Info, PlayCircle, Star } from 'lucide-react';
import IMDBlogo from '../assets/imdblogo.png';
// import YoutubeLogo from '../assets/youtubelogo.png';
import { TailSpin } from 'react-loader-spinner';
import '../cssFiles/MoviePage.css';
import ReviewComp from './ReviewComp';
import LatestMovies from './LatestMovies';
const MoviePage = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: '',
    trailer_link: '',
    description: '',
    storyline: '',
    poster_link: '',
    duration: '',
    language: '',
    rating: '',
    platform: '',
    platform_link: '',
    genre: '',
    release_date: '',
    director: '',
    writers: '',
    starcast: '',
    production: '',
  });
  const [rendering, setRendering] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsUser, setReviewsUser] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [review, setReview] = useState({
    oneliner: '',
    description: '',
  });
  const [isHovered, setHovered] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [addToFav, setAddToFav] = useState(false);
  const [fav_id, setFav_id] = useState(null);
  // const [likedReviews, setlikedReviews] = useState([]);
  // const [dislikedReviews, setdislikedReviews] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [textareaHeight, setTextareaHeight] = useState(117);
  const minTextareaHeight = 18 * 1.5;
  // const minTextareaHeight = ;
  const textareaRef = useRef(null);
  const getMovieAndReviews = async () => {
    console.log(uid);
    const movie_url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${uid}`;
    const response = await axios.get(movie_url);
    const movie_data = response.data;
    setMovie({ ...movie_data });
    setGenreList([...response.data.genre.split(',')]);
    getReviews();
    if (localStorage.getItem('access')) {
      const token = localStorage.getItem('access');
      const config = {
        headers: {
          'Content-Type': 'aplication/json',
          Authorization: `JWT ${token}`,
        },
      };
      setAddToFav(true);
      const url = `${process.env.REACT_APP_API_URL}moviesapi/user-favourite-movies/`;
      await axios
        .get(url, config)
        .then((fav_movies) => {
          console.log(fav_movies.data);
          const isFavourite = fav_movies.data.some(
            (movie) => parseInt(movie.movie) === parseInt(uid)
          );
          const fav_movie = fav_movies.data.find(
            (movie) => parseInt(movie.movie) === parseInt(uid)
          );
          console.log(fav_movie);
          if (fav_movie) {
            setFav_id(fav_movie.id);
          }
          console.log(isFavourite);
          setFavourite(isFavourite);
          setAddToFav(false);
        })
        .catch((error) => {
          if (error.status == 401) {
            console.log('Token expired or invalid. Please log in again.');
            localStorage.removeItem('access');
            alert('Please login again');
            navigate('/auth/login');
          }
        });
    }
  };
  const getReviews = async () => {
    const review_url_user = `${process.env.REACT_APP_API_URL}moviesapi/movies/${uid}/reviews/`;
    const reviews_user = await axios.get(review_url_user);
    console.log(reviews_user.data);
    setReviewsUser([...reviews_user.data]);
    const review_url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${uid}/webreviews/`;
    const reviews_res = await axios.get(review_url);
    console.log(reviews_res.status);
    if (reviews_res.status === 200) {
      setReviews([...reviews_res.data]);
    }
  };
  // const getLiked = async () => {
  //   if (localStorage.getItem('access')) {
  //     const token = localStorage.getItem('access');
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `JWT ${token}`,
  //       },
  //     };

  //     const url = `${process.env.REACT_APP_API_URL}moviesapi/liked-reviews/`;
  //     await axios
  //       .get(url, config)
  //       .then((res) => {
  //         console.log(res.data);
  //         setlikedReviews([...res.data]);
  //       })
  //       .catch((e) => console.log(e));
  //   }
  // };
  // const getDisLiked = async () => {
  //   if (localStorage.getItem('access')) {
  //     const token = localStorage.getItem('access');
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `JWT ${token}`,
  //       },
  //     };
  //     const url_d = `${process.env.REACT_APP_API_URL}moviesapi/disliked-reviews/`;
  //     await axios
  //       .get(url_d, config)
  //       .then((res) => {
  //         console.log(res.data);
  //         setdislikedReviews([...res.data]);
  //       })
  //       .catch((e) => console.log(e));
  //   }
  // };
  const saveReview = async () => {
    const token = localStorage.getItem('access');
    if (token) {
      if (review.oneliner.length > 0 && review.description.length > 0) {
        const url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${uid}/reviews/`;
        const review_body = {
          oneliner: review.oneliner,
          description: review.description,
          userProfile: profilePic,
        };
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
        };
        await axios
          .post(url, review_body, config)
          .then((res) => {
            console.log(res);
            getReviews();
            review.oneliner = '';
            review.description = '';
          })
          .catch((error) => {
            if (error.status == 401) {
              console.log('Token expired or invalid. Please log in again.');
              localStorage.removeItem('access');
              alert('Please login again');
              navigate('/auth/login');
            }
          });
      } else {
        alert('empty string');
      }
    } else {
      navigate('/auth/login');
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
  const getProfilePic = async () => {
    const token = localStorage.getItem('access');
    if (token) {
      const config = {
        headers: {
          Authorization: `JWT ${token}`,
        },
      };
      const url = `${process.env.REACT_APP_API_URL}auth/user/me/`;
      await axios
        .get(url, config)
        .then((response) => {
          console.log(response.data.profile_picture);
          setProfilePic(response.data.profile_picture);
        })
        .catch((error) => {
          if (error.status == 401) {
            console.log('Token expired or invalid. Please log in again.');
            localStorage.removeItem('access');
            alert('Please login again');
            navigate('/auth/login');
          }
        });
    }
  };
  const handleTextareaChange = () => {
    const currentHeight = textareaRef.current.clientHeight;
    const scrollHeight = textareaRef.current.scrollHeight;
    if (scrollHeight > currentHeight) {
      textareaRef.current.style.height = `${currentHeight + 20}px`; // Adjust the value as needed
    }
  };
  useEffect(() => {
    const yOffset = document.getElementById('moviecontainer').offsetTop;
    window.scrollTo(0, yOffset);
    getMovieAndReviews();
    // getLiked();
    // getDisLiked();
    getProfilePic();
    setRendering(true);
  }, [uid]);
  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  const handleFavourite = async () => {
    setAddToFav(true);
    if (localStorage.getItem('access')) {
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
            if (res.status === 204) {
              console.log('deleted');
              setFavourite(false);
              setFav_id(null);
              setAddToFav(false);
            } else {
              console.log('something went wrong');
            }
          })
          .catch((error) => {
            console.error(error);
            if (error.status == 401) {
              console.log('Token expired or invalid. Please log in again.');
              localStorage.removeItem('access');
              alert('Please login again');
              navigate('/auth/login');
            }
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
            if (res.status === 201) {
              console.log(res.data);
              setFav_id(res.data.id);
              console.log('doneee');
              setFavourite(true);
              setAddToFav(false);
            }
          })
          .catch((error) => {
            console.error(error);
            if (error.status == 401) {
              console.log('Token expired or invalid. Please log in again.');
              localStorage.removeItem('access');
              alert('Please login again');
              navigate('/auth/login');
            }
          });
      }
    } else {
      navigate('/auth/login');
    }
    setAddToFav(false);
  };

  return (
    <>
      <Navbar />
      <div className='MovieContainer' id='moviecontainer'>
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
                  <img
                    src={IMDBlogo}
                    width={'100%'}
                    height={'100%'}
                    alt='imdblogo'
                  />
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
              <img src={movie.poster_link} alt='poster_link' />
            </div>
            <div
              className='addtofav-cont flex-cont'
              style={{
                backgroundColor: favourite ? 'black' : 'white',
                color: favourite ? 'white' : 'black',
              }}
              onClick={addToFav ? null : handleFavourite}
            >
              {addToFav ? (
                <TailSpin
                  visible={true}
                  height='25'
                  width='25'
                  color='#4fa94d'
                  ariaLabel='tail-spin-loading'
                  radius='1'
                  wrapperStyle={{}}
                  wrapperClass=''
                />
              ) : (
                <>
                  <div className='addtofav-text'>
                    {favourite ? 'Added' : 'Add'} to Favourites
                  </div>
                  <div className='bookmark-logo'>
                    <Bookmark />
                  </div>
                </>
              )}
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
              <div className='durationCont flex-cont'>
                <div className='labelText'>Duration</div>
                <div className='releasedOnText'>{movie.duration}</div>
              </div>
            </div>
            <div className='cont-b '>
              <div className='descHead'>Description</div>
              <div className='descText'>{movie.description}</div>
            </div>
            <div className='cont-c flex-cont'>
              {genreList.slice(0, genreList.length - 1).map((genre) => {
                return <div className='genreitem'>{genre}</div>;
              })}
            </div>
            <div className='cont-d listcont'>Language: {movie.language}</div>
            <div className='cont-e listcont'>Director: {movie.director}</div>
            <div className='cont-f listcont'>Starcast: {movie.starcast}</div>
            <div className='cont-g listcont'>Writer: {movie.writers}</div>
            <div className='cont-h'>
              <div className='watchCont'>
                <div className='labelText'>Watch Now</div>
                <div className='platText'>
                  {movie.platform_link.length > 0 ? (
                    <a href={movie.platform_link}>
                      {movie.platform === 'Theaters'
                        ? 'Official Site'
                        : movie.platform}
                    </a>
                  ) : (
                    <div>{movie.platform}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='StorylineCont'>
          <div className='storylinehead'>Storyline</div>
          <div className='storyText'>{movie.storyline}</div>
        </div>
        <div className='RecMovies'>
          <LatestMovies orderBy={'recommended'} />
        </div>
        <div className='reviewCont'>
          <div className='cont-aa flex-cont'>
            <div className='reviewCount'>
              {reviews.length + reviewsUser.length} Reviews
            </div>
            {/* <div>Sort Dropdown here </div> */}
          </div>
          <div className='adduserrev flex-cont'>
            <div className='userProfile'>
              <img
                src={
                  profilePic != null
                    ? profilePic
                    : `${process.env.REACT_APP_API_URL}media/profile_images/defaultprofile.png`
                }
                width={'100% '}
                height={'100%'}
              />
            </div>
            <div className='inputRevCont'>
              <input
                className='revInput'
                placeholder='Review in one line'
                value={review.oneliner}
                onChange={(e) => {
                  setReview({ ...review, oneliner: e.target.value });
                }}
              />
              <textarea
                value={review.description}
                placeholder='You can describe your review here '
                onChange={(e) => {
                  setReview({ ...review, description: e.target.value });
                  handleTextareaChange();
                }}
                onPaste={() => {
                  setTimeout(() => {
                    handleTextareaChange();
                  }, 0);
                }}
                ref={textareaRef}
                style={{
                  minHeight: `${minTextareaHeight}px`,
                  // lineHeight: `27px`,
                  height: 'fit-content',
                }}
                className='descText'
              />
              <div className='btnCont'>
                <div className='flex-cont'>
                  <button
                    onClick={() => {
                      setReview({
                        oneliner: '',
                        description: '',
                      });
                      textareaRef.current.style.height = `${minTextareaHeight}px`;
                    }}
                  >
                    Reset
                  </button>
                  <button onClick={saveReview}>Add</button>
                </div>
              </div>
            </div>
          </div>
          <div className='showRevs'>
            {reviewsUser.map((review) => {
              // const liked = likedReviews.some(
              //   (lreview) => lreview.id == review.id
              // );
              // const disliked = dislikedReviews.some(
              //   (dreview) => dreview.id == review.id
              // );

              return (
                <ReviewComp
                  review={review}
                  from={'authUsers'}
                  // isliked={liked}
                  // isdisliked={disliked}
                  // profilepic={profilePic}
                />
              );
            })}
            {reviews.map((review) => {
              // const liked = likedReviews.some(
              //   (lreview) => lreview.id == review.id
              // );
              // const disliked = dislikedReviews.some(
              //   (dreview) => dreview.id == review.id
              // );
              return (
                <ReviewComp
                  review={review}
                  from={'webUsers'}
                  // isliked={liked}
                  // isdisliked={disliked}
                  // profilepic={profilePic}
                />
              );
            })}
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
