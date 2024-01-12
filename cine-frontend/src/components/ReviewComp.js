import React, { useEffect, useState } from 'react';
import '../cssFiles/Review.css';
// import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbUp from '@mui/icons-material/ThumbUp';
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReviewComp = ({ review, from }) => {
  const navigate = useNavigate();
  const [replyCont, setReplyCont] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisLiked] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [replies, setReplies] = useState([]);
  const handleLike = async () => {
    if (localStorage.getItem('access')) {
      //handlelike
      const token = localStorage.getItem('access');
      const config = {
        headers: {
          'Content-Type': 'aplication/json',
          Authorization: `JWT ${token}`,
        },
      };
      const data = {};
      if (liked) {
        const url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${review.movie}/reviews/${review.id}/unlike/`;
        await axios
          .post(url, data, config)
          .then((res) => {
            console.log(res);
            setLiked(false);
            review.likes -= 1;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${review.movie}/reviews/${review.id}/like/`;
        await axios
          .post(url, data, config)
          .then((res) => {
            console.log(res);
            setLiked(true);
            review.likes += 1;
          })
          .catch((error) => {
            console.log(error.response.data['oppexists']);
            if (error.response.data['oppexists']) {
              handleDislike();
              handleLike();
            }
          });
      }
    } else {
      navigate('/auth/login');
    }
  };
  const handleDislike = async () => {
    if (localStorage.getItem('access')) {
      //handlelike
      const token = localStorage.getItem('access');
      const config = {
        headers: {
          'Content-Type': 'aplication/json',
          Authorization: `JWT ${token}`,
        },
      };
      const data = {};
      if (disliked) {
        const url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${review.movie}/reviews/${review.id}/undislike/`;
        await axios
          .post(url, data, config)
          .then((res) => {
            console.log(res);
            setDisLiked(false);
            review.dislikes -= 1;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${review.movie}/reviews/${review.id}/dislike/`;
        await axios
          .post(url, data, config)
          .then((res) => {
            console.log(res);
            setDisLiked(true);
            review.dislikes += 1;
          })
          .catch((error) => {
            console.log(error.response.data['oppexists']);
            if (error.response.data['oppexists']) {
              handleLike();
              handleDislike();
            }
          });
      }
    } else {
      navigate('/auth/login');
    }
  };
  const handleReply = async () => {
    setReplyCont(!replyCont);
  };
  const getLikedDisliked = async () => {
    if (localStorage.getItem('access')) {
      const token = localStorage.getItem('access');
      const config = {
        headers: {
          'Content-Type': 'aplication/json',
          Authorization: `JWT ${token}`,
        },
      };
      if (from === 'authUsers') {
        const url = `${process.env.REACT_APP_API_URL}moviesapi/liked-reviews/`;
        await axios
          .get(url, config)
          .then((res) => {
            console.log(res.data);
            const isLiked = res.data.some(
              (lreview) => review.id === lreview.id
            );
            console.log(isLiked);
            setLiked(isLiked);
          })
          .catch((e) => console.log(e));
        const url_d = `${process.env.REACT_APP_API_URL}moviesapi/disliked-reviews/`;
        await axios
          .get(url_d, config)
          .then((res) => {
            console.log(res.data);
            const isDisLiked = res.data.some(
              (dreview) => review.id === dreview.id
            );
            console.log('isDisliked', isDisLiked);
            setDisLiked(isDisLiked);
          })
          .catch((e) => console.log(e));
      }
    }
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
      const response = await axios.get(url, config);
      console.log(response.data.profile_picture);
      setProfilePic(response.data.profile_picture);
    }
  };
  const getReplies=async ()=>{
    console.log("geting Replies....")
  }
  useEffect(() => {
    getLikedDisliked();
    getReplies();
    getProfilePic();
  }, []);
  useEffect(() => {
    console.log(replyCont);
    // if(replyCont){

    // }
  }, [replyCont]);
  const ReplyComp = ({ reply }) => {
    return (
      <>
        <div>{reply.content}</div>
      </>
    );
  };
  return (
    <>
      <div
        className={`ReviewCont ${
          replyCont ? 'ReviewReplyCont' : 'OnlyReviewCont'
        }`}
      >
        <div className='reviewLeft'>
          <img
            src={
              review.userProfile.length > 10
                ? review.userProfile
                : `${process.env.REACT_APP_API_URL}media/profile_images/${review.userProfile}`
            }
            alt='userProfilePic'
          />
        </div>
        <div className='reviewRight'>
          <div className='row-1'>
            <div className='usernameText'>@{review.user}</div>
            <div className='reviewmade'>{review.made_at.slice(0, 10)}</div>
          </div>
          <div className='row-2'>
            <div className='r_oneliner'>{review.oneliner}</div>
            <div className='r_descText'>{review.description}</div>
          </div>
          <div className='reviewIcons'>
            <div className='ldBtn' onClick={handleLike}>
              {liked ? <AiFillLike /> : <AiOutlineLike />}
            </div>
            <div>{review.likes}</div>
            <div className='ldBtn' onClick={handleDislike}>
              {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
            </div>
            <div>{review.dislikes}</div>
            <div className='ldBtn' onClick={handleReply}>
              <FaReply />
            </div>
          </div>
          {replyCont && (
            <>
              <div className='ReplyCont'>
                <div className='addreplyCont'>
                  <div className='userprofileReply'>
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
                  <div className='inputReply'>
                    <input
                      type='text'
                      placeholder='Reply to this Review'
                      value={replyContent}
                      onChange={(e) => {
                        setReplyContent(e.target.value);
                      }}
                    />
                  </div>
                  <div className='preply'>
                    <button className='pReplyBtn'>Post</button>
                  </div>
                </div>
                <div className='showRepliesCont'>
                  {replies.length > 0 &&
                    replies.map((reply) => {
                      return <ReplyComp reply={reply} />;
                    })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewComp;
