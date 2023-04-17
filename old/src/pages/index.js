import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupCardDelete from '../components/PopupCardDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  nameInput, aboutInput, formEditButton, formAddButton, formAvatarButton, validationConfig
} from '../utils/constants.js';
import { renderLoading } from '../utils/utils.js';
import './index.css';

let userId = ''

function createCard(cardData, userId, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
  return new Card(cardData, userId, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick).generateCard();
}

function handleCardClick(title, link) {
  popupView.open(title, link);
}

function handleDeleteClick(cardId, card) {
  popupDelete.getCard(cardId, card)
  popupDelete.open()
}

function handleLikeClick(cardId, card, isLiked) {
  if (isLiked) {
    api.removeLike(cardId)
      .then((newData) => {
        card.toggleLike(newData)
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    api.likeCard(cardId)
      .then((newData) => {
        card.toggleLike(newData)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

//////////////////////////////////////////////////////////////////////////////////////

const enableValidator = (config, form) => { new FormValidator(config, form).enableValidation() };
const cardsList = new Section((cardData) => {
  const newCard = createCard(cardData, userId, 'template-card', handleCardClick, handleDeleteClick, handleLikeClick);
  cardsList.addItemReversed(newCard);
},
  '.elements__grid'
);
const userInfo = new UserInfo('.profile__title', '.profile__about', '.profile__image');
const popupView = new PopupWithImage('popup-view', '.popup__image', '.popup__image-caption');
const formEdit = new PopupWithForm({
  selector: 'popup-edit',
  handleSubmitForm: (newInfo, submitButton) => {
    renderLoading(submitButton, 'Сохранение...');
    api.changeUserInfo(newInfo.name, newInfo.about)
      .then((newInfo) => {
        userInfo.setUserInfo(newInfo)
        formEdit.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        renderLoading(submitButton, 'Сохранить')
      })
  }
});
const formAdd = new PopupWithForm({
  selector: 'popup-add',
  handleSubmitForm: (newCardInfo, submitButton) => {
    renderLoading(submitButton, 'Сохранение...');
    api.addCard(newCardInfo.place, newCardInfo.link)
      .then((cardData) => {
        cardsList.addItem(createCard(cardData, userId, 'template-card', handleCardClick, handleDeleteClick, handleLikeClick))
        formAdd.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        renderLoading(submitButton, 'Создать')
      })
  }
});
const formAvatar = new PopupWithForm({
  selector: 'popup-avatar',
  handleSubmitForm: (newAvatar, submitButton) => {
    renderLoading(submitButton, 'Сохранение...');
    api.changeAvatar(newAvatar.avatar)
      .then((profileInfo) => {
        userInfo.setUserAvatar(profileInfo)
        formAvatar.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        renderLoading(submitButton, 'Сохранить')
      })
  }
});
const popupDelete = new PopupCardDelete({
  selector: 'popup-delete',
  handleCardDelete: (cardId, card) => {
    api.deleteCard(cardId)
      .then(() => {
        card.removeCard()
        popupDelete.close()
      })
      .catch((err) => {
        console.log(err)
      })
  }
});

//////////////////////////////////////////////////////////////////////////////////////

formAddButton.addEventListener('click', () => {
  formAdd.open();
});
formEditButton.addEventListener('click', () => {
  formEdit.open();
  const oldInfo = userInfo.getUserInfo();
  nameInput.value = oldInfo.name;
  aboutInput.value = oldInfo.about;
});
formAvatarButton.addEventListener('click', () => {
  formAvatar.open();
});

//////////////////////////////////////////////////////////////////////////////////////

formAvatar.setEventListeners();
formAdd.setEventListeners();
formEdit.setEventListeners();
popupView.setEventListeners();
popupDelete.setEventListeners();
enableValidator(validationConfig, 'form-add');
enableValidator(validationConfig, 'form-edit');
enableValidator(validationConfig, 'form-avatar');

//////////////////////////////////////////////////////////////////////////////////////

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'fe2506e1-5260-4f6d-bc3e-c28fd341c579',
    'Content-Type': 'application/json',
  },
});

Promise.all([
  api.getInitialCards(),
  api.getUser()
])
  .then((pageData) => {
    userId = pageData[1]._id;
    cardsList.renderItems(pageData[0]);
    userInfo.setUserInfo(pageData[1]);
    userInfo.setUserAvatar(pageData[1]);
  })
  .catch((err) => {
    console.log(err)
  })
