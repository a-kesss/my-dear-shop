const registRouter = require('express').Router();
const { User } = require('../../db/models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

registRouter.post('/registration', async (req, res) => {
  const { username, password, email } = req.body;
  const { SECRET_KEY } = process.env;


  try {
    // Проверка на заполненность полей
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    // Проверка существования пользователя
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Пользователь уже существует' });
    }

    // Создание нового пользователя
    const user = await User.create({
      username,
      password,
      email,
    });

    // Генерация токена
    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(201).json({ success: true, user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = registRouter;
