export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_open');
  }

  close() {
    this._popup.classList.remove('popup_open');
  }

  setEventListeners() {
    this._closeButton = this._popup.querySelector('.popup__close');

    this._closeButton.addEventListener('click', () => this.close());
  }
}
