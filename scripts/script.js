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

//função para criar cartão para a  gallery e botao de curtir funcional//
const gallerySection = document.querySelector(".gallery");

const galleryList = document.createElement("ul");
galleryList.classList.add("card-list");
gallerySection.appendChild(galleryList);

initialCards.forEach((card) => {
  const cardElement = document.createElement("li");
  cardElement.classList.add("card");

  const imgElement = document.createElement("img");
  imgElement.classList.add("card__img");
  imgElement.src = card.link;
  imgElement.alt = card.name;

  const infoElement = document.createElement("div");
  infoElement.classList.add("card__info");

  const titleElement = document.createElement("h2");
  titleElement.classList.add("card__img-name");
  titleElement.textContent = card.name;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const likeButton = document.createElement("button");
  likeButton.classList.add("card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardElement.appendChild(imgElement);
  cardElement.appendChild(deleteButton);
  cardElement.appendChild(infoElement);
  infoElement.appendChild(titleElement);
  infoElement.appendChild(likeButton);

  galleryList.appendChild(cardElement);
});

//Pop-up Editar Perfil//
function handleSaveButtonClick() {
  let newName = nameInput.value;
  let newAbout = aboutInput.value;

  profileName.textContent = newName;
  profileAbout.textContent = newAbout;

  closePopup();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newAbout = aboutInput.value;

  profileName.textContent = newName;
  profileAbout.textContent = newAbout;

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
saveButton.addEventListener("click", handleSaveButtonClick);
formElement.addEventListener("submit", handleProfileFormSubmit);

//Pop-up para adicionar novas imagens a gallery//
const allImages = document.querySelectorAll(".gallery__img");

function addImageToGallery() {
  const title = pTitleInput.value;
  const link = pLinkInput.value;

  if (title && link) {
    const cardList = document.querySelector(".card-list");

    const cardElement = document.createElement("li");
    cardElement.classList.add("card");

    const imgElement = document.createElement("img");
    imgElement.classList.add("card__img");
    imgElement.src = link;
    imgElement.alt = title;

    const infoElement = document.createElement("div");
    infoElement.classList.add("card__info");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("card__img-name");
    titleElement.textContent = title;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("card__delete-button");
    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });

    const likeButton = document.createElement("button");
    likeButton.classList.add("card__like-button");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    cardElement.appendChild(imgElement);
    cardElement.appendChild(deleteButton);
    cardElement.appendChild(infoElement);
    infoElement.appendChild(titleElement);
    infoElement.appendChild(likeButton);

    // Adiciona o novo cartão no início da lista
    cardList.insertBefore(cardElement, cardList.firstChild);

    closeNewLocationPopup();
  }
}

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

//Pop-up das Imagens da Gallery//
const closeImage = document.querySelector(".popup-close-image");
const popupImageContainer = document.querySelector(".popup-image-container");
const popupImage = document.querySelector(".popup-image");

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("card__img")) {
    const clickedImage = event.target.src;
    const clickedImageAlt = event.target.alt;

    popupImageContainer.classList.add("show");
    popupImage.classList.add("show");
    overlay.classList.add("show");
    popupImageContainer.querySelector("#popupImage").src = clickedImage;
    popupImageContainer.querySelector("#popupImage").alt = clickedImageAlt;
    popupImageContainer.querySelector("#PopUpImageTitle").textContent =
      clickedImageAlt;
  }
});

closeImage.addEventListener("click", () => {
  popupImageContainer.classList.remove("show");
  popupImage.classList.remove("show");
  overlay.classList.remove("show");
});
