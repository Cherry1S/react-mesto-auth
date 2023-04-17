import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarLink = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarLink.current.value);
  }

  useEffect(() => {
    avatarLink.current.value = '';
}, [isOpen]);

  return (
    <PopupWithForm
      name='popup-avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      submitText='Сохранить'
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input ref={avatarLink} id="text-input-avatar" name="avatar" type="url" className="popup__input-text" placeholder="Ссылка на изображение" required />
      <span className="popup__input-text-error text-input-avatar-error" id="avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
