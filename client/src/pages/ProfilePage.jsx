import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useUser } from '../UserContext';
import axiosInstance from '../axiosinstance';

function ProfilePage() {
  const { user, logout } = useUser();
  const [formData, setFormData] = useState({
    name: user.username,
    email: user.email,
    password: user.password,
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Данные профиля обновлены:', formData);
  };

  const handleDelete = async () => {
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);

    if (window.confirm('Вы уверены, что хотите удалить свой профиль?')) {
      const response = await axiosInstance.delete('/delete', parsedUser);
      if (response.status === 200) {
        logout();
      }
    }
    setShowAlert(true);
  };

  return (
    <Container className="mt-5">
      {showAlert && <Alert variant="success">Профиль успешно удален.</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mr-2">
          Сохранить изменения
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Удалить профиль
        </Button>
      </Form>
    </Container>
  );
}

export default ProfilePage;
