import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import axiosInstance from '../axiosinstance';

function ProfileRedact() {
  const user = localStorage.getItem('user');
  const parsedUser = JSON.parse(user);

  const [formData, setFormData] = useState({
    id: parsedUser.id,
    name: '',
    email: '',
    password: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [showAccess, setShowAccess] = useState(false);

  const changeHandler = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!parsedUser) {
        console.error('No user data available');
        return;
      }

      const response = await axiosInstance.put('/update', formData);

      if (response.status === 200) {
        setShowAccess(true);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Update failed:', error);
      setShowAccess(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить свой профиль?')) {
      const response = await axiosInstance.delete('/delete', { data: parsedUser });

      if (response.status === 200) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    }
    setShowAlert(true);
  };

  return (
    <Container className="mt-5">
      {showAlert && <Alert variant="success">Профиль успешно удален</Alert>}
      {showAccess && <Alert variant="success">Профиль успешно обновлён</Alert>}
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.username}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            required
          />
        </Form.Group>
        <Form.Group>
          <Button
            variant="primary"
            style={{ marginTop: '10px' }}
            onClick={handleSubmit}
            type="submit"
          >
            Сохранить изменения
          </Button>
        </Form.Group>
        <Form.Group>
          <Button variant="danger" style={{ marginTop: '10px' }} onClick={handleDelete}>
            Удалить профиль
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default ProfileRedact;