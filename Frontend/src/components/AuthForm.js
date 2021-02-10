import React from 'react'

const AuthForm = ({
  display, handleSubmit, mainMessage, handleEmailChange,
  handlePasswordChange, email, password, btnText, emailDirty, passwordDirty,
  emailError, passwordError, blurHandler, formValid,
}) => {
  return (
    <div className="login">
      <p className="login__enter">
        {mainMessage}
      </p>
      <form onSubmit={handleSubmit} className="login__form">
        {(emailDirty && emailError) && <div className="spanErr__auth">{emailError}</div>}
        <input onBlur={blurHandler} className="login__input" required id="email" name="email" placeholder="Email" type="text" value={email} onChange={handleEmailChange} />
        {(passwordDirty && passwordError) && <div className="spanErr__auth">{passwordError}</div>}
        <input onBlur={blurHandler} className="login__input" required id="password" name="password" placeholder="Пароль" type="password" value={password} onChange={handlePasswordChange} />
        <button disabled={!formValid} type="submit" onSubmit={handleSubmit} className="login__button">{btnText}</button>
      </form>
      {display
        && <p className="login__enterText">Уже зарегистрированы?<a href="./sign-in">Войти</a></p>
      }
    </div>
  )
}

export default AuthForm
