import React from "react";
import { Navbar, Nav } from "react-bootstrap";
const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/dashboard">Sortify </Navbar.Brand>
      <Nav className="mr-auto">
      </Nav>
    </Navbar>
    
  );
};
export default Header;
