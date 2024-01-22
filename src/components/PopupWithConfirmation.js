import Popup from "../components/Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector("#confirmButton");
  }

  setOnConfirm(callback) {
    this._handleConfirmCallback = callback;
  }

  open() {
    super.open();
    this._confirmButton.addEventListener(
      "click",
      this._handleConfirm.bind(this)
    );
  }

  close() {
    super.close();
    this._confirmButton.removeEventListener(
      "click",
      this._handleConfirm.bind(this)
    );
  }

  _handleConfirm() {
    if (this._handleConfirmCallback) {
      this._handleConfirmCallback();
    }
    this.close();
  }
}
