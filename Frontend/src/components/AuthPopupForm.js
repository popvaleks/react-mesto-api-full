import React from 'react'
import Rectangle from '../images/Rectangle.svg'
import Union from '../images/Union.svg'

function AuthPopupForm({ authPopup, isOpen, onClose }) {
  const registerText = "Вы успешно зарегистрировались!"
  const errorRegister = "Что-то пошло не так! Попробуйте ещё раз."
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} >
      <div className="popup__container">
        <img className="popup__auth-image" src={authPopup ? Rectangle : Union} alt="Галочка"></img>
        <p className="popup__auth-text">{authPopup ? registerText : errorRegister}</p>
        <button className="button popup__button-cross" aria-label="Закрыть попап" type="button"
          onClick={onClose}></button>
      </div>
    </div >
  )
}

export default AuthPopupForm
