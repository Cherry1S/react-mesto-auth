import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { AppContext } from '../contexts/AppContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(AppContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name='popup-edit'
      title='Редактировать профиль'
      isOpen={isOpen}
      submitText='Сохранить'
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input value={name || ''} onChange={e => setName(e.target.value)} id="text-input-name" name="name" type="text" className="popup__input-text" placeholder="Имя" minLength="2" maxLength="30" required />
      <span className="popup__input-text-error text-input-name-error"></span>
      <input value={description || ''} onChange={e => setDescription(e.target.value)} id="text-input-about" name="about" type="text" className="popup__input-text" placeholder="Профессия" minLength="2" maxLength="200" required />
      <span className="popup__input-text-error text-input-about-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
