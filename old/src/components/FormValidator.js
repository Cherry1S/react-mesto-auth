export default class FormValidator {
  constructor(config, form) {
    this._config = config
    this._form = document.getElementById(form)
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(this._config.submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  };

  _blockButton = () => {
    this._button.classList.add(this._config.inactiveButtonClass);
    this._button.disabled = true;
  }

  _enableButton = () => {
    this._button.classList.remove(this._config.inactiveButtonClass);
    this._button.disabled = false;
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._blockButton();
    } else {
      this._enableButton();
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState()

    this._form.addEventListener('reset', () => {
      this._blockButton();
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement)
      });
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      });
    });
  };

  enableValidation = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  };
};
