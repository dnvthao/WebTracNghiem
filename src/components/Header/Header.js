import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }

    return (
        <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to='/'  className='navbar-brand'>TracNghiem</NavLink>
        <Navbar.Toggle   aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to='/'       className='nav-link'>Trang Chủ</NavLink>
            <NavLink to='/users'  className='nav-link'>Người Dùng</NavLink>
            <NavLink to='/admins' className='nav-link'>Admin</NavLink>
          </Nav>
            <Nav>
              <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
              <button className='btn-sign up'>Sign up</button>
            <NavDropdown title= "Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item >Log in</NavDropdown.Item>
              <NavDropdown.Item >Log out</NavDropdown.Item>
              <NavDropdown.Item >Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default Header;