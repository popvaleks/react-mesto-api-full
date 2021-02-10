import React from 'react'
import AuthForm from './AuthForm'

const Login = ({
  handleSubmitLogin, handleEmailChange, handlePasswordChange, email, password,
  emailDirty, passwordDirty, emailError, passwordError, blurHandler, formValid,
}) => {
  return (
    <AuthForm
      mainMessage="Вход"
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmitLogin}
      btnText="Вход"
      email={email}
      password={password}
      emailError={emailError}
      emailDirty={emailDirty}
      passwordDirty={passwordDirty}
      emailError={emailError}
      passwordError={passwordError}
      blurHandler={blurHandler}
      formValid={formValid}
    >
    </AuthForm>
  )
}

export default Login
