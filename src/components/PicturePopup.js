import { Popup } from './Popup.js';

export class PicturePopup extends Popup {
  constructor( popupSelector ) {
    super(popupSelector);
    this._placeImage = this._popup.querySelector('.image-popup__place-image');
    this._placeName = this._popup.querySelector('.image-popup__place-name');
  }

  open(cardData) {
    this._placeImage.src = cardData.link;
    this._placeName.alt = cardData.name;
    this._placeName.textContent = cardData.name;

    super.open();
  }
}
