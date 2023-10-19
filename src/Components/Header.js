import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Nuraddin</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Kassa</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/kirim">Kirim</Nav.Link>
            <Nav.Link href="/chiqim">Chiqim</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
