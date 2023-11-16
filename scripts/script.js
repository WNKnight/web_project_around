const editButton = document.getElementById("editButton");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".popup__close");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const nameInput = document.getElementById("pName");
const aboutInput = document.getElementById("pAboutme");
const saveButton = document.querySelector(".popup__form-submit-button");
const formElement = document.querySelector(".popup__form");
const newLocationPopup = document.getElementById("newLocationPopup");
const addLocationButton = document.getElementById("addButton");
const closeButtonNewLocationPopup = document.getElementById("closeNewLocation");
const pTitleInput = document.getElementById("pTitle");
const pLinkInput = document.getElementById("pLink");
const createButton = document.getElementById("createButton");
const addImageToGalleryButton = newLocationPopup.querySelector(
  ".popup__form-submit-button"
);

nameInput.value = profileName.textContent;
aboutInput.value = profileAbout.textContent;

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const galleryList = document.querySelector(".card-list");
const cardTemplate = document.getElementById("cardTemplate");

function createCard(card) {
  const cardClone = document.importNode(cardTemplate.content, true);
  const imgElement = cardClone.querySelector(".card__img");
  const deleteButton = cardClone.querySelector(".card__delete-button");
  const titleElement = cardClone.querySelector(".card__img-name");
  const likeButton = cardClone.querySelector(".card__like-button");

  imgElement.src = card.link;
  imgElement.alt = card.name;
  titleElement.textContent = card.name;

  deleteButton.addEventListener("click", () => {
    const cardElement = deleteButton.closest(".card");
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  return cardClone;
}

function addCardToGallery(card) {
  galleryList.prepend(createCard(card));
}

initialCards.forEach(addCardToGallery);

function addImageToGallery() {
  const title = pTitleInput.value;
  const link = pLinkInput.value;

  if (title && link) {
    addCardToGallery({ name: title, link: link });
    closeNewLocationPopup();
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup();
}

function openPopup() {
  popup.classList.add("show");
  overlay.classList.add("show");
}

function closePopup() {
  popup.classList.remove("show");
  overlay.classList.remove("show");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
saveButton.addEventListener("click", handleProfileFormSubmit);
formElement.addEventListener("submit", handleProfileFormSubmit);

function openNewLocationPopup() {
  newLocationPopup.classList.add("show");
  overlay.classList.add("show");
}

function closeNewLocationPopup() {
  newLocationPopup.classList.remove("show");
  overlay.classList.remove("show");
}

addLocationButton.addEventListener("click", openNewLocationPopup);
closeButtonNewLocationPopup.addEventListener("click", closeNewLocationPopup);
addImageToGalleryButton.addEventListener("click", addImageToGallery);

const closeImage = document.querySelector(".popup__close-image");
const popupImageContainer = document.querySelector(".popup-image-container");
const popupImage = document.querySelector(".popup-image");

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("card__img")) {
    const { src, alt } = event.target;
    popupImageContainer.classList.add("show");
    popupImage.classList.add("show");
    overlay.classList.add("show");
    popupImageContainer.querySelector("#popupImage").src = src;
    popupImageContainer.querySelector("#popupImage").alt = alt;
    popupImageContainer.querySelector("#PopUpImageTitle").textContent = alt;
  }
});

closeImage.addEventListener("click", () => {
  popupImageContainer.classList.remove("show");
  popupImage.classList.remove("show");
  overlay.classList.remove("show");
});
