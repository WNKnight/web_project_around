export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }
  _showInputError(inputElement) {
    const errorElement = document.getElementById(`${inputElement.id}Error`);

    if (errorElement) {
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._config.errorClass);
    }
  }
  _hideInputError(inputElement) {
    const errorElement = document.getElementById(`${inputElement.id}Error`);

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this._config.errorClass);
    }
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _toggleButtonState(inputList, buttonElement) {
    if (buttonElement) {
      const isValid = inputList.every(
        (inputElement) => inputElement.validity.valid
      );

      if (isValid) {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove("popup__form-submit-button_disabled");
      } else {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add("popup__form-submit-button_disabled");
      }
    }
  }
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
