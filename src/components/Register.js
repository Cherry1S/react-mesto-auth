import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js'

function Register({ onSubmit }) {
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
    auth.register(formValue.email, formValue.password)
      .then((res) => {
        if (res.error) {
          return onSubmit(false)
        }
        onSubmit(true)
        navigate('/sign-in', { replace: true })
      })
  }

  return (
    <div className="register">
      <p className="register__welcome">
        Регистрация
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <input id="email" name="email" type="email" value={formValue.email} onChange={handleChange} className="register__input" placeholder='Email' />
        <input id="password" name="password" type="password" value={formValue.password} onChange={handleChange} className="register__input" placeholder='Пароль' />
        <div className="register__button-container">
          <button type="submit" onSubmit={handleSubmit} className="register__link">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register
