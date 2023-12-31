export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._overlay = document.querySelector(".overlay");
    this._closeButton = this._popup.querySelector(".popup__close");
  }

  open() {
    this._popup.classList.add("show");
    this._overlay.classList.add("show");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("show");
    this._overlay.classList.remove("show");
    this.removeEventListeners();
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._overlay.addEventListener("click", (event) => {
      if (event.target === this._overlay) {
        this.close();
      }
    });

    document.addEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
  }

  removeEventListeners() {
    this._closeButton.removeEventListener("click", () => {
      this.close();
    });

    this._overlay.removeEventListener("click", (event) => {
      if (event.target === this._overlay) {
        this.close();
      }
    });

    document.removeEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
  }
}
