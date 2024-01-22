export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._id = data._id;
    this._name = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    const cardImage = cardElement.querySelector(".card__img");

    deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(cardElement);
    });

    likeButton.addEventListener("click", () => {
      this._handleLikeClick(likeButton);
    });

    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._image, this._name);
    });
  }

  _handleLikeClick(likeButton) {
    likeButton.classList.toggle("card__like-button_active");
  }
  _likeCount(likeCount) {
    likeCount.textContent = likeCount;
  }

  _handleDeleteClick(cardElement) {
    cardElement.remove();
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".card__img");
    cardImage.src = this._image;
    cardImage.alt = this._name;

    const cardName = this._element.querySelector(".card__img-name");
    cardName.textContent = this._name;

    const likesCount = this._element.querySelector(".card__like-count");
    likesCount.textContent = this._likes.length;

    this._setEventListeners(this._element);

    return this._element;
  }
}
