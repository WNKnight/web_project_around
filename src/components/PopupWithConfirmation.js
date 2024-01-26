import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector("#confirmButton");
    this._boundHandleConfirm = this._handleConfirm.bind(this);
    this._confirmButton.addEventListener("click", this._boundHandleConfirm);
    this._handleConfirmCallback = null;
  }

  open(callback) {
    this._handleConfirmCallback = callback;
    super.open();
  }

  _handleConfirm() {
    if (this._handleConfirmCallback) {
      this._handleConfirmCallback();
      this._handleConfirmCallback = null;
    }
    this.close();
  }
}
