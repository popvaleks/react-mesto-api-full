import React from 'react'
import PopupWithForm from './PopupWithForm'

const AddPlacePopup = ({ isOpen, onClose, onAddCard }) => {
  const [inputNameRef, setInputNameRef] = React.useState('')
  const [inputLinkRef, setInputLinkRef] = React.useState('')
  const [nameError, setNameError] = React.useState('')
  const [linkError, setLinkError] = React.useState('')
  const [formValidEdit, setFormValidEdit] = React.useState(false)
  const [disableBtn, setDisableBtn] = React.useState(true)
  const [nameDirty, setNameDirty] = React.useState(false)
  const [linkDirty, setLinkDirty] = React.useState(false)

  const blurHandler = (evt) => {
    switch (evt.target.name) {
      case 'name':
        setNameDirty(true)
        break
      case 'link':
        setLinkDirty(true)
        break
      // no default
    }
  }
  const handleInputNameRef = (evt) => {
    setInputNameRef(evt.target.value)
    if (evt.target.value.length < 2) {
      setNameError('Название дольжно быть больше одного символа')
    } else if (!evt.target.value) {
      setNameError('Заполните это поле')
    } else if (evt.target.value.length > 30) {
      setNameError('Название дольжно содержать не больше 30 символов')
    } else {
      setNameError('')
    }
  }
  const handleInputLinkRef = (evt) => {
    setInputLinkRef(evt.target.value)
    const re = /https*:\/\/[^ "]+$/i
    if (!re.test(String(evt.target.value).toLowerCase())) {
      setLinkError('Не корректная ссылка')
    } else {
      setLinkError('')
    }
  }

  React.useEffect(() => {
    if (nameError || linkError) {
      setFormValidEdit(false)
      setDisableBtn(true)
    } else if (inputNameRef.length === 0 || inputLinkRef.length === 0) {
      setFormValidEdit(false)
      setDisableBtn(true)
    } else {
      setFormValidEdit(true)
      setDisableBtn(false)
    }
  }, [nameError, linkError, inputNameRef, inputLinkRef])

  const resetForm = () => {
    setInputNameRef('')
    setInputLinkRef('')
    setNameError('')
    setLinkError('')
    setDisableBtn(true)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddCard({
      name: inputNameRef,
      link: inputLinkRef,
    })
  }

  React.useEffect(() => {
    resetForm()
  }, [isOpen])

  return (
    <PopupWithForm name="cards" title="Новое место" id="" bntText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formValidEdit={formValidEdit}
      disableBtn={disableBtn}
    >
      <input onBlur={blurHandler} type="text" name="name" placeholder="Название" className="popup__input popup__input_name"
        minLength="1" maxLength="30" required id="card-name-input" autoComplete="off"
        onChange={handleInputNameRef}
        value={inputNameRef} />
      {(nameDirty && nameError) && <div className="popup__input-error popup__error_visible" id="name-input-error">{nameError}</div>}
      <input onBlur={blurHandler} type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_link"
        required id="link-input" autoComplete="off"
        onChange={handleInputLinkRef}
        value={inputLinkRef} />
      {(linkDirty && linkError) && <div className="popup__input-error popup__error_visible popup__error_visible-about"
        id="job-input-error">{linkError}</div>}
    </PopupWithForm >
  )
}

export default AddPlacePopup
