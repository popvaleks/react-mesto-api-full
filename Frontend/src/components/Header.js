import React, { useContext } from 'react';
import logo from '../images/Mesto.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Header({ headerLink, headerText, visible, modText, onclick }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип место" />
      <div className="header__infoTooltip">
      {visible &&
      <p className="header__email">{currentUser.email}</p>
      }
      <a className={`header__link`} style={{modText}} onClick={onclick} href={headerLink}>{headerText}</a>
      </div>
    </header>
  )

}

export default Header;
