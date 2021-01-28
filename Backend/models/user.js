const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const ErrorHandler = require('../middlewares/errorsHandler')

const userSchema = new mongoose.Schema({
  "name": {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  "about": {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  "avatar": {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: v => {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v)
      },
      message: 'Не корректная ссылка',
    },
  },
  "email": {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email Address')
      }
    },
  },
  "password": {
    type: String,
    required: true,
    select: false,
  },
})

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorHandler('Не верный Email или пароль', 400)
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrorHandler('Не верный Email или пароль', 400)
          }

          return user
        })
    })
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel