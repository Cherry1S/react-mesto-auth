import Popup from "./Popup.js"

export default class PopupCardDelete extends Popup {
  constructor({ selector, handleCardDelete }) {
    super(selector)
    this._handleCardDelete = handleCardDelete
    this._deleteButton = this._popup.querySelector('.popup__submit')
  }

  getCard(cardId, card) {
    this._cardId = cardId;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', () => { this._handleCardDelete(this._cardId, this._card) });
  }
}
