import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'

function EditProfilePopup(props) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext)

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, props.isOpen])

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" id="button-save-edit" bntText="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
    >
      <input type="text" name="name" id="name-input" className="popup__input popup__input_name" minLength="2"
        maxLength="40" required autoComplete="off" placeholder="Имя"
        onChange={handleChangeName}
        value={name || ''}
      />
      <span className="popup__input-error" id="name-input-error"></span>
      <input type="text" name="about" id="job-input" className="popup__input popup__input_job"
        minLength="2" maxLength="200" required autoComplete="off" placeholder="Род занятий"
        onChange={handleChangeDescription}
        value={description || ''}
      />
      <span className="popup__input-error" id="job-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
