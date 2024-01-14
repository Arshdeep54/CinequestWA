import React from 'react';

const Footer = () => {
  return (
    <>
      <footer
        className='footer'
        style={{
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ' #e1e1e1',
        }}
      >
        <p style={{ marginTop: 0, marginBottom: 0 }}>
          &copy; 2023 CineQuest. All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
