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

import { Card } from "./card.js";

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

function addCardToGallery(cardData) {
  const card = new Card(cardData, "#cardTemplate");
  const cardElement = card.generateCard();
  galleryList.prepend(cardElement);
}

initialCards.forEach(addCardToGallery);

function updateButtonState(buttonElement, isValid) {
  if (isValid) {
    buttonElement.classList.remove("popup__form-submit-button_disabled");
    buttonElement.removeAttribute("disabled");
  } else {
    buttonElement.classList.add("popup__form-submit-button_disabled");
    buttonElement.setAttribute("disabled", true);
  }
}

function updateCreateButtonState() {
  const isValid = pTitleInput.checkValidity() && pLinkInput.checkValidity();
  updateButtonState(createButton, isValid);
}

function addImageToGallery() {
  const title = pTitleInput.value;
  const link = pLinkInput.value;

  if (title && link) {
    addCardToGallery({
      name: title,
      link: link,
    });
    closeNewLocationPopup();
  }

  updateCreateButtonState();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup();
}

function handleSaveButtonClick() {
  if (nameInput.checkValidity() && aboutInput.checkValidity()) {
    saveButton.classList.remove("popup__form-submit-button_disabled");
  } else {
    saveButton.classList.add("popup__form-submit-button_disabled");
  }
}
function updateSaveButtonState() {
  const isNameValid = nameInput.checkValidity();
  const isAboutValid = aboutInput.checkValidity();

  if (isNameValid && isAboutValid) {
    saveButton.classList.remove("popup__form-submit-button_disabled");
    saveButton.removeAttribute("disabled");
  } else {
    saveButton.classList.add("popup__form-submit-button_disabled");
    saveButton.setAttribute("disabled", true);
  }
}

function openPopup() {
  popup.classList.add("show");
  overlay.classList.add("show");
  updateSaveButtonState();
}

function closePopup() {
  popup.classList.remove("show");
  overlay.classList.remove("show");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
saveButton.addEventListener("click", handleProfileFormSubmit);

formElement.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt);
  handleSaveButtonClick();
});

function setEventListenersForProfileForm() {
  nameInput.addEventListener("input", updateSaveButtonState);
  aboutInput.addEventListener("input", updateSaveButtonState);
}

aboutInput.addEventListener("input", function () {
  handleSaveButtonClick();
});

function openNewLocationPopup() {
  newLocationPopup.classList.add("show");
  overlay.classList.add("show");
  updateCreateButtonState();
}

function closeNewLocationPopup() {
  newLocationPopup.classList.remove("show");
  overlay.classList.remove("show");
  updateCreateButtonState();
}

addLocationButton.addEventListener("click", openNewLocationPopup);
closeButtonNewLocationPopup.addEventListener("click", closeNewLocationPopup);
addImageToGalleryButton.addEventListener("click", addImageToGallery);

const closeButtonImage = document.querySelector(".popup-image-close");
closeButtonImage.classList.add("popup__close");
const popupImageContainer = document.querySelector(".popup-image");
const popupImage = document.querySelector(".popup-image-open");

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

function closeImagePopup() {
  popupImageContainer.classList.remove("show");
  popupImage.classList.remove("show");
  overlay.classList.remove("show");
}

overlay.addEventListener("click", function (event) {
  if (event.target === overlay) {
    closePopup();
    closeNewLocationPopup();
    closeImagePopup();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePopup();
    closeNewLocationPopup();
    closeImagePopup();
  }
});

if (closeButtonImage) {
  closeButtonImage.addEventListener("click", closeImagePopup);
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__form-submit-button",
  inactiveButtonClass: "popup__form-submit-button_disabled",
  inputErrorClass: "error-message",
  errorClass: "error-message_active",
});
