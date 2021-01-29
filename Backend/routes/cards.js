const router = require('express').Router()
const { celebrate } = require('celebrate')
const Joi = require('joi')
const {
  getCards, postCards, deleteCards, likeCards, deleteLikeCards,
} = require('../controllers/cards')
const { linkRegExp } = require('../helpers/regExp')
const { validateId } = require('../helpers/validateForCelebrate')

router.get('/cards', getCards)
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(linkRegExp)),
  }),
}), postCards)
router.delete('/cards/:_id', validateId, deleteCards)
router.put('/cards/:_id/likes', validateId, likeCards)
router.delete('/cards/:_id/likes', validateId, deleteLikeCards)

module.exports = router