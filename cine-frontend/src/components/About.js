import React from 'react';
import Navbar from './Navbar';

function About() {
  return (
    <>
      <Navbar />
      <div
        className='AboutCont'
        style={{
          padding: '23px',
          backgroundColor: '#eee',
        }}
      >
        <h2>About Us</h2>
        <p>
          Welcome to our movie website :CineQuest! We love movies and want your
          reviews about them .We have made this website to aloow you to log in
          and make reviews and also make a list of favourite movies
        </p>

        <h3>Developer Side Features</h3>
        <ul>
          <h4>User Authentication</h4>
          <li>Email and password athentication</li>
          <li>Email verification with otp</li>
          <li>Change password functionality to loggin users</li>
          <li>
            Reset password with a link sent to email for those who forgot their
            passwords
          </li>
        </ul>
        <ul>
          <h4>Home Page</h4>
          <li>
            Search Bar to Search with name and description set to movie CTRL+M
            shortcut to search
          </li>
          <li>Filters based on language,Rating ,Release Year ,Platform</li>
          <li>Latest and Popular movies horizontal list with pagination</li>
          <li>All Movies grid with pagination</li>
          <li>Movie card having click to view details functionality</li>
        </ul>
        <ul>
          <h4>Profile Page</h4>
          <li>
            User Infomation(profile picture,first name,last
            name,gender,Dob,Mobile,About Movie life) which can be updated
          </li>
          <li>All reviews made by the user</li>
          <li>User's Favorite Movies</li>
          <li>Account Settings: Log out, Change password</li>
        </ul>
        <ul>
          <h4>Movie Page</h4>
          <li>All Movie details</li>
          <li>Add to Favorite feature</li>
          <li>Add review</li>
          <li>Like or dislike a Review</li>
          <li>Reply to a review</li>
          <li>Delete Your reply</li>
          <li>Reccomended movies based on users favorite movies</li>
        </ul>
      </div>
    </>
  );
}

export default About;
