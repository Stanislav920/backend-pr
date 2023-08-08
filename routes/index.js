const express = require('express');
const userRouter = require('./users');
const cardRouter = require('./cards');

const UnauthorizedError = require('../utils/repsone-errors/UnauthorizedError');

const { loginUser, createUser } = require('../controllers/users');
const { validateUserAuth, validateUserRegister, } = require('../utils/validation');

const authGuard = require('../middlewares/auth');

const router = express.Router();

router.use('/signin', validateUserAuth, loginUser);
router.use('/signup', validateUserRegister, createUser);

router.use('/users', authGuard, userRouter);
router.use('/cards', authGuard, cardRouter);

router.use('*', authGuard, (req, res, next) => {
  next(new UnauthorizedError('Страница не найдена'));
});

module.exports = router;
