const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _checkInputValidity(formElement, formInput, settings) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage, settings);
    } else {
      this._hideInputError(formInput, settings);
    }
  }

  _showInputError(inputElement, errorMessage, settings) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }

  _hideInputError(inputElement, settings) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState(inputList, buttonElement, settings) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _setEventListeners(formElement, settings) {
    const inputList = Array.from(this._formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = this._formElement.querySelector(settings.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, settings);
        this._toggleButtonState(inputList, buttonElement, settings);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._formElement, this._settings);
  }
}

export { FormValidator, settings };
