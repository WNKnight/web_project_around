import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__form-submit-button");
    this.setEventListeners();
  }

  _getInputValues() {
    const inputValues = {};
    const inputList = this._form.querySelectorAll(".popup__text");
    inputList.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  submit() {
    this._submitCallback(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submit();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
