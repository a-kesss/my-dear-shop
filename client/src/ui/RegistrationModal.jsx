import axiosInstance from '../axiosinstance';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useUser } from '../UserContext';

function RegistrationModal() {
  const { login } = useUser();
  const [inputs, setInputs] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);


  const changeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { username, password, email } = inputs;
    if (!username || !password || !email) {
      setError('Пожалуйста, заполните все поля');
      setLoading(false);
      return;
    }
    try {
      const response = await axiosInstance.post('/registration', inputs);
      console.log(response.data);
      const { success, token, user } = response.data;
      if (success === true) {
        localStorage.setItem('token', token);
        login(user);
      }
      handleClose();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Пользователь уже существует');
      } else {
        setError('Ошибка сервера');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setInputs({ username: '', password: '', email: '' });
    setError('');
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        style={{
          color: 'inherit',
          textDecoration: 'none',
          background: 'none',
          border: 'none',
          padding: '0',
          margin: '5px',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          cursor: 'pointer',
        }}
        onClick={handleShow}
      >
        Регистрация
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Регистрация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Логин</Form.Label>
              <Form.Control
                onChange={changeHandler}
                name="username"
                type="text"
                autoFocus
                value={inputs.username}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                onChange={changeHandler}
                name="password"
                type="password"
                value={inputs.password}
                isInvalid={inputs.password.length < 6 && inputs.password.length > 0}
              />
              <Form.Control.Feedback type="invalid">
                Пароль должен быть более 6 знаков
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Почта</Form.Label>
              <Form.Control
                onChange={changeHandler}
                name="email"
                type="email"
                value={inputs.email}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Загрузка...' : 'Войти'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegistrationModal;
