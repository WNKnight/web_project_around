const editButton = document.getElementById("editButton");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".popup__close");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
const nameInput = document.getElementById("pName");
const aboutInput = document.getElementById("pAboutme");
const saveButton = document.querySelector(".popup__form-submit-button");
const formElement = document.querySelector(".popup__form");
const likeButtons = document.querySelectorAll(".gallery__like-button");

nameInput.value = profileName.textContent;
aboutInput.value = profileAbout.textContent;

function handleSaveButtonClick() {
  let newName = nameInput.value;
  let newAbout = aboutInput.value;

  profileName.textContent = newName;
  profileAbout.textContent = newAbout;

  closePopup();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.getElementById("pName");
  let jobInput = document.getElementById("pAboutme");

  let newName = nameInput.value;
  let newAbout = jobInput.value;

  let profileName = document.querySelector(".profile__name");
  let profileAbout = document.querySelector(".profile__about");

  profileName.textContent = newName;
  profileAbout.textContent = newAbout;

  closePopup();
}

function openPopup() {
  popup.style.display = "block";
  overlay.style.display = "block";
}

function closePopup() {
  popup.style.display = "none";
  overlay.style.display = "none";
}

function toggleLikeState() {
  this.classList.toggle("gallery__like-button_active");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
saveButton.addEventListener("click", handleSaveButtonClick);
formElement.addEventListener("submit", handleProfileFormSubmit);

likeButtons.forEach(function (likeButton) {
  likeButton.addEventListener("click", toggleLikeState);
});
