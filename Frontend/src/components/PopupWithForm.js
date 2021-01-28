import React from 'react'

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name}  ${props.isOpen && 'popup_opened'}`} >
      <form className={`popup__container form_${props.name}`} id={`form_${props.name}`} name="edit" noValidate
        onSubmit={props.onSubmit}
      >
        <h3 className={`popup__title popup__title_${props.isNoProfile}`}>{props.title}</h3>
        {props.children}
        <button className="button popup__button-save" id={props.btnId} type="submit"
          aria-label="Сохранить и закрыть попап">{props.bntText}</button>
        <button className="button popup__button-cross" aria-label="Закрыть попап" type="button"
          onClick={props.onClose}></button>
      </form>
    </div>
  )
}

export default PopupWithForm
