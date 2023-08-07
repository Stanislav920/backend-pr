const express = require('express');
const userRouter = require('./users');
const cardRouter = require('./cards');

const authProtection = require('../middlewares/auth');

const UnauthorizedError = require('../utils/repsone-errors/UnauthorizedError');

const router = express.Router();

router.use('/users', authProtection, userRouter);
router.use('/cards', authProtection, cardRouter);

router.use('*', authProtection, (req, res, next) => {
  next(new UnauthorizedError('Страница не найдена'));
});

module.exports = router;
