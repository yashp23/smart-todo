import React from "react";
import axios from "axios"; // Import axios
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const NavbarComponents = () => {
  const navigate = useNavigate();

  const clickLogout = () => {
    axios.get('/logout')
    .then((response) => {
        console.log('Logout successful:', response.data);
        navigate('/login');
    })
    .catch((error) => {
        console.error('Logout error:', error);
    });

  };

  return (
    <div>
      <Navbar
        bg="dark"
        expand="lg"
        className="navbar z-10 h-16 custom-navbar fixed-top shadow-lg"
        data-bs-theme="dark"
      >
        <Container>
          {/* Brand Name */}
          <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
            Navbar
          </Navbar.Brand>

          {/* Hamburger Icon */}
          <Navbar.Toggle
            aria-controls="navbar-responsive"
            className="ms-auto mb-2 border-0"
          />

          {/* Collapsible Navbar Section */}
          <Navbar.Collapse
            id="navbar-responsive"
            className="justify-content-between"
          >
            {/* Navigation Links */}
            <Nav className="me-auto text-center">
              <Nav.Link
                as={Link}
                to="/"
                className="text-white me-2 hover-bg-dark p-2 rounded-md"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                className="text-white me-2 hover-bg-dark p-2 rounded-md"
              >
                About
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/addTask"
                className="text-white me-2 hover-bg-dark p-2 rounded-md"
              >
                Add Task
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/showTask"
                className="text-white me-2 hover-bg-dark p-2 rounded-md"
              >
                All Tasks
              </Nav.Link>
            </Nav>

            {/* Mobile Button Group */}
            <div className="button-group d-flex d-lg-none flex-column mt-3">
              <Button variant="success" className="mb-2">
                <Link to="/login" className="text-white text-decoration-none">
                  Login
                </Link>
              </Button>
              <Button variant="success" className="mb-2">
                <Link to="/signup" className="text-white text-decoration-none">
                  Signup
                </Link>
              </Button>
              <Button variant="danger" onClick={clickLogout}>
                Logout
              </Button>
            </div>
          </Navbar.Collapse>

          {/* Desktop Button Group */}
          <div className="button-group d-none d-lg-flex">
            <Button className="me-2">
              <Link to="/login" className="text-white text-decoration-none">
                Login
              </Link>
            </Button>
            <Button variant="success" className="me-2">
              <Link to="/signup" className="text-white text-decoration-none">
                Signup
              </Link>
            </Button>
            <Button variant="danger" onClick={clickLogout}>
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponents;
