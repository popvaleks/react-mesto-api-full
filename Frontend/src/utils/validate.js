const regExpEmail = /([a-zA-Z0-9]([-_.]?[a-zA-Z0-9]+)*)@([a-zA-Z0-9]([-]?[a-zA-Z0-9]+)*)(\.([a-zA-Z])+)+/i
const regExpPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/
const regExpUrl = /https*:\/\/[^ "]+$/i

export default (values) => {
  const errors = {}

  const validateEmail = (value) => {
    if (regExpEmail.test(value)) {
      errors.email = false
    } else if (!value) {
      errors.email = 'Обязательное поле'
    } else {
      errors.email = 'Введите корректный Email адрес'
    }
  }
  const validatePassword = (value) => {
    if (regExpPassword.test(value)) {
      errors.password = false
    } else if (!value) {
      errors.password = 'Обязательное поле'
    } else {
      errors.password = 'Пароль должен содержать как минимум по 1 цифре, латинской букве верхнего и нижнего регистра и быть не меньше 8 символов'
    }
  }
  const validateName = (value) => {
    if (value && (value.length > 1 && value.length < 31)) {
      errors.name = false
    } else if (!value) {
      errors.name = 'Обязательное поле'
    } else {
      errors.name = 'Имя должно быть не меньше 2 и не больше 30 символов'
    }
  }
  const validateUrl = (value, key) => {
    if (regExpUrl.test(value)) {
      errors[key] = false
    } else if (!value) {
      errors[key] = 'Обязательное поле'
    } else {
      errors[key] = 'Введите правильный адрес, в формате: http(s)://example.com/image.png'
    }
  }
  const validateAbout = (value) => {
    if (value && (value.length >= 2 && value.length <= 300)) {
      errors.about = false
    } else if (!value) {
      errors.about = 'Обязательное поле'
    } else {
      errors.about = 'Напишите о себе хотя бы 2 символа... но не больше 300:)'
    }
  }

  if (Object.prototype.hasOwnProperty.call(values, 'email')) validateEmail(values.email)
  if (Object.prototype.hasOwnProperty.call(values, 'password')) validatePassword(values.password)
  if (Object.prototype.hasOwnProperty.call(values, 'name')) validateName(values.name)
  if (Object.prototype.hasOwnProperty.call(values, 'about')) validateAbout(values.about)
  if (Object.prototype.hasOwnProperty.call(values, 'avatar')) validateUrl(values.avatar, 'avatar')
  if (Object.prototype.hasOwnProperty.call(values, 'link')) validateUrl(values.link, 'link')

  return errors
}
