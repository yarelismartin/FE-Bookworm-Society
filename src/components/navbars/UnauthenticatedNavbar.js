/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container } from 'react-bootstrap';

export default function UnauthenticatedNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          CHANGE ME
        </Link>
      </Container>
    </Navbar>
  );
}
