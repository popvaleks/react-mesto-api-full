import React, { useRef } from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  const { isOpen, onClose } = props
  const [inputLinkRef, setInputLinkRef] = React.useState('')
  const [linkError, setLinkError] = React.useState('')
  const [formValidEdit, setFormValidEdit] = React.useState(false)
  const [disableBtn, setDisableBtn] = React.useState(true)
  const [linkDirty, setLinkDirty] = React.useState(false)

  const blurHandler = (evt) => {
    switch (evt.target.name) {
      case 'avatar':
        setLinkDirty(true)
        break
      // no default
    }
  }
  const handleInputLinkRef = (evt) => {
    setInputLinkRef(evt.target.value)
    const re = /https*:\/\/[^ "]+$/i
    if (!re.test(String(evt.target.value).toLowerCase())) {
      setLinkError('Не корректная ссылка')
    } else {
      setLinkError('')
      setDisableBtn(false)
    }
  }

  React.useEffect(() => {
    if (linkError) {
      setFormValidEdit(false)
      setDisableBtn(true)
    } else {
      setFormValidEdit(true)
      setDisableBtn(false)
    }
  }, [linkError])

  // сброс инпута
  React.useEffect(() => {
    setInputLinkRef('')
    setLinkError('')
    setDisableBtn(true)
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar({
      avatar: inputLinkRef,
    })
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" id="" bntText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formValidEdit={formValidEdit}
      disableBtn={disableBtn}
    >
      <input onBlur={blurHandler} type="url" name="avatar" placeholder="Ссылка на новый аватар"
        className="popup__input popup__input_link" required id="link-input-avatar" autoComplete="off"
        value={inputLinkRef} onChange={handleInputLinkRef}/>
      {(linkDirty && linkError) && <div className="popup__input-error popup__error_visible popup__input-error_avatar"
        id="job-input-error">{linkError}</div>}
    </PopupWithForm>
  )
}

export default EditAvatarPopup
