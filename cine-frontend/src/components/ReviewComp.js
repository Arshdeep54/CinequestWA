import { ThumbsDown, ThumbsUp } from 'lucide-react';
import React from 'react';

const ReviewComp = ({ review }) => {
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
          <div className='reviewIcons'>
            <div>
              <ThumbsUp />
            </div>
            <div>{review.likes}</div>
            <div>
              <ThumbsDown />
            </div>
            <div>{review.dislikes}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewComp;
