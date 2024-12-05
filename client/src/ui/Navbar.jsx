import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink as RouterNavLink } from 'react-router';
import RegistrationModal from './RegistrationModal';
import { NavDropdown } from 'react-bootstrap';
import LoginModal from './LoginModal';
import { useUser } from '../UserContext';

function NavBar() {
  const { user, isAuthenticated, logout } = useUser();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={RouterNavLink} to="/">
          My Dear Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link
              style={{
                color: 'inherit',
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                padding: '0',
                margin: '7px',

                fontSize: 'inherit',
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
              as={RouterNavLink}
              to="/"
            >
              Главная
            </Nav.Link>
            {isAuthenticated ? (
              <NavDropdown
                style={{ fontSize: '15px' }}
                title={user?.username || 'Пользователь'}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={RouterNavLink} to="/profile">
                  Профиль
                </NavDropdown.Item>
                <NavDropdown.Item href="/">В разработке</NavDropdown.Item>
                <NavDropdown.Item href="/">В разработке</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    logout();
                  }}
                >
                  Выход
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <RegistrationModal />
                <LoginModal />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
