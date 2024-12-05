import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axiosInstance from '../axiosinstance';
import { useUser } from '../UserContext';

function LoginModal() {
  const { login } = useUser();
  const [inputs, setInputs] = useState({ username: '', password: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login(token);
    }
  }, [login]);

  const changeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { username, password } = inputs;
    if (!username || !password) {
      setError('Пожалуйста, заполните все поля');
      setLoading(false);
      return;
    }
    try {
      const response = await axiosInstance.post('/login', inputs);
      console.log(response.data);
      const { success, token, user } = response.data;
      if (success === true) {
        localStorage.setItem('token', token);
        login(user);
        handleClose();
      } else if (success === false) {
        setError('Неправильный пароль или логин');
      }
    } catch (error) {
      console.error(error);
      setError('Ошибка сервера. Попробуйте позже!');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setInputs({ username: '', password: '' });
    setShow(false);
    setError('');
    setLoading(false);
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
        Вход
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Вход</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Логин</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={changeHandler}
                name="username"
                value={inputs.username}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                autoFocus
                onChange={changeHandler}
                name="password"
                value={inputs.password}
                isInvalid={inputs.password.length < 6 && inputs.password.length > 0}
              />
              <Form.Control.Feedback type="invalid">
                Пароль должен быть более 6 знаков
              </Form.Control.Feedback>
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

export default LoginModal;
