const ErrorHandler = require('../middlewares/errorsHandler');
const router = require('express').Router();

router.get('*', (req, res, next) => {
  // res.status(404).send({ message: `Запрашиваемый ресурс не найден` })
  return next(new ErrorHandler('Запрашиваемый ресурс не найден', 404))
}
)


module.exports = router;