const nameInput = document.getElementById('text-input-name')
const aboutInput = document.getElementById('text-input-about')
const formEditButton = document.querySelector('.profile__edit-button')
const formAddButton = document.querySelector('.profile__add-button')
const formAvatarButton = document.querySelector('.profile__avatar-button')
const closePopupKey = 'Escape'


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-text-error_active'
};

export {
  nameInput, aboutInput, formEditButton, formAddButton, formAvatarButton,
  closePopupKey, validationConfig
}
