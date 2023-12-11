const editButton = document.getElementById("editButton");
const popup = document.getElementById("profilePopup");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".popup__close");
const newLocationPopup = document.getElementById("newLocationPopup");
const closeButtonNewLocationPopup = document.getElementById("closeNewLocation");
const closeButtonImage = document.querySelector(".popup-image-close");
closeButtonImage.classList.add("popup__close");
const popupImageContainer = document.querySelector(".popup-image");
const popupImage = document.querySelector(".popup-image-open");
const addLocationButton = document.getElementById("addButton");

function openPopup() {
  popup.classList.add("show");
  overlay.classList.add("show");
}
editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

function closePopup() {
  popup.classList.remove("show");
  overlay.classList.remove("show");
}

function openNewLocationPopup() {
  newLocationPopup.classList.add("show");
  overlay.classList.add("show");
}

addLocationButton.addEventListener("click", openNewLocationPopup);
closeButtonNewLocationPopup.addEventListener("click", closeNewLocationPopup);

function closeNewLocationPopup() {
  newLocationPopup.classList.remove("show");
  overlay.classList.remove("show");
}

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

if (closeButtonImage) {
  closeButtonImage.addEventListener("click", closeImagePopup);
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
