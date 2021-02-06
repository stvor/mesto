const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();
