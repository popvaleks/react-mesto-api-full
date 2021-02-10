import React from 'react'
import AuthForm from './AuthForm'

const Register = ({
  handleSubmitRegister, handleEmailChange, handlePasswordChange, email, password,
  emailDirty, passwordDirty, emailError, passwordError, blurHandler, formValid,
}) => {
  return (
      <AuthForm
        mainMessage="Регистрация"
        email={email}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmitRegister}
        btnText="Зарегистрироваться"
        password={password}
        display="true"
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
export default Register
