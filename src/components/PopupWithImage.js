import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, cardData) {
    super(popupSelector);
    this._link = cardData.link;
    this._name = cardData.name;
  }

  open() {
    this._placeImage = this._popup.querySelector('.image-popup__place-image');
    this._placeName = this._popup.querySelector('.image-popup__place-name');

    this._placeImage.src = this._link;
    this._placeName.alt = this._name;
    this._placeName.textContent = this._name;

    super.open();
  }
}
