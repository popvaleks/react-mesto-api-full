require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { celebrate, Joi, errors } = require('celebrate')
const cors = require('cors')

const usersRouter = require('./routes/users')
const { login, createUser } = require('./controllers/users')
const cardsRouter = require('./routes/cards')
const errorRouter = require('./routes/errorPage')
const auth = require('./middlewares/auth')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const linkRegExp = require('./helpers/regExp')

// Слушаем 3000 порт
const { PORT = 3000 } = process.env


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const app = express()

app.use(bodyParser.urlencoded({ extended: true })) // для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.json()) // для собирания JSON-формата

const whiteList = ['https://www.popvaleks.students.nomoreparties.xyz', 'https://popvaleks.students.nomoreparties.xyz',]

app.use(cors({
  "origin": whiteList,
  //"methods": "GET,HEAD,PUT,PATCH,POST,DELETE", // default
  //"preflightContinue": false,
  //"optionsSuccessStatus": 204,
  "credentials": true
}))

app.use(requestLogger)

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
}), login)
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(linkRegExp)),
  })
}), createUser)
// Защита авторизацией
app.use(auth)
app.use('/', usersRouter, cardsRouter, errorRouter)

app.use(errorLogger)

app.use(errors())

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    })
})

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})
