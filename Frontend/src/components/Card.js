import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `button popup__button-trash ${isOwn ? 'popup__button-trash_visible' : 'popup__button-trash_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `button element__button-like ${isLiked ? 'element__button-like_enabled' : 'element__button-like_disabled'}`
  );

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleRemoveClick() {
    props.onRemoveClick(props.card);
  }

  return (
    <article className="element">
      <img onClick={handleClick} className="element__photo" src={props.card.link} alt={props.card.name} />
      <h3 className="element__title">{props.card.name}</h3>
      <div className="element__like">
        <button onClick={handleLikeClick} className={cardLikeButtonClassName} aria-label="Лайк" type="button"></button>
        <p className="element__like-current">{props.card.likes.length}</p>
      </div>
      <button onClick={handleRemoveClick} className={cardDeleteButtonClassName} id="card-trash" aria-label="Удалить карточку" type="button"></button>
    </article>
  )
}

export default Card;
