const ErrorHandler = require('../middlewares/errorsHandler')

module.exports = {
  getCookie: function (cookie_name, req, next) {
    if (req.headers.cookie) {
      let results = req.headers.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)')
      if (results) {
        return (unescape(results[2]));
      }
      else
        return next(new ErrorHandler('Искомый куки не найден', 404))
    } else {
      return null
    }
  }
}