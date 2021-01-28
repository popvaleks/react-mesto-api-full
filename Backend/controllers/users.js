const bcrypt = require('bcryptjs')
const { NODE_ENV, JWT_SECRET } = process.env
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { getId } = require('../helpers/getId')
const ErrorHandler = require('../middlewares/errorsHandler')

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      // Без логина не отработает, если есть логин то есть и пользователи
      if (!users) {
        return next(new ErrorHandler('Ошибка сервера: пользователи не найдены', 504))
      }
      res.send(users)
    })
    .catch(next)
}

const getProfile = (req, res, next) => {
  const { _id } = req.params
  User.findOne({ _id })
    .orFail(() => {
      throw new ErrorHandler('Пользователь не найден', 404)
    })
    .then((users) => {
      res.send(users)
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return next(new ErrorHandler('Не валидный id', 400))
      }
      next(err)
    })
}

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => User.create({
      email: req.body.email,
      password: hash, // записываем хеш в базу
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((users) => {
      res.send({
        data: {
          name: users.name,
          about: users.about,
          avatar: users.avatar,
          _id: users._id,
          email: users.email,
        },
      })
    })
    .catch((err) => {
      const duplicateErrorCode = 11000
      if (err.code === duplicateErrorCode) {
        return next(new ErrorHandler('Пользователь с таким Email уже зарегестрирован', 409))
      }
      next(err)
    })
}

const login = (req, res, next) => {
  const { email, password } = req.body
  // Проверка с ошибками уже в схеме
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'world-secret', { expiresIn: '7d' })
      res.cookie('jwt', token, {
        maxAge: 60 * 60 * 24 * 7 * 1000,
        httpOnly: false,
        path: '/',
        domain: 'popvaleks.students.nomoreparties.xyz',
        secure: true,
        credentials: 'include',
      })
        .send({ message: 'Вы успешно авторизаровались' })
    })
    .catch(next)
}

const getUserMe = (req, res, next) => {
  const _id = getId(req)
  User.findOne({ _id })
    .then((user) => {
      // без логина не срабатывает, а если залогинен
      // то покажет, проверка отсутвия пользователя в массиве бессмысленна
      res.send(user)
    })
    .catch(next)
}

const updateUserInfo = (req, res, next) => {
  const _id = getId(req)
  const { name, about } = req.body
  User.findOneAndUpdate({ _id }, { name, about },
    { new: true, runValidators: true })
    // все сценарии отрабатываются при логине, проверка ошибок под вопросом
    .orFail(() => {
      throw new ErrorHandler('Пользователь не найден', 404)
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return next(new ErrorHandler('Не валидный id', 400))
      }
      next(err)
    })
}

const updateUserAvatar = (req, res, next) => {
  const _id = getId(req) // req.user._id
  const { avatar } = req.body
  User.findOneAndUpdate({ _id }, { avatar },
    { new: true, runValidators: true })
    // все сценарии отрабатываются при логине, проверка ошибок под вопросом
    .orFail(() => {
      throw new ErrorHandler('Пользователь не найден', 404)
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return next(new ErrorHandler('Не валидный id', 400))
      }
      next(err)
    })
}

module.exports = {
  getUsers,
  getProfile,
  login,
  updateUserInfo,
  createUser,
  getUserMe,
  updateUserAvatar,
}
