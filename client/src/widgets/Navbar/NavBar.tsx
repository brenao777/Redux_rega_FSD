import Container from 'react-bootstrap/Container';
import NavLink from 'react-bootstrap/esm/NavLink';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../shared/hooks';

export function NavBar(): React.JSX.Element {

const user = useAppSelector((store) => store.user.data?.name)

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">{user}</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink as={Link} to="/">
            Домой
          </NavLink>
          <NavLink as={Link} to="/add">
            Добавить
          </NavLink>
          <NavLink as={Link} to="/login">
            Вход
          </NavLink>
          <NavLink as={Link} to="/register">
            Регистрация
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
