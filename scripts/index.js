import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";

const editButton = document.getElementById("editButton");
const popup = document.getElementById("profilePopup");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".popup__close");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const nameInput = document.getElementById("pName");
const aboutInput = document.getElementById("pAboutme");
const saveButton = document.querySelector(".popup__form-submit-button");
const newLocationPopup = document.getElementById("newLocationPopup");
const addLocationButton = document.getElementById("addButton");
const closeButtonNewLocationPopup = document.getElementById("closeNewLocation");
const titleInput = document.getElementById("pTitle");
const linkInput = document.getElementById("pLink");
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

function addCardToGallery(cardData) {
  const card = new Card(cardData, "#cardTemplate");
  const cardElement = card.generateCard();
  galleryList.prepend(cardElement);
}

initialCards.forEach(addCardToGallery);

function addImageToGallery() {
  const title = titleInput.value;
  const link = linkInput.value;

  if (title && link) {
    addCardToGallery({ name: title, link });
    closeNewLocationPopup();
  }

  createButtonState();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup();
}

function saveButtonState() {
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
editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
saveButton.addEventListener("click", handleProfileFormSubmit);

function openPopup() {
  popup.classList.add("show");
  overlay.classList.add("show");
  saveButtonState();
}

function closePopup() {
  popup.classList.remove("show");
  overlay.classList.remove("show");
}

function createButtonState() {
  const isTitleValid = titleInput.checkValidity();
  const isLinkValid = linkInput.checkValidity();
  if (isTitleValid && isLinkValid) {
    createButton.classList.remove("popup__form-submit-button_disabled");
    createButton.removeAttribute("disabled");
  } else {
    createButton.classList.add("popup__form-submit-button_disabled");
    createButton.setAttribute("disabled", true);
  }
}

function openNewLocationPopup() {
  newLocationPopup.classList.add("show");
  overlay.classList.add("show");
  createButtonState();
}

function closeNewLocationPopup() {
  newLocationPopup.classList.remove("show");
  overlay.classList.remove("show");
  createButtonState();
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
function validateProfileForm(inputElement) {
  const isNameValid = nameInput.checkValidity();
  const isAboutValid = aboutInput.checkValidity();

  if (inputElement === nameInput) {
    nameError.textContent = isNameValid ? "" : nameInput.validationMessage;
    nameError.classList.toggle("error-message_active", !isNameValid);
    nameInput.classList.toggle("popup__text_invalid", !isNameValid);
  } else if (inputElement === aboutInput) {
    aboutError.textContent = isAboutValid ? "" : aboutInput.validationMessage;
    aboutError.classList.toggle("error-message_active", !isAboutValid);
    aboutInput.classList.toggle("popup__text_invalid", !isAboutValid);
  }

  saveButtonState();
}
nameInput.addEventListener("input", () => validateProfileForm(nameInput));
aboutInput.addEventListener("input", () => validateProfileForm(aboutInput));

function validateNewLocation(inputElement) {
  const isTitleValid = titleInput.checkValidity();
  const isLinkValid = linkInput.checkValidity();

  if (inputElement === titleInput) {
    titleError.textContent = isTitleValid ? "" : titleInput.validationMessage;
    titleError.classList.toggle("error-message_active", !isTitleValid);
    titleInput.classList.toggle("popup__text_invalid", !isTitleValid);
  } else if (inputElement === linkInput) {
    if (isLinkValid) {
      linkError.textContent = linkInput.validationMessage;
      linkError.classList.toggle("error-message_active", false);
      linkInput.classList.toggle("popup__text_invalid", false);
    } else if (linkInput.value !== "") {
      linkError.textContent = "Por favor, insira um endereço web válido.";
      linkError.classList.add("error-message_active");
      linkInput.classList.add("popup__text_invalid");
    } else {
      linkError.textContent = isLinkValid ? "" : linkInput.validationMessage;
      linkError.classList.toggle("error-message_active", !isLinkValid);
      linkInput.classList.toggle("popup__text_invalid", !isLinkValid);
    }
  }

  createButtonState();
}
titleInput.addEventListener("input", () => validateNewLocation(titleInput));
linkInput.addEventListener("input", () => validateNewLocation(linkInput));

const formValidator = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__form-submit-button",
  inactiveButtonClass: "popup__form-submit-button_disabled",
  inputErrorClass: "error-message",
  errorClass: "error-message_active",
};

const profileForm = document.getElementById("profileForm");
const newLocationFormElement = document.getElementById("newLocationForm");

const profileFormValidator = new FormValidator(formValidator, profileForm);
const newLocationFormValidator = new FormValidator(
  formValidator,
  newLocationFormElement
);

profileFormValidator.enableValidation();
newLocationFormValidator.enableValidation();
