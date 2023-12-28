export class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this.overlay = document.querySelector(".overlay");
    this.closeButton = this.popup.querySelector(".popup__close");
    this.setEventListeners();
  }

  open() {
    this.popup.classList.add("show");
    this.overlay.classList.add("show");
  }

  close() {
    this.popup.classList.remove("show");
    this.overlay.classList.remove("show");
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.closeButton.addEventListener("click", () => {
      this.close();
    });

    this.overlay.addEventListener("click", (event) => {
      if (event.target === this.overlay) {
        this.close();
      }
    });

    document.addEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
  }
}
