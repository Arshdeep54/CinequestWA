import React, { useEffect, useState } from 'react';
import '../cssFiles/UserProfile.css';
import axios from 'axios';
import { EditIcon, SendToBack, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function UserReviews() {
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState([]);
  const [movies, setMovies] = useState([]);
  const [rendered, setRendered] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [review, setReview] = useState({
    description: ' ',
    id: 0,
    made_at: ' ',
    movie: 0,
    user: ' ',
  });
  const token = localStorage.getItem('access');

  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  };
  const getUserReviews = async () => {
    const url = `${process.env.REACT_APP_API_URL}moviesapi/user-reviews/`;
    await axios
      .get(url, config)
      .then((response) => {
        const reviews = [...response.data];
        setUserReviews(reviews);
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
    // console.log(response.data[0]);
  };
  const getMovies = async () => {
    const url = `${process.env.REACT_APP_API_URL}moviesapi/movies/`;
    const response = await axios.get(url);
    // console.log(response.data);
    setMovies([...response.data]);
  };

  useEffect(() => {
    getUserReviews();
    getMovies();
    setRendered(true);
  }, []);
  const editReview = (review) => {
    setReviewModal(true);
    // console.log(review);
    setReview({ ...review });
  };
  const handleDelete = async (review) => {
    const url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${review.movie}/reviews/${review.id}/`;
    await axios
      .delete(url, config)
      .then((res) => {
        console.log(res.data, res.status);
        if (res.status === 204) {
          getUserReviews();
          alert('review deleted');
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
  };
  const sendTo = (movie_id) => {
    navigate(`/movies/${movie_id}`);
  };
  const handleModalClose = (error) => {
    // Close the modal
    setReviewModal(false);
    getUserReviews();
    error && alert(error);
  };
  const saveReview = async (review, descModel, oneliner) => {
    console.log(review);
    console.log(descModel);

    const body = {
      description: descModel,
      oneliner: oneliner,
    };
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };
    const url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${review.movie}/reviews/${review.id}/`;
    await axios
      .put(url, body, config)
      .then((response) => {
        if (response.status === 200) {
          handleModalClose();
        } else {
          handleModalClose('error updating the review');
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
  };
  const ReviewModal = ({ isOpen, onClose, review }) => {
    const [descModel, setDescModel] = useState(review.description);
    const [oneliner, setOneLiner] = useState(review.oneliner);
    // console.log(descModel);
    const movie_id = review.movie;
    // console.log(movie_id);
    const movie = movies.find((movie) => movie.id === movie_id);
    // console.log(movie);
    return (
      <>
        <div
          style={{
            display: isOpen ? 'block' : 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        ></div>
        <div
          style={{
            display: isOpen ? 'block' : 'none',
            position: 'fixed',
            top: '50%',
            // left: window.matchMedia('(max-width:767px)').matches
            //   ? '50%'
            //   : '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: window.matchMedia('(max-width:767px)').matches
              ? '51%'
              : '687px',
            backgroundColor: '#fff',
            padding: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            zIndex: 1000,
          }}
        >
          {/* Modal content */}
          <div className='crossBtn'>
            <X onClick={onClose} />
          </div>
          <div className='MainModalC'>
            <div className='modelhead'>Edit Your Review </div>
            <div className='cont-x'>
              <div className='leftsecM'>
                <div className='reviewImgM'>
                  <img
                    src={
                      movie
                        ? movie.poster_link
                        : 'https://reactjs.org/logo-og.png'
                    }
                  />
                </div>
                <div
                  className='movieNameM cursorP'
                  onClick={() => sendTo(movie.id)}
                >
                  {movie ? movie.title : 'Movie Title'}
                </div>
              </div>
              <div className='rightsecM'>
                <div className='rightTopM'>
                  <div className='rightTopLeftM'>
                    <div className=' textHead'>
                      <input
                        value={oneliner}
                        onChange={(e) => {
                          setOneLiner(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className='rightBottom'>{descModel}</div> */}
                <textarea
                  type='text'
                  value={descModel}
                  onChange={(e) => {
                    setDescModel(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className='btnCont'>
              <button onClick={() => saveReview(review, descModel, oneliner)}>
                Confirm{' '}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className='userReviews' id='reviews'>
        <div className='textPersonalInfo'>Your Reviews</div>
        {/* <div className='reviewContainer'>{rendered ? RenderReviews : ' '}</div> */}
        <div className='reviewContainer'>
          {rendered ? (
            userReviews.length > 0 ? (
              userReviews.map((review) => {
                const movie_id = review.movie;
                const movie = movies.find((movie) => movie.id === movie_id);

                return (
                  <>
                    <div className='userreview'>
                      <div className='leftsec'>
                        <div className='reviewImg'>
                          <img
                            src={
                              movie
                                ? movie.poster_link
                                : 'https://reactjs.org/logo-og.png'
                            }
                            alt={movie ? movie.title : 'Movie Poster'}
                          />
                        </div>
                        <div
                          className='movieName cursorP'
                          onClick={() => sendTo(movie.id)}
                        >
                          {movie ? movie.title : 'Movie Title'}
                        </div>
                      </div>
                      <div className='rightsec'>
                        <div className='rightTop'>
                          <div className='rightTopLeft'>
                            <div className=' textHead'>{review.oneliner}</div>
                            <div className='dateReview'>
                              {review.made_at.substring(0, 10)}
                            </div>
                          </div>

                          <div className='rightIcons'>
                            <EditIcon onClick={() => editReview(review)} />
                            <Trash2 onClick={() => handleDelete(review)} />
                          </div>
                        </div>
                        <div className='rightBottom'>{review.description}</div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className='noText'>No Reviews</div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <ReviewModal
          isOpen={reviewModal}
          onClose={handleModalClose}
          review={review}
        />
      </div>
    </>
  );
}

export default UserReviews;
