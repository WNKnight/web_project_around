import PopupWithConfirmation from "./PopupWithConfirmation";

export default class Card {
  constructor(data, templateSelector, handleCardClick, api, userInfo) {
    this._id = data._id;
    this._name = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._userInfo = userInfo;
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

    likeButton.addEventListener("click", () => {
      this._handleLikeClick(likeButton);
    });

    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._image, this._name);
    });

    const deletePopup = new PopupWithConfirmation("#deletePopup");
    deletePopup.setEventListeners();
    if (this._ownerId === this._userInfo.getUserInfo().id) {
      deleteButton.style.display = "block";
      deleteButton.addEventListener("click", () => {
        deletePopup.setOnConfirm(() => {
          this._api
            .deleteCard(this._id)
            .then(() => {
              cardElement.remove();
            })
            .catch((error) => {
              console.error("Erro ao excluir o cartão:", error);
            });
        });
        deletePopup.open();
      });
    } else {
      deleteButton.style.display = "none";
    }
  }

  _handleLikeClick(likeButton) {
    likeButton.classList.toggle("card__like-button_active");
  }

  _likeCount(likeCount) {
    likeCount.textContent = likeCount;
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".card__img");
    cardImage.src = this._image;
    cardImage.alt = this._name;

    const cardName = this._element.querySelector(".card__img-name");
    cardName.textContent = this._name;

    const likeButton = this._element.querySelector(".card__like-button");
    const likesCount = this._element.querySelector(".card__like-count");
    const deleteButton = this._element.querySelector(".card__delete-button");

    likesCount.textContent = this._likes.length;

    likeButton.classList.toggle("card__like-button_active", this._isLiked);

    this._setEventListeners(this._element);

    return this._element;
  }
}
