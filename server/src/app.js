const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const apiRouter = require('./routes/api.router');
const removeHeaderX = require('./middlewares/common');

const app = express();

const corsConfig = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5175',
    'http://127.0.0.1:5173',
    'https://www.google.com/',
  ],
  credintials: true,
};

app.use(cors(corsConfig));

app.use(removeHeaderX);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiRouter);

module.exports = app;
