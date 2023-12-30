import React, { useEffect, useState } from 'react';
import '../cssFiles/UserProfile.css';
import axios from 'axios';
import { EditIcon, Trash2, X } from 'lucide-react';
function UserReviews() {
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
  const getUserReviews = async () => {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };
    const url = `${process.env.REACT_APP_API_URL}moviesapi/user-reviews/`;
    const response = await axios.get(url, config);
    // console.log(response.data[0]);

    const reviews = [...response.data];
    setUserReviews(reviews);
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

  const handleModalClose = (error) => {
    // Close the modal
    setReviewModal(false);
    getUserReviews();
    error && alert(error);
  };
  const saveReview = async (review, descModel) => {
    console.log(review);
    console.log(descModel);

    const body = {
      description: descModel,
    };
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };
    const url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${review.movie}/reviews/${review.id}/`;
    const response = await axios.put(url, body, config);
    if (response.status === 200) {
      handleModalClose();
    } else {
      handleModalClose('error updating the review');
    }
  };
  const ReviewModal = ({ isOpen, onClose, review }) => {
    const [descModel, setDescModel] = useState(review.description);
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
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '680px',
            backgroundColor: '#fff',
            padding: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            zIndex: 1000,
          }}
        >
          {/* Modal content */}
          <div>
            <X onClick={onClose} />
          </div>
          <div>
            <div>Edit Your Review </div>
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
              <div className='movieNameM'>
                {movie ? movie.title : 'Movie Title'}
              </div>
            </div>
            <div className='rightsecM'>
              <div className='rightTopM'>
                <div className='rightTopLeftM'>
                  <div className=' textHead'>One Liner </div>
                </div>
              </div>
              {/* <div className='rightBottom'>{descModel}</div> */}
              <input
                type='text'
                value={descModel}
                onChange={(e) => {
                  setDescModel(e.target.value);
                }}
              />
            </div>
            <button onClick={() => saveReview(review, descModel)}>
              Confirm{' '}
            </button>
          </div>
        </div>
      </>
    );
  };
  // const RenderReviews = userReviews.map((element) => {
  //   // const movie = {
  //   //   id: 0,
  //   //   poster_link: ' ',
  //   //   title: ' ',
  //   // };
  //   const movie_id = element.movie;
  //   // getMovieById(movie_id).then((res) => {
  //   //   movie.title = res[0];
  //   //   movie.poster_link = res[1];
  //   // });
  //   // movie.id = movie_id;
  //   // console.log(movie);
  //   const movie = movies.filter((movie) => {
  //     return movie.id == movie_id;
  //   });

  //   return (
  //     <>
  //       <div className='userreview'>
  //         <div className='leftsec'>
  //           <div className='reviewImg'>
  //             <img
  //               src={
  //                 // movie[0].poster_link == null
  //                 //   ? 'https://reactjs.org/logo-og.png'
  //                 //   :
  //                 movie[0].poster_link
  //               }
  //             />
  //           </div>
  //           <div className='movieName'>{movie[0].title}</div>
  //         </div>
  //         <div className='rightsec'>
  //           <div className='rightTop'>
  //             <div className='rightTopLeft'>
  //               <div className=' textHead'>One Liner </div>
  //               <div className='dateReview'>{element.made_at}</div>
  //             </div>

  //             <div className='rightIcons'>
  //               <EditIcon onClick={editReview} />
  //               <Trash2 />
  //             </div>
  //           </div>
  //           <div className='rightBottom'>{element.description}</div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // });

  return (
    <>
      <div className='userReviews' id='reviews'>
        <div className='textPersonalInfo'>Your Reviews</div>
        {/* <div className='reviewContainer'>{rendered ? RenderReviews : ' '}</div> */}
        <div className='reviewContainer'>
          {rendered ? (
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
                      <div className='movieName'>
                        {movie ? movie.title : 'Movie Title'}
                      </div>
                    </div>
                    <div className='rightsec'>
                      <div className='rightTop'>
                        <div className='rightTopLeft'>
                          <div className=' textHead'>One Liner </div>
                          <div className='dateReview'>
                            {review.made_at.substring(0, 10)}
                          </div>
                        </div>

                        <div className='rightIcons'>
                          <EditIcon onClick={() => editReview(review)} />
                          <Trash2 />
                        </div>
                      </div>
                      <div className='rightBottom'>{review.description}</div>
                    </div>
                  </div>
                </>
              );
            })
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
