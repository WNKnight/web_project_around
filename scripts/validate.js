function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);

  function showInputError(inputElement) {
    const errorElement = document.getElementById(`${inputElement.id}Error`);

    if (errorElement) {
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(config.errorClass);
    }
  }

  function hideInputError(inputElement) {
    const errorElement = document.getElementById(`${inputElement.id}Error`);

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(config.errorClass);
    }
  }

  function checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(inputElement);
    } else {
      hideInputError(inputElement);
    }
  }

  function toggleButtonState(inputList, buttonElement) {
    if (buttonElement) {
      const isValid = inputList.every(
        (inputElement) => inputElement.validity.valid
      );

      if (isValid) {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove("popup__form-submit-button_disabled");
      } else {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add("popup__form-submit-button_disabled");
      }
    }
  }

  function setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(inputElement);
        toggleButtonState(inputList, buttonElement);
        if (formElement.id === "newLocationPopupForm") {
          validateNewLocationForm(inputElement, inputList, buttonElement);
          updateCreateButtonState(); // Adicione esta linha
        }
      });
    });
  }

  function validateProfileForm() {
    const isNameValid = nameInput.checkValidity();
    const isAboutValid = aboutInput.checkValidity();

    const nameError = document.getElementById("nameError");

    nameError.textContent = isNameValid ? "" : nameInput.validationMessage;
    nameError.classList.toggle("error-message_active", !isNameValid);
    nameInput.classList.toggle("popup__text_invalid", !isNameValid);

    const aboutError = document.getElementById("aboutError");
    aboutError.textContent = isAboutValid ? "" : aboutInput.validationMessage;
    aboutError.classList.toggle("error-message_active", !isAboutValid);
    aboutInput.classList.toggle("popup__text_invalid", !isAboutValid);

    saveButton.classList.toggle(
      "popup__form-submit-button_disabled",
      !isNameValid || !isAboutValid
    );

    handleSaveButtonClick();
  }

  function handleSaveButtonClick() {
    const isNameValid = nameInput.checkValidity();
    const isAboutValid = aboutInput.checkValidity();

    if (isNameValid && isAboutValid) {
      saveButton.removeAttribute("disabled");
      saveButton.classList.remove("popup__form-submit-button_disabled");
    } else {
      saveButton.setAttribute("disabled", true);
      saveButton.classList.add("popup__form-submit-button_disabled");
    }
  }

  function validateNewLocationForm(inputElement, inputList, buttonElement) {
    const isInputValid = inputElement.checkValidity();
    const errorElement = document.getElementById(`${inputElement.id}Error`);

    if (errorElement) {
      if (!isInputValid && inputElement.validity.valueMissing) {
        errorElement.textContent = inputElement.validationMessage;
      } else {
        const customErrorMessage = "Por favor, insira um endereço web válido.";

        if (inputElement.id === "pLink") {
          errorElement.textContent = isInputValid ? "" : customErrorMessage;
        } else {
          errorElement.textContent = isInputValid
            ? ""
            : inputElement.validationMessage;
        }

        errorElement.classList.toggle("error-message_active", !isInputValid);
      }
    }

    inputElement.classList.toggle("popup__text_invalid", !isInputValid);

    if (inputElement.tagName === "INPUT") {
      toggleButtonState(inputList, buttonElement);
    }
  }

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });

  nameInput.addEventListener("input", validateProfileForm);
  aboutInput.addEventListener("input", validateProfileForm);
}
