import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'

function EditProfilePopup(props) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [nameError, setNameError] = React.useState('')
  const [aboutError, setAboutError] = React.useState('')
  const [formValidEdit, setFormValidEdit] = React.useState(false)
  const [disableBtn, setDisableBtn] = React.useState(false)
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    if (nameError || aboutError) {
      setFormValidEdit(false)
      setDisableBtn(true)
    } else {
      setFormValidEdit(true)
      setDisableBtn(false)
    }
  }, [nameError, aboutError])

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, props.isOpen])

  function handleChangeName(evt) {
    setName(evt.target.value)
    if (evt.target.value.length < 2) {
      setNameError('Имя дольжно быть больше одного символа')
    } else if (!evt.target.value) {
      setNameError('Заполните это поле')
    } else if (evt.target.value.length > 30) {
      setNameError('Имя дольжно содержать не больше 30 символов')
    } else {
      setNameError('')
    }
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
    if (evt.target.value.length < 2) {
      setAboutError('Тут должно быть больше одного символа')
    } else if (!evt.target.value) {
      setAboutError('Заполните это поле')
    } else if (evt.target.value.length > 30) {
      setAboutError('Поле не должно содержать больше 30 символов')
    } else {
      setAboutError('')
    }
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

  function onClose() {
    props.onClose()
    setNameError('')
    setAboutError('')
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      id="button-save-edit"
      bntText="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      formValidEdit={formValidEdit}
      disableBtn={disableBtn}
    >
      <input type="text" name="name" id="name-input" className="popup__input popup__input_name" minLength="2"
        maxLength="40" required autoComplete="off" placeholder="Имя"
        onChange={handleChangeName}
        value={name || ''}
      />
      {(nameError) && <div className="popup__input-error popup__error_visible" id="name-input-error">{nameError}</div>}
      <input type="text" name="about" id="job-input" className="popup__input popup__input_job"
        minLength="2" maxLength="200" required autoComplete="off" placeholder="Род занятий"
        onChange={handleChangeDescription}
        value={description || ''}
      />
      {(aboutError) && <div className="popup__input-error popup__error_visible popup__error_visible-about"
        id="job-input-error">{aboutError}</div>}
    </PopupWithForm>
  )
}

export default EditProfilePopup
