const overlay = document.querySelector(".overlay");
const editButton = document.getElementById("editButton");
const addButton = document.getElementById("addButton");
const profilePopup = document.getElementById("profilePopup");
const newLocationPopup = document.getElementById("newLocationPopup");
const closeProfileButton = document.getElementById("profilePopup");
const closeButtonNewLocationPopup = document.getElementById("closeNewLocation");
const closeButtonImage = document.querySelector(".popup-image-close");
const popupImageContainer = document.querySelector(".popup-image");
const popupImage = document.querySelector(".popup-image-open");

// abrir e fechar Profile Popup
export function openPopup() {
  profilePopup.classList.add("show");
  overlay.classList.add("show");
}

export function closePopup() {
  profilePopup.classList.remove("show");
  overlay.classList.remove("show");
}

// abrir e fechar New Location Popup
export function openNewLocationPopup() {
  newLocationPopup.classList.add("show");
  overlay.classList.add("show");
}

export function closeNewLocationPopup() {
  newLocationPopup.classList.remove("show");
  overlay.classList.remove("show");
}
//eventos para abrir e fechar os popups///
editButton.addEventListener("click", openPopup);
addButton.addEventListener("click", openNewLocationPopup);
closeProfileButton.addEventListener("click", closePopup);
closeButtonNewLocationPopup.addEventListener("click", closeNewLocationPopup);
//////

// abrir e fechar Image Popup
function openImagePopup(event) {
  if (event.target.classList.contains("card__img")) {
    const { src, alt } = event.target;
    popupImageContainer.classList.add("show");
    popupImage.classList.add("show");
    overlay.classList.add("show");
    popupImageContainer.querySelector("#popupImage").src = src;
    popupImageContainer.querySelector("#popupImage").alt = alt;
    popupImageContainer.querySelector("#PopUpImageTitle").textContent = alt;
  }
}
document.addEventListener("click", openImagePopup);

function closeImagePopup() {
  popupImageContainer.classList.remove("show");
  popupImage.classList.remove("show");
  overlay.classList.remove("show");
}

if (closeButtonImage) {
  closeButtonImage.classList.add("popup__close");
  closeButtonImage.addEventListener("click", closeImagePopup);
}

// fechar Popups quando clicar no overlay ou apertar esc
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
