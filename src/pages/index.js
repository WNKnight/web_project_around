import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const profileName = document.querySelector(".profile__name");
const profileAbout = document.getElementById(".profile__about");
const AvatarImage = document.getElementById(".profile__avatar");
const nameInput = document.getElementById("pName");
const aboutInput = document.getElementById("pAboutme");
const saveButton = document.getElementById("saveButton");
const titleInput = document.getElementById("pTitle");
const linkInput = document.getElementById("pLink");
const createButton = document.getElementById("createButton");
const editButton = document.getElementById("editButton");
const addButton = document.getElementById("addButton");

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_08",
  token: "7887b144-3999-4d14-a3d6-51691cca960c",
});

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__about",
  ".profile__avatar"
);

api
  .getUserInfo()
  .then((userData) => {
    const { name, about, avatar, _id } = userData;
    console.log(`Dados do Usuario:`, userData);
  })
  .catch((error) => {
    console.log(`Erro ao carregar informações do usuário: ${error}`);
  });

const gallerySection = new Section(
  {
    renderer: renderCard,
  },
  ".card-list"
);

api
  .getInitialCards()
  .then((initialCards) => {
    gallerySection.setItems(initialCards);
    gallerySection.render();
  })
  .catch((error) => {
    console.log(`Erro ao carregar cartões iniciais: ${error}`);
  });

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
