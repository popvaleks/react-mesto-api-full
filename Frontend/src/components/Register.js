import React from 'react';
import AuthForm from './AuthForm';

const Register = ({handleSubmitRegister, handleEmailChange, handlePasswordChange, email, password}) => {

  return (
      <AuthForm
        mainMessage="Регистрация"
        email={email}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmitRegister}
        btnText="Зарегестрироваться"
        password={password}
        display="true"
      >
      </AuthForm>
  );
}
export default Register;
