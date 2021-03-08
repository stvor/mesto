const cardsData = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


export default class Card {
  constructor(cardData, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = cardData.link;
    this._name = cardData.name;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.cards-grid__delete-button').addEventListener('click', this._handleDeleteCard);
    this._element.querySelector('.cards-grid__like-button').addEventListener('click', this._handleLikeCard);
    this._element.querySelector('.cards-grid__image').addEventListener('click', this._handlePlaceImagePopupOpen);
  }

  _handleDeleteCard(evt) {
    evt.target.closest('.cards-grid__list-item').remove();
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('cards-grid__like-button_active');
  }

  _handlePlaceImagePopupOpen() {
    placeImage.src = this._link;
    placeImage.alt = this._name;
    placeName.textContent = this._name;

    openPopup(placeImagePopup);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.cards-grid__image').src = this._link;
    this._element.querySelector('.cards-grid__image').alt = this._name;
    this._element.querySelector('.cards-grid__heading').textContent = this._name;

    return this._element;
  }
}

cardsData.forEach((cardData) => {
  const card = new Card(cardData, '.card-template');
  const cardElement = card.generateCard();
  document.body.append(cardElement);
});

