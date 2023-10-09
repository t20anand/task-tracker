import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { clearLocalStorage } from '../utils/localStorageHandler';


function BootNavbar() {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    clearLocalStorage();
    navigate('/login');
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Task Priority and Deadline Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to='/priority' className='btn btn-primary'>Priority</Link>
              &nbsp;&nbsp;
              <Link to='/task' className='btn btn-primary'>Task</Link>
            </Nav>
          </Navbar.Collapse>
          <Button type='button' variant='danger' onClick={handleLogoutClick}>Logout</Button>

        </Container>
      </Navbar>
    </>
  );
}

export default BootNavbar;