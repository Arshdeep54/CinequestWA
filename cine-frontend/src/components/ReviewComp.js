import { ThumbsDown, ThumbsUp } from 'lucide-react';
import React, { useState } from 'react';
import '../cssFiles/Review.css';
// import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbUp from '@mui/icons-material/ThumbUp';
const ReviewComp = ({ review }) => {
  const likedReviewsId = localStorage.getItem('liked_reviews');

  const [liked, setLiked] = useState();
  const [disliked, setDisLiked] = useState();
  const convertDateString = (date) => {
    const currDate = new Date();
    console.log(currDate.getUTCFullYear());
    console.log(currDate.getDay());
    const dateobj = new Date(date);
    const year = dateobj.getFullYear();
    console.log(year);
    const day = dateobj.getDay();
    console.log(day);
  };
  // convertDateString('2023-12-24');

  return (
    <>
      <div className='ReviewCont'>
        <div className='reviewLeft'>
          <img
            src={
              'http://arshdeep54.pythonanywhere.com/media/profile_images/defaultprofile.png'
            }
            alt='userProfilePic'
          />
        </div>
        <div className='reviewRight'>
          <div className='row-1'>
            <div className='usernameText'>@{review.user}</div>
            <div className='reviewmade'>{review.made_at}</div>
          </div>
          <div className='row-2'>
            <div className='r_oneliner'>{review.oneliner}</div>
            <div className='r_descText'>{review.description}</div>
          </div>
          {/* <div className='reviewIcons'>
            <div className='ldBtn'>
              {liked ? <ThumbUpOutlinedIcon /> : <ThumbUpIcon />}
            </div>
            <div>{review.likes}</div>
            <div className='ldBtn'>
              <ThumbsDown />
            </div>
            <div>{review.dislikes}</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ReviewComp;
