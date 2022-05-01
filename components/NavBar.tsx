// src/components/NavBar.js

import React from "react";

import {Navbar, Nav, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

interface NavBarProps {}

const NavBar: React.FunctionComponent<NavBarProps> = () => {



  return (

    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">UN5tack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/upload">Upload</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    </div>
  );
};

export default NavBar;
