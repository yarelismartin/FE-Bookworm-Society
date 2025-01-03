import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { signIn } from '../utils/auth';
import logo from '../../public/images/Book Club Logo.png';

function Signin() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        padding: '30px',
        margin: '0 auto',
        height: '100vh',
        backgroundColor: '#497dcb',
      }}
    >
      <Image src={logo} alt="Book Club Logo" width={500} height={300} priority />
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
