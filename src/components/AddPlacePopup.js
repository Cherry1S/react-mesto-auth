import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(cardName, cardLink);
  }

  useEffect(() => {
    setCardName('');
    setCardLink('');
}, [isOpen]);

  return (
    <PopupWithForm
      name='popup-add'
      title='Новое место'
      isOpen={isOpen}
      submitText='Создать'
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input value={cardName || ''} onChange={e => setCardName(e.target.value)} id="text-input-place" name="place" type="text" className="popup__input-text" placeholder="Название" required minLength="2" maxLength="30" />
      <span className="popup__input-text-error text-input-place-error"></span>
      <input value={cardLink || ''} onChange={e => setCardLink(e.target.value)} id="text-input-link" name="link" type="url" className="popup__input-text" placeholder="Ссылка на изображение" required />
      <span className="popup__input-text-error text-input-link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
