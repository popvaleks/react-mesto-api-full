import React, { useContext } from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    /* <!-- Profile --> */
    <>
      <main className="content">
        <section className="profile" id="popup__profile">
          <button onClick={props.onEditAvatar} className="profile__avatar-button" name="button-avatar" type="button" aria-label="Изменить аватар">
            <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} className="button profile__edit-button" name="button-edit" aria-label="Открыть попап" type="button">
            </button>
            <h2 className="profile__job">{currentUser.about}</h2>
          </div>
          <button onClick={props.onAddPlace} className="button profile__add-button-box" name="button-add" type="button" aria-label="Добавить карточку">
          </button>
        </section>
        {/* Elements */}
        <section className="elements">
          {props.cardList.map((item) => {
            return (
              <Card
              onCardClick={props.onCardClick}
              onRemoveClick={props.onRemoveClick}
              onCardLike={props.onCardLike}
              card={item}
              key={item._id}></Card>)
          })}
        </section>
      </main>
    </>
  )
}

export default Main;
