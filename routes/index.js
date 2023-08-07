const express = require('express');
const userRouter = require('./users');
const cardRouter = require('./cards');

const { loginUser, createUser } = require('../controllers/users');
const { validateUserAuth, validateUserRegister, } = require('../utils/validation');

const authProtection = require('../middlewares/auth');

const UnauthorizedError = require('../utils/repsone-errors/UnauthorizedError');

const router = express.Router();

router.use('/users', authProtection, userRouter);
router.use('/cards', authProtection, cardRouter);

router.post('/signin', validateUserAuth, loginUser);
router.post('/signup', validateUserRegister, createUser);
router.use('*', authProtection, (req, res, next) => {
  next(new UnauthorizedError('Страница не найдена'));
});

module.exports = router;
