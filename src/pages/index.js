import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const nameInput = document.getElementById("pName");
const aboutInput = document.getElementById("pAboutme");
const titleInput = document.getElementById("pTitle");
const linkInput = document.getElementById("pLink");
const linkAvatarInput = document.getElementById("pLinkAvatar");
const saveButton = document.getElementById("saveButton");
const createButton = document.getElementById("createButton");
const editAvatarButton = document.getElementById("avatarEdit");
const editButton = document.getElementById("editButton");
const addButton = document.getElementById("addButton");
const avatarSaveButton = document.getElementById("saveAvatarButton");
const nameError = document.getElementById("nameError");
const aboutError = document.getElementById("aboutError");
const titleError = document.getElementById("titleError");
const linkError = document.getElementById("linkError");
const avatarError = document.getElementById("linkAvatarError");
const avatarImage = document.querySelector(".profile__avatar-image");

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_08",
  token: "7887b144-3999-4d14-a3d6-51691cca960c",
});

nameInput.value = profileName.textContent;
aboutInput.value = profileAbout.textContent;

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__about",
  ".profile__avatar-image"
);

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(
      userData.name,
      userData.about,
      userData.avatar,
      userData._id
    );
  })
  .catch((error) => {
    console.error("Erro ao obter informações do usuário:", error);
  });
/////////render dos cards
const gallerySection = new Section(
  {
    items: [],
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
    console.error("Erro ao obter cartões:", error);
  });

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#cardTemplate",
    handleCardClick,
    api,
    userInfo
  );

  const cardElement = card.generateCard();
  gallerySection.addItem(cardElement);
}

//////////////////validador
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

/////////////Profile////////////////

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
saveButton.addEventListener("click", (event) => {
  event.preventDefault();

  const pName = nameInput.value;
  const pAboutme = aboutInput.value;
  const saveButtonText = document.getElementById("saveButtonText");

  saveButton.setAttribute("disabled", true);
  saveButtonText.textContent = "Salvando...";

  api
    .editUserInfo({ name: pName, about: pAboutme })
    .then(() => {
      userInfo.setUserInfo(pName, pAboutme);
      profilePopup.close();
    })
    .catch((error) => {
      console.error("Erro ao salvar:", error);
    })
    .finally(() => {
      saveButtonText.textContent = "Salvar";
      saveButton.removeAttribute("disabled");
    });
});

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

/////////////NewLocation////////////

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

createButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  const pTitle = titleInput.value;
  const pLink = linkInput.value;
  const createButtonText = document.getElementById("createButtonText");

  createButton.setAttribute("disabled", true);
  createButtonText.textContent = "Criando...";

  api
    .addCard({ name: pTitle, link: pLink })
    .then((newCard) => {
      renderCard(newCard);
      newLocationPopup.close();
    })
    .catch((error) => {
      console.log("Erro ao criar o card:", error);
    })
    .finally(() => {
      createButtonText.textContent = "Criar";
      createButton.removeAttribute("disabled");
    });
});

/////////////popup image////////////
function handleCardClick(imageSrc, imageAlt) {
  const popupWithImage = new PopupWithImage("#popupImage");
  popupWithImage.open(imageSrc, imageAlt, imageAlt);
}

/////////////popup Avatar////////////
editAvatarButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  saveAvatarButtonState();
  editAvatarPopup.open();
});

const editAvatarPopup = new PopupWithForm("#editAvatarPopup", (inputValues) => {
  const { pLinkAvatar } = inputValues;
  updateAvatarImage(pLinkAvatar);
  editAvatarPopup.close();
});

function updateAvatarImage(newImageUrl) {
  avatarImage.src = newImageUrl;
}

avatarSaveButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  const pLinkAvatar = linkAvatarInput.value;
  const avatarButtonText = document.getElementById("avatarButtonText");

  avatarSaveButton.setAttribute("disabled", true);
  avatarButtonText.textContent = "Salvando...";

  api
    .updateAvatar({ avatar: pLinkAvatar })
    .then(() => {
      updateAvatarImage(pLinkAvatar);
      editAvatarPopup.close();
    })
    .catch((error) => {
      console.log("Erro ao salvar avatar", error);
    })
    .finally(() => {
      avatarButtonText.textContent = "Salvar";
      avatarSaveButton.removeAttribute("disabled");
    });
});

function saveAvatarButtonState() {
  const isLinkValid = linkAvatarInput.checkValidity();

  if (isLinkValid) {
    avatarSaveButton.classList.remove("popup__form-submit-button_disabled");
    avatarSaveButton.removeAttribute("disabled");
  } else {
    avatarSaveButton.classList.add("popup__form-submit-button_disabled");
    avatarSaveButton.setAttribute("disabled", true);
  }
}

function validateAvatar(inputElement) {
  const isLinkValid = inputElement.checkValidity();

  if (isLinkValid) {
    avatarError.textContent = inputElement.validationMessage;
    avatarError.classList.toggle("error-message_active", false);
    inputElement.classList.toggle("popup__text_invalid", false);
  } else if (inputElement.value !== "") {
    avatarError.textContent = "Por favor, insira um endereço web válido.";
    avatarError.classList.add("error-message_active");
    inputElement.classList.add("popup__text_invalid");
  } else {
    avatarError.textContent = isLinkValid ? "" : inputElement.validationMessage;
    avatarError.classList.toggle("error-message_active", !isLinkValid);
    inputElement.classList.toggle("popup__text_invalid", !isLinkValid);
  }

  saveAvatarButtonState();
}

linkAvatarInput.addEventListener("input", () =>
  validateAvatar(linkAvatarInput)
);
