const Card = require('../models/card')
const ErrorHandler = require('../middlewares/errorsHandler')

const getCards = (req, res, next) => {
  Card.find({})
    .sort('-createdAt')
    .then((cards) => {
      if (!cards) {
        return next(new ErrorHandler('Список карт отсутствует', 404))
      }
      if (cards.length === 0) {
        return next(new ErrorHandler('Карточки не найдены', 404))
      }
      res.send(cards)
    })
    .catch(next)
}

const postCards = (req, res, next) => {
  return Card.countDocuments()
    .then(count => {
      return Card.create({ id: count, owner: req.user._id, ...req.body })
        .then((Card) => {
          if (!Card) {
            return next(new ErrorHandler('Ошибка при передаче данных', 400))
          }
          res.send(Card)
        })
        .catch(err => {
          if (err.name === 'ValidationError') {
            return next(new ErrorHandler('Переданы некорректные данные', 400))
          }
          next(err)
        })
    })
    .catch(next)
}

const deleteCards = (req, res, next) => {
  const { _id } = req.params
  Card.findOne({ _id })
    .orFail(() => {
      throw new ErrorHandler('Карточка не найдена', 404)
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.remove()
          .then((removeCard) => res.send(removeCard))
      } else {
        throw new ErrorHandler('Вы не можете удалить данную карточку', 401)
      }
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return next(new ErrorHandler('Не валидный id', 400))
      }
      next(err)
    })
}

const likeCards = (req, res, next) => {
  Card.findOneAndUpdate({ _id: req.params._id },
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        return next(new ErrorHandler('Карточка не найдена', 404))
      }
      res.send(card)
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return next(new ErrorHandler('Не валидный id', 400))
      }
      next(err)
    })
}

const deleteLikeCards = (req, res, next) => {
  Card.findOneAndUpdate({ _id: req.params._id },
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        return next(new ErrorHandler('Карточка не найдена', 404))
      }
      res.send(card)
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return next(new ErrorHandler('Не валидный id', 400))
      }
      next(err)
    })
}

module.exports = {
  getCards,
  postCards,
  deleteCards,
  likeCards,
  deleteLikeCards,
}
