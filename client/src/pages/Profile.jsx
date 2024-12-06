import { Card, Container, ListGroup } from 'react-bootstrap';
import { NavLink as RouterNavLink } from 'react-router';
import img from '../materials/logo.png';

export default function Profile() {
  const user = localStorage.getItem('user');
  const parsedUser = JSON.parse(user);

  return (
    <>
      <Card style={{ marginTop: '20px', width: '18rem' }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{parsedUser.username}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Почта: {parsedUser.email}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link as={RouterNavLink} to="/profileredact">
            Редактировать профиль
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
}
