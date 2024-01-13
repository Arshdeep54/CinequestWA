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
import { CiMenuKebab } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';
import { MdComment } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Pointer } from 'lucide-react';

const ReviewComp = ({ review, from }) => {
  const navigate = useNavigate();
  const [replyCont, setReplyCont] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisLiked] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [replies, setReplies] = useState([]);
  var base_url;
  if (from === 'authUsers') {
    base_url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${review.movie}/reviews/${review.id}/`;
  } else {
    base_url = `${process.env.REACT_APP_API_URL}moviesapi/movies/${review.movie}/webreviews/${review.id}/`;
  }
  const handleLike = async () => {
    if (localStorage.getItem('access')) {
      //handlelike
      const token = localStorage.getItem('access');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      };
      const data = {};

      if (liked) {
        const url = `${base_url}unlike/`;
        await axios
          .post(url, data, config)
          .then((res) => {
            setLiked(false);
            review.likes -= 1;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const url = `${base_url}like/`;
        await axios
          .post(url, data, config)
          .then((res) => {
            setLiked(true);
            review.likes += 1;
          })
          .catch((error) => {
            console.log(error);
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
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      };
      const data = {};
      if (disliked) {
        const url = `${base_url}undislike/`;
        await axios
          .post(url, data, config)
          .then((res) => {
            setDisLiked(false);
            review.dislikes -= 1;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const url = `${base_url}dislike/`;
        await axios
          .post(url, data, config)
          .then((res) => {
            setDisLiked(true);
            review.dislikes += 1;
          })
          .catch((error) => {
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
  const getLiked = async () => {
    if (localStorage.getItem('access')) {
      const token = localStorage.getItem('access');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      };
      var base_url_get;
      if (from === 'authUsers') {
        base_url_get = `${process.env.REACT_APP_API_URL}moviesapi/liked-reviews`;
      } else {
        base_url_get = `${process.env.REACT_APP_API_URL}moviesapi/liked-reviews-web`;
      }

      await axios
        .get(base_url_get, config)
        .then((res) => {
          const isLiked = res.data.some((lreview) => review.id === lreview.id);
          setLiked(isLiked);
        })
        .catch((e) => console.log(e));
    }
  };
  const getDisLiked = async () => {
    if (localStorage.getItem('access')) {
      const token = localStorage.getItem('access');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      };
      var base_url_get;
      if (from === 'authUsers') {
        base_url_get = `${process.env.REACT_APP_API_URL}moviesapi/disliked-reviews`;
      } else {
        base_url_get = `${process.env.REACT_APP_API_URL}moviesapi/disliked-reviews-web`;
      }
      await axios
        .get(base_url_get, config)
        .then((res) => {
          const isDisLiked = res.data.some(
            (dreview) => review.id === dreview.id
          );
          setDisLiked(isDisLiked);
        })
        .catch((e) => console.log(e));
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
      setProfilePic(response.data.profile_picture);
    }
  };
  const getReplies = async () => {
    const url = `${base_url}replies/`;
    await axios
      .get(url)
      .then((res) => {
        setReplies([...res.data].reverse());
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const addReply = async () => {
    if (localStorage.getItem('access')) {
      const token = localStorage.getItem('access');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      };
      const body = {
        content: replyContent,
        userProfile: profilePic,
      };
      const url = `${base_url}replies/`;
      await axios.post(url, body, config).then((res) => {
        setReplyContent('');
        getReplies();
      });
    } else {
      navigate('/auth/login');
    }
  };
  const deleteReply = async (reply) => {
    if (localStorage.getItem('access')) {
      const token = localStorage.getItem('access');

      const config = {
        headers: {
          Authorization: `JWT ${token}`,
        },
      };
      const url = `${base_url}replies/${reply.id}`;
      await axios.delete(url, config).then((res) => {
        getReplies();
      });
    }
  };
  useEffect(() => {
    getLiked();
    getDisLiked();
    getReplies();
    getProfilePic();
  }, []);
  useEffect(() => {
    // if(replyCont){
    // }
  }, [replyCont]);
  const ReplyComp = ({ reply }) => {
    const [iconOn, setIconOn] = useState(false);
    const [canDelete, SetCanDelete] = useState(false);
    const canDeleteF = async () => {
      if (localStorage.getItem('access')) {
        const token = localStorage.getItem('access');

        const config = {
          headers: {
            Authorization: `JWT ${token}`,
          },
        };
        const url = `${process.env.REACT_APP_API_URL}moviesapi/user-replies/`;

        await axios
          .get(url, config)
          .then((res) => {
            const candelete = res.data.some(
              (replyres) => replyres.id === reply.id
            );
            SetCanDelete(candelete);
          })
          .catch((e) => console.log(e));
      } else {
        return false;
      }
    };
    useEffect(() => {
      canDeleteF();
    }, []);

    return (
      <>
        <div className='ReplyContainer'>
          <div className='replyMain'>
            <div className='replyLeft'>
              <img
                src={
                  reply.userProfile.length > 10
                    ? reply.userProfile
                    : `${process.env.REACT_APP_API_URL}media/profile_images/${reply.userProfile}`
                }
                alt='userProfilePic'
              />
            </div>
            <div className='replyRight'>
              <div className='row-1'>
                <div className='usernameText'>@{reply.user}</div>
                <div className='reviewmade'>
                  {reply.created_at.slice(0, 10)}
                </div>
              </div>
              <div className='row-2'>
                <div className='r_descText'>{reply.content}</div>
              </div>
            </div>
          </div>
          {canDelete && (
            <div className='menuicon'>
              {iconOn ? (
                <IoMdClose
                  onClick={() => {
                    setIconOn(!iconOn);
                  }}
                />
              ) : (
                <CiMenuKebab
                  onClick={() => {
                    setIconOn(!iconOn);
                  }}
                />
              )}
              {iconOn && (
                <div
                  className='deleteB'
                  style={{
                    position: 'absolute',
                    top: '44%',
                    left: '57%',
                    transform: ' translateX(-100%)',
                    backgroundColor: 'rgb(157 155 155)',
                    color: 'rgb(255, 255, 255)',
                    width: '100px',
                    padding: ' 5px',
                    borderRadius: '3px',
                    zIndex: 1000,
                    cursor: 'pointer',
                  }}
                  onClick={() => deleteReply(reply)}
                >
                  Delete
                </div>
              )}
            </div>
          )}
        </div>
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
              {liked ? (
                <AiFillLike size={'23px'} />
              ) : (
                <AiOutlineLike size={'23px'} />
              )}
            </div>
            <div>{review.likes}</div>
            <div className='ldBtn' onClick={handleDislike}>
              {disliked ? (
                <AiFillDislike size={'23px'} />
              ) : (
                <AiOutlineDislike size={'23px'} />
              )}
            </div>
            <div>{review.dislikes}</div>
            <div
              className='ldBtn'
              onClick={handleReply}
              style={{ position: 'relative' }}
            >
              <MdComment size={'23px'} />
              {replies.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '50%',
                    left: ' 60%',
                    width: '20px',
                    height: '20px',
                    textAlign: 'center',
                    border: '1px solid',
                    borderRadius: '50%',
                    backgroundColor: '#060606',
                    color: 'white',
                    zIndex: 2,
                  }}
                >
                  {replies.length}
                </span>
              )}
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
                    <button className='pReplyBtn' onClick={addReply}>
                      Post
                    </button>
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
