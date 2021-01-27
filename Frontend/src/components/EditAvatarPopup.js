import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const { isOpen, onClose, } = props;
  const inputRef = useRef('');

  // сброс инпута
  React.useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" id="" bntText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input type="url" name="avatar" defaultValue="" placeholder="Ссылка на новый аватар"
        className="popup__input popup__input_link" required id="link-input-avatar" autoComplete="off"
        ref={inputRef} />
      <span className="popup__input-error popup__input-error_avatar" id="link-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
