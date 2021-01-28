const router = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const {
  getUsers, getProfile, getUserMe, updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users')
const { validateId } = require('../helpers/validateForCelebrate')
const { linkRegExp } = require('../helpers/regExp')

router.get('/users', getUsers) // список пользователей
router.get('/users/me', validateId, getUserMe) // залогиненый пользователь
router.get('/users/:_id', validateId, getProfile) // поиск пользователя по id
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo)
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(new RegExp(linkRegExp)),
  }),
}), updateUserAvatar)

module.exports = router