import React from 'react'
import AuthForm from './AuthForm'

const Login = ({
  handleSubmitLogin, handleEmailChange, handlePasswordChange, email, password,
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
    >
    </AuthForm>
  )
}

export default Login
