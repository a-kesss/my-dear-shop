const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const registRouter = require('./routes/registration.router');
const loginRouter = require('./routes/login.router');

// const authenticateToken = require('./middleware/authenticateToken');

const app = express();

const corsConfig = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// http://localhost:3000 + /api
app.use('/', registRouter);
app.use('/', loginRouter);


module.exports = app;
