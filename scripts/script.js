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

initialCards = [
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
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const gallerySection = document.querySelector(".gallery");
//função para criar cartão para a gallery//
initialCards.forEach((card) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("gallery__block");

  const imgElement = document.createElement("img");
  imgElement.classList.add("gallery__img");
  imgElement.src = card.link;
  imgElement.alt = card.name;

  const infoElement = document.createElement("div");
  infoElement.classList.add("gallery__info");

  const titleElement = document.createElement("h2");
  titleElement.classList.add("gallery__img-name");
  titleElement.textContent = card.name;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("gallery__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const likeButton = document.createElement("button");
  likeButton.classList.add("gallery__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("gallery__like-button_active");
  });

  cardElement.appendChild(imgElement);
  cardElement.appendChild(deleteButton);
  cardElement.appendChild(infoElement);
  infoElement.appendChild(titleElement);
  infoElement.appendChild(likeButton);

  gallerySection.appendChild(cardElement);
});
///////////////////////////////////////////////////////////////////////////////
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
