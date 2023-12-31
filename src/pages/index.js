import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const nameInput = document.getElementById("pName");
const aboutInput = document.getElementById("pAboutme");
const saveButton = document.getElementById("saveButton");
const titleInput = document.getElementById("pTitle");
const linkInput = document.getElementById("pLink");
const createButton = document.getElementById("createButton");
const editButton = document.getElementById("editButton");
const addButton = document.getElementById("addButton");

const userInfo = new UserInfo(".profile__name", ".profile__about");

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

const gallerySection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".card-list"
);

gallerySection.render();

function renderCard(cardData) {
  const card = new Card(cardData, "#cardTemplate", handleCardClick);
  const cardElement = card.generateCard();
  gallerySection.addItem(cardElement);
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

///////////////////popup profile////////////////////////
editButton.addEventListener("click", () => {
  saveButtonState();
  profilePopup.open();
});

const profilePopup = new PopupWithForm("#profilePopup", (inputValues) => {
  const { pName, pAboutme } = inputValues;

  userInfo.setUserInfo(pName, pAboutme);
  profilePopup.close();
});

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

///////////////popup newLocation/////////////////////

addButton.addEventListener("click", () => {
  createButtonState();
  newLocationPopup.open();
});

const newLocationPopup = new PopupWithForm(
  "#newLocationPopup",
  (inputValues) => {
    const { pTitle, pLink } = inputValues;

    if (pTitle && pLink) {
      renderCard({ name: pTitle, link: pLink });
      newLocationPopup.close();
    }

    createButtonState();
  }
);

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

saveButton.addEventListener("click", () => {
  const pName = nameInput.value;
  const pAboutme = aboutInput.value;
  profilePopup.submit({ pName, pAboutme });
});

createButton.addEventListener("click", () => {
  const pTitle = titleInput.value;
  const pLink = linkInput.value;
  newLocationPopup.submit({ pTitle, pLink });
});
/////////////popup image////////////
function handleCardClick(imageSrc, imageAlt) {
  const popupWithImage = new PopupWithImage("#popupImage");
  popupWithImage.open(imageSrc, imageAlt, imageAlt);
}
