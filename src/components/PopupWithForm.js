import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector('.form__submit');
    this._inputList = this._popup.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  _setInputValues(formValues) {
    console.log(formValues);
      this._inputList.forEach(input => input.value = formValues[input.name]);
  }

  setEventListeners() {
    super.setEventListeners();

    this._form = this._popup.querySelector('.form');

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
  }

  open(data) {
    if (data) {
      this._setInputValues(data);
    }

    super.open();
  }

  close() {
    this._form.reset();

    super.close();
  }
}
