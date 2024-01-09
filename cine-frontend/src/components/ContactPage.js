import React from 'react';
import Navbar from './Navbar';
import { Instagram, Linkedin, Mail } from 'lucide-react';

function ContactPage() {
  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '93vh',
          backgroundColor: '#f0f0f0',
          color: '#333',
        }}
      >
        <h2>Contact Us</h2>
        <p>Feel free to reach out to us through the following channels:</p>

        <div
          className='contact-icons'
          style={{
            display: 'flex',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          <a
            href='mailto:cinequestimg@gmail.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Mail size={30} />
          </a>
          <a
            href='https://www.instagram.com/_arsh.bal_/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Instagram size={30} />
          </a>
          <a
            href='https://www.linkedin.com/in/arshdeep-singh-326815292/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Linkedin size={30} />
          </a>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
