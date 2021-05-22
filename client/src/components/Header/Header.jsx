import { useEffect } from "react";
import { useState } from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { logout } from "../../api/services/userService";
import { currentUser } from "../../constants/storageKeys";
import StorageService from "../storageService";

const Header = () => {
    const history = useHistory();
    const [loggedout, setLoggedout] = useState(false);

  const user = StorageService.get(currentUser)

  useEffect(() => {
    if(loggedout) {
        history.push('/login');
    }
  }, [loggedout])

  const logoutHandler = async () => {
    logout();
    setLoggedout(true);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/board">Trello</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {user ? (
            <Nav className="ml-auto">
              <NavDropdown
                title={`Hello ${user.fullName}`}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign up</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
