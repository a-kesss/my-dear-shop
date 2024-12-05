const loginRouter = require('express').Router();
const { User } = require('../../db/models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

loginRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const { SECRET_KEY } = process.env;

  try {
    const user = await User.findOne({ where: { username } });
    if (user && user.password === password) {
      const token = jwt.sign({ username: user.username }, SECRET_KEY, {
        expiresIn: '1h',
      });

      res.json({ success: true, token, user });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
});

module.exports = loginRouter;
