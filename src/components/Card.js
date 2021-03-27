export class Card {
  constructor({ cardData, cardSelector, handleCardClick, handleDeleteCard, handleLikeCard }) {
    this._cardSelector = cardSelector;
    this._cardData = cardData;
    this._id = cardData._id;
    this._link = cardData.link;
    this._name = cardData.name;
    this._ownerId = cardData.owner._id;
    this._likesNumber = cardData.likes.length;
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
    this._deleteButton.addEventListener('click', this._handleDeleteCard);
    this._likeButton.addEventListener('click', () => this._handleLikeCard(this._isLikedByMe));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardData));
  }

  _checkMyLike(cardData, userId) {
    return cardData.likes.some((liker) => {
      return liker._id === userId;
    });
  }

  setLikeNumber(cardData) {
    this._likesNumber = cardData.likes.length;
  }

  setLikeStatus(cardData, userId) {
    console.log('обновили лайк на странице');
    if (!this._checkMyLike(cardData, userId)) {
      this._likeButton.classList.remove('cards-grid__like-button_active');
    } else {
      this._likeButton.classList.add('cards-grid__like-button_active');
    }
  }

  addLike() {
    console.log('addLike done');
    this._likeButton.classList.add('cards-grid__like-button_active');
    this._isLikedByMe = !this._isLikedByMe;
  }

  removeLike() {
    console.log('removeLike done');
    this._likeButton.classList.remove('cards-grid__like-button_active');
    this._isLikedByMe = !this._isLikedByMe;
  }

  generateCard(userId) {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.cards-grid__image');
    this._cardHeading = this._element.querySelector('.cards-grid__heading');
    this._cardLikes = this._element.querySelector('.cards-grid__likes-count');
    this._deleteButton = this._element.querySelector('.cards-grid__delete-button');
    this._likeButton = this._element.querySelector('.cards-grid__like-button');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardHeading.textContent = this._name;
    this._cardLikes.textContent = this._likesNumber;

    this._isLikedByMe = this._checkMyLike(this._cardData, userId);

    if (this._ownerId === userId) {
      this._deleteButton.classList.add('cards-grid__delete-button_visible');
    }

    this.setLikeStatus(this._cardData, userId);
    this.setLikeNumber(this._cardData);
    this._setEventListeners();

    return this._element;
  }
}
