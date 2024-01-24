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
    this._isLiked = this._getLikeState();
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);
    return cardTemplate.content.querySelector(".card").cloneNode(true);
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".card__like-button");
    const cardImage = cardElement.querySelector(".card__img");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    likeButton.addEventListener("click", () => this._handleLikeClick());

    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._image, this._name);
    });

    const deletePopup = new PopupWithConfirmation("#deletePopup");

    if (this._ownerId === this._userInfo.getUserInfo().id) {
      deleteButton.style.display = "block";
      this._handleDeleteButtonClick = () =>
        this._handleDeleteClick(deletePopup);
      deleteButton.addEventListener("click", this._handleDeleteButtonClick);
    } else {
      deleteButton.style.display = "none";
    }
  }

  _handleDeleteClick(deletePopup) {
    deletePopup.open(() => {
      this._api
        .deleteCard(this._id)
        .then(() => {
          this._element.remove();
        })
        .catch((error) => console.error("Erro ao excluir o cartão:", error));
    });
  }

  _handleLikeClick() {
    if (!this._isLiked) {
      this._api
        .likeCard(this._id)
        .then(({ likes }) => {
          console.log("Curtida processada com sucesso:", likes);
          this._updateLikeState(true, likes.length);
          this._saveLikeState(true);
          this._element.querySelector(".card__like-count").textContent =
            likes.length;
        })

        .catch((error) => {
          console.error("Erro ao processar dar like no cartão:", error);
        });
    } else {
      this._api
        .unLikeCard(this._id)
        .then(({ likes }) => {
          this._updateLikeState(false, likes.length);
          this._saveLikeState(false);
          this._element.querySelector(".card__like-count").textContent =
            likes.length;
        })
        .catch((error) => {
          console.error("Erro ao processar dar dislike no cartão:", error);
        });
    }
  }

  _updateLikeState(isLiked, likes) {
    this._isLiked = isLiked;
    this._likes = likes;

    const likeButton = this._element.querySelector(".card__like-button");
    const likesCount = this._element.querySelector(".card__like-count");

    likeButton.classList.toggle("card__like-button_active", isLiked);
    likesCount.textContent = likes.length;
  }

  _saveLikeState(isLiked) {
    const likesState = JSON.parse(localStorage.getItem("likesState")) || {};
    likesState[this._id] = isLiked;
    localStorage.setItem("likesState", JSON.stringify(likesState));
  }

  _getLikeState() {
    const likesState = JSON.parse(localStorage.getItem("likesState")) || {};
    return likesState[this._id] || false;
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

    likesCount.textContent = this._likes.length;
    likeButton.classList.toggle("card__like-button_active", this._isLiked);

    this._setEventListeners(this._element);

    return this._element;
  }
}
