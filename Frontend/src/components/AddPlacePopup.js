import React from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddCard }) => {
  const [inputNameRef, setInputNameRef] = React.useState('');
  const [inputLinkRef, setInputLinkRef] = React.useState('');

  const handleInputNameRef = evt => setInputNameRef(evt.target.value)
  const handleInputLinkRef = evt => setInputLinkRef(evt.target.value)

  const resetForm = () => {
    setInputNameRef('');
    setInputLinkRef('');
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddCard({
      name: inputNameRef,
      link: inputLinkRef
    })
  }

  React.useEffect(() => {
    resetForm()
  }, [isOpen]);

  return (
    <PopupWithForm name="cards" title="Новое место" id="" bntText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input type="text" name="name" placeholder="Название" className="popup__input popup__input_name"
        minLength="1" maxLength="30" required id="card-name-input" autoComplete="off"
        onChange={handleInputNameRef}
        value={inputNameRef} />
      <span className="popup__input-error" id="card-name-input-error"></span>
      <input type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_link"
        required id="link-input" autoComplete="off"
        onChange={handleInputLinkRef}
        value={inputLinkRef} />
      <span className="popup__input-error" id="link-input-error"></span>
    </PopupWithForm >
  )
}

export default AddPlacePopup;
