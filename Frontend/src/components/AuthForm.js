import React from 'react'

const AuthForm = ({
  display, handleSubmit, mainMessage, handleEmailChange,
  handlePasswordChange, email, password, btnText,
}) => {
  return (
    <div className="login">
      <p className="login__enter">
        {mainMessage}
      </p>
      <form onSubmit={handleSubmit} className="login__form">
        <input className="login__input" required id="email" name="email" placeholder="Email" type="text" value={email} onChange={handleEmailChange} />
        <input className="login__input" required id="password" name="password" placeholder="Пароль" type="password" value={password} onChange={handlePasswordChange} />
        <button type="submit" onSubmit={handleSubmit} className="login__button">{btnText}</button>
      </form>
      {display
        && <p className="login__enterText">Уже зарегестрированы?<a href="./sign-in">Войти</a></p>
      }
    </div>
  )
}

export default AuthForm
