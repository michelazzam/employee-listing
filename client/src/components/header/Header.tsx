// src/components/Header.tsx
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg" className="navbar">
      <Nav>
        <LinkContainer to="/">
          <Nav.Link className="nav-link">Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/employees">
          <Nav.Link className="nav-link">employees</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default Header;
