import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.imageZoom = this.popup.querySelector(".popup__Image-Zoom");
    this.title = this.popup.querySelector(".popup__image-text");
  }

  open(imageSrc, imageAlt, captionText) {
    super.open();
    this.imageZoom.src = imageSrc;
    this.imageZoom.alt = imageAlt;
    this.title.textContent = captionText;
  }
}
