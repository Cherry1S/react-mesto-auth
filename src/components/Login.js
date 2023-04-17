import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js'

function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({email: '', password: ''});
          handleLogin();
          navigate('/', {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="register">
      <p className="register__welcome">
        Вход
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <input id="email" name="email" type="email" value={formValue.email} onChange={handleChange} className="register__input" placeholder='Email' />
        <input id="password" name="password" type="password" value={formValue.password} onChange={handleChange} className="register__input" placeholder='Пароль' />
        <div className="register__button-container">
          <button type="submit" onSubmit={handleSubmit} className="register__link">Войти</button>
        </div>
      </form>
    </div>
  );
}

export default Login
