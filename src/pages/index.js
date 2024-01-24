import "./index.css";
import Api from "../components/Api.js";
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
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
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
const newLocationForm = document.getElementById("newLocationForm");
const avatarForm = document.getElementById("newAvatarImageForm");

const profileFormValidator = new FormValidator(formValidator, profileForm);
const newLocationFormValidator = new FormValidator(
  formValidator,
  newLocationForm
);

const avatarFormValidator = new FormValidator(formValidator, avatarForm);

profileFormValidator.enableValidation();
newLocationFormValidator.enableValidation();
avatarFormValidator.enableValidation();
/////////////Profile////////////////
editButton.addEventListener("click", () => {
  saveButtonState(nameInput, aboutInput, saveButton);
  profilePopup.open();
});

const profilePopup = new PopupWithForm(
  "#profilePopup",
  handleProfileFormSubmit,
  api
);

function handleProfileFormSubmit(inputValues, api) {
  const { pName, pAboutme } = inputValues;

  saveButton.setAttribute("disabled", true);
  saveButtonText.textContent = "Salvando...";

  api
    .editUserInfo({ name: pName, about: pAboutme })
    .then((response) => {
      const avatarUrl = response.avatar;
      userInfo.setUserInfo(pName, pAboutme, avatarUrl);
      profilePopup.close();
    })
    .catch((error) => {
      console.error("Erro ao salvar:", error);
    })
    .finally(() => {
      saveButtonText.textContent = "Salvar";
      saveButton.removeAttribute("disabled");
    });
}

saveButton.addEventListener("click", (event) => {
  event.preventDefault();
  const saveButtonText = document.getElementById("saveButtonText");

  saveButton.setAttribute("disabled", true);
  saveButtonText.textContent = "Salvando...";

  profilePopup.submit();
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

  saveButtonState(nameInput, aboutInput, saveButton);
}

nameInput.addEventListener("input", () => validateProfileForm(nameInput));
aboutInput.addEventListener("input", () => validateProfileForm(aboutInput));

/////////////NewLocation////////////
addButton.addEventListener("click", () => {
  saveButtonState(titleInput, linkInput, createButton);
  newLocationPopup.open();
});

const newLocationPopup = new PopupWithForm(
  "#newLocationPopup",
  handleNewLocationFormSubmit,
  api
);

function handleNewLocationFormSubmit(inputValues, api) {
  const { pTitle, pLink } = inputValues;

  createButton.setAttribute("disabled", true);
  createButton.textContent = "Criando...";

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
      createButton.textContent = "Criar";
      createButton.removeAttribute("disabled");
    });
}

createButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  newLocationPopup.submit();
});

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

  saveButtonState(titleInput, linkInput, createButton);
}

titleInput.addEventListener("input", () => validateNewLocation(titleInput));
linkInput.addEventListener("input", () => validateNewLocation(linkInput));

/////////////popup Avatar////////////
editAvatarButton.addEventListener("click", () => {
  saveAvatarButtonState();
  editAvatarPopup.open();
});

const editAvatarPopup = new PopupWithForm(
  "#editAvatarPopup",
  handleAvatarFormSubmit,
  api
);

function handleAvatarFormSubmit(inputValues, api) {
  const { pLinkAvatar } = inputValues;

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
}

function updateAvatarImage(newImageUrl) {
  avatarImage.src = newImageUrl;
}
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

avatarSaveButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  editAvatarPopup.submit();
});

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
/////////////popup image////////////
function handleCardClick(imageSrc, imageAlt) {
  const popupWithImage = new PopupWithImage("#popupImage");
  popupWithImage.open(imageSrc, imageAlt, imageAlt);
}

//////buton state para profile e newLocation
function saveButtonState(inputElement, inputElement2, submitButton) {
  const isInput1Valid = inputElement.checkValidity();
  const isInput2Valid = inputElement2.checkValidity();

  if (isInput1Valid && isInput2Valid) {
    submitButton.classList.remove("popup__form-submit-button_disabled");
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.classList.add("popup__form-submit-button_disabled");
    submitButton.setAttribute("disabled", true);
  }
}
