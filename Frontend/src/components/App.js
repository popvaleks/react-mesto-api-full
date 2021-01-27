import React from 'react';
import { useHistory, Switch, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';
import AuthPopupForm from './AuthPopupForm';
import { getCookie, removeCookie } from '../helpers/cookieHandler'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [clickedCard, setClickedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '', email: '', _id: '' });
  const [cardList, setCardList] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [headerLink, setHeaderLink] = React.useState('');
  const [headerText, setHeaderText] = React.useState('');
  const [visible, setVisible] = React.useState(true);
  const [modText, setModText] = React.useState('');
  const [authPopup, setAuthPopup] = React.useState(false);
  const [emailInput, setEmailInput] = React.useState('');
  const [password, setPassword] = React.useState('');

  const history = useHistory();
  const location = useLocation();

  const hadnleLogin = () => {
    setLoggedIn(true)
  }

  const handleSignOut = () => {
    removeCookie('jwt')
    setLoggedIn(false)
    setCurrentUser({})
    setVisible(false)
    history.push('/sign-in');
  }

  function handleCardClick(data) {
    setSelectedCard(true);
    setClickedCard(data);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsAuthPopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (!isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.addLike(card._id)
        .then((newCard) => {
          // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          const newCards = cardList.map((c) => c._id === card._id ? newCard : c);
          // Обновляем стейт
          setCardList(newCards);
        })
        .catch((err) => { console.log(err) });
    }
    else {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.deleteLike(card._id)
        .then((newCard) => {
          // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          const newCards = cardList.map((c) => c._id === card._id ? newCard : c);
          // Обновляем стейт
          setCardList(newCards);
        })
        .catch((err) => { console.log(err) });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cardList.filter((c) => c._id !== card._id);
        // Обновляем стейт
        setCardList(newCards);
      })
      .catch((err) => { console.log(err) });
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((newData) => {
        // setCurrentUser({ name: newData.data.name, about: newData.data.about, avatar: newData.data.avatar, _id: newData.data._id, email: newData.data.email });
        setCurrentUser(newData.data);
        closeAllPopups();
      })
      .catch((err) => { console.log(err) });
  }

  function handleUpdateAvatar(data) {
    api.editUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData.data);
        closeAllPopups();
      })
      .catch((err) => { console.log(err) });
  }

  function handleAddCard(data) {
    api.addMyCard(data)
      .then((newCard) => {
        setCardList([newCard, ...cardList]);;
        closeAllPopups();
      })
      .catch((err) => { console.log(err) });
  }

  const handleEmailChange = evt => setEmailInput(evt.target.value)
  const handlePasswordChange = evt => setPassword(evt.target.value)

  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
    auth.register(emailInput, password)
      .then((data) => {
        setPassword('')
        setAuthPopup(true);
        setIsAuthPopupOpen(true)
        history.push('/sign-in')
      })
      .catch(() => {
        setPassword('')
        setAuthPopup(false);
        setIsAuthPopupOpen(true);
      });
  }

  const resetForm = () => {
    setEmailInput('')
    setPassword('')
  }

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
    auth.authorize(emailInput, password)
      .then((data) => {
        setPassword('')
        setLoggedIn(true)
        resetForm()
        history.push('/');
        uploadMain()
        setVisible(true)
      })
      .catch(() => {
        setPassword('')
        setAuthPopup(false);
        setIsAuthPopupOpen(true)
      });
  }

  const handleTokenCheck = () => {
    const jwt = getCookie('jwt');

    if (jwt) {
      setLoggedIn(true)
      uploadMain()
      history.push("/")
    }
  }

  React.useEffect(() => {
    handleTokenCheck()
    // eslint-disable-next-line
  }, []);

  const handleRouteCheck = React.useCallback(() => {
    if (location.pathname === '/') {
      return (
        setHeaderText('Выход'),
        setHeaderLink('./sign-in'),
        setModText("color: '#A9A9A9'")
      )
    }
    else if (location.pathname === '/sign-in') {
      return (
        setHeaderText('Регистрация'),
        setHeaderLink('./sign-up'),
        setVisible(false)
      )
    }
    else if (location.pathname === '/sign-up') {
      return (
        setHeaderText('Войти'),
        setHeaderLink('./sign-in'),
        setVisible(false)
      )
    }
  }, [location.pathname])

  React.useEffect(() => {
    handleRouteCheck()
  }, [handleRouteCheck])

  React.useEffect(() => {
    const escHandler = evt => {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    window.addEventListener("keyup", escHandler);
    return (
      () => window.removeEventListener("keyup", escHandler))
  }, []);

  const uploadMain = () => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => { console.log(err) });
    api.getUsersCards()
      .then((cards) => {
        setCardList(cards)
      })
      .catch((err) => { console.log(err) });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="background">
          <div className="page">
            <Header
              headerLink={headerLink}
              headerText={headerText}
              visible={visible}
              modText={modText}
              onclick={handleSignOut}>
            </Header>
            <Switch>
              <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onRemoveClick={handleCardDelete}
                cardList={cardList}
                onCardLike={handleCardLike}
              />
              <Route path="/sign-in">
                <Login
                  hadnleLogin={hadnleLogin}
                  handleSubmitLogin={handleSubmitLogin}
                  handleEmailChange={handleEmailChange}
                  handlePasswordChange={handlePasswordChange}
                  email={emailInput}
                  password={password}
                />
              </Route>
              <Route path="/sign-up">
                <Register
                  handleSubmitRegister={handleSubmitRegister}
                  handleEmailChange={handleEmailChange}
                  handlePasswordChange={handlePasswordChange}
                  password={password}
                />
              </Route>
            </Switch>
            <Footer></Footer>
            {/* <!-- Попап профиля --> */}
            <EditProfilePopup
              onUpdateUser={handleUpdateUser}
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups} />
            {/* <!-- Попап добавления карточки --> */}
            <AddPlacePopup
              onAddCard={handleAddCard}
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups} />
            {/* <!-- Попап редактирования аватара --> */}
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar} />
            <ImagePopup isOpen={selectedCard}
              cardInfo={clickedCard}
              onClose={closeAllPopups}>
            </ImagePopup>
            <AuthPopupForm
              authPopup={authPopup}
              isOpen={isAuthPopupOpen}
              onClose={closeAllPopups}>
            </AuthPopupForm>
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>

  );

}

export default App;
