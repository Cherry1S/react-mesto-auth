import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, imageSelector, imageCaptionSelector) {
    super(selector);
    this._popupImage = document.querySelector(imageSelector);
    this._popupImageCaption = document.querySelector(imageCaptionSelector);
  }

  open(title, link) {
    this._popupImageCaption.textContent = title;
    this._popupImage.src = link;
    this._popupImage.alt = title;
    super.open();
  }
}
