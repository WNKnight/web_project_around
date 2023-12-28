const closeButtonImage = document.querySelector(".popup-image-close");
const popupImageContainer = document.querySelector(".popup-image");
const popupImage = document.querySelector(".popup-image-open");

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
