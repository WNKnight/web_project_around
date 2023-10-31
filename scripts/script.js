let editButton = document.getElementById("editButton");
let popup = document.querySelector(".popup");
let overlay = document.querySelector(".overlay");
let closeButton = document.querySelector(".popup__close");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let nameInput = document.getElementById("pName");
let aboutInput = document.getElementById("pAboutme");
let saveButton = document.querySelector(".popup__form-submit-button");
let formElement = document.querySelector(".popup__form");
let likeButtons = document.querySelectorAll(".gallery__like-button");

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
