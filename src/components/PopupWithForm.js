import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.form__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form = this._popup.querySelector('.form');

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  open(data) {
    console.log(data);
    if (data) {
      this._nameInput = this._popup.querySelector('.form__input_type_name');
      this._professionInput = this._popup.querySelector('.form__input_type_profession');

      this._nameInput.value = data.userName;
      this._professionInput.value = data.profession;
    }

      super.open();
  }

  close() {
    this._form.reset();

    super.close();
  }
}
