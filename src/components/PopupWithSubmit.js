import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
  }

  setEventListeners() {
    super.setEventListeners();

    this._form = this._popup.querySelector('.form');

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  setSubmitAction(submitFunction) {
    this._handleFormSubmit = submitFunction;
  }
}
