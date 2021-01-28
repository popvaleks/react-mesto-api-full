import React from 'react'

function ImagePopup(props) {
  return (
    <div className={`popup popup_window ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__wrapper">
        <img className="popup__image" src={props.cardInfo.link} alt={props.cardInfo.name} />
        <p className="popup__subtitle">{props.cardInfo.name}</p>
        <button onClick={props.onClose} className="button popup__button-cross popup__button-cross_window"
          aria-label="Закрыть попап" type="button"></button>
      </div>
    </div>
  )
}

export default ImagePopup
