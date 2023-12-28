export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);
    const cardElement = cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners(cardElement) {
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");

    deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(cardElement);
    });

    likeButton.addEventListener("click", () => {
      this._handleLikeClick(likeButton);
    });
  }

  _handleLikeClick(likeButton) {
    likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteClick(cardElement) {
    cardElement.remove();
  }

  generateCard() {
    const cardElement = this._getTemplate();

    const cardImage = cardElement.querySelector(".card__img");
    cardImage.src = this._image;
    cardImage.alt = this._name;

    const cardName = cardElement.querySelector(".card__img-name");
    cardName.textContent = this._name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}
