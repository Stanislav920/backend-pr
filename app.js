const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

const { centralizedHandler } = require('./middlewares/centralized-handler');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

// Логгер
app.use(requestLogger);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Ошибки логгера
app.use(errorLogger);

// Обрабочек ответа.
app.use(errors());
app.use(centralizedHandler);

app.listen(PORT, () => console.log('Сервер запущен!'));
