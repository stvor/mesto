export class Card {
  constructor({ cardData, cardSelector, handleCardClick, handleDeleteCard, handleLikeCard }) {
    this._cardSelector = cardSelector;
    this._id = cardData._id;
    this._link = cardData.link;
    this._name = cardData.name;
    this._likesNumber = cardData.likes.length;
    this._cardData = cardData;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
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
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardData));
  }

  // _handleDeleteCard(evt) {
  //   evt.target.closest('.cards-grid__list-item').remove();
  // }

  // _handleLikeCard(evt) {
  //   evt.target.classList.toggle('cards-grid__like-button_active');
  // }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.cards-grid__image');
    this._cardHeading = this._element.querySelector('.cards-grid__heading');
    this._cardLikes = this._element.querySelector('.cards-grid__likes-count');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardHeading.textContent = this._name;
    this._cardLikes.textContent = this._likesNumber;

    this._setEventListeners();

    return this._element;
  }
}
