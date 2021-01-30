const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_profile-edit');
const closeProfileEditPopupButton = profileEditPopup.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const nameInput = document.querySelector('.form__input_type_name');
const professionInput = document.querySelector('.form__input_type_profession');
const profileEditFormElement = document.querySelector('.form_type_profile-edit');
const cardsList = document.querySelector('.cards-grid__list');
const cardTemplate = document.querySelector('.card-template').content;
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_card-add');
const closeCardAddPopupButton = cardAddPopup.querySelector('.popup__close');
const cardAddFormElement = document.querySelector('.form_type_card-add');
const placeNameInput = cardAddFormElement.querySelector('.form__input_type_place-name');
const placeLinkInput = cardAddFormElement.querySelector('.form__input_type_place-link');
const placeImagePopup = document.querySelector('.image-popup');
const closePlaceImagePopupButton = placeImagePopup.querySelector('.image-popup__close');

function renderInitialCards () {
  initialCards.reverse().forEach(renderCard);
}

function renderCard (cardObj) {

  const cardItem = cardTemplate.cloneNode(true);

  cardItem.querySelector('.cards-grid__image').src = cardObj.link;
  cardItem.querySelector('.cards-grid__heading').textContent = cardObj.name;

  cardItem.querySelector('.cards-grid__delete-button').addEventListener('click', handleDeleteCard);
  cardItem.querySelector('.cards-grid__like-button').addEventListener('click', handleLikeCard);
  cardItem.querySelector('.cards-grid__image').addEventListener('click', handlePlaceImagePopupOpen);

  cardsList.prepend(cardItem);
}

function handleDeleteCard (evt) {
  evt.target.closest('.cards-grid__list-item').remove();
}

function handleLikeCard (evt) {
  evt.target.classList.toggle('cards-grid__like-button_active');
}

function handleProfileEditPopupOpen() {
  profileEditPopup.classList.add('popup_open');

  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;

  closeProfileEditPopupButton.addEventListener('click', handleProfileEditPopupClose);
  profileEditFormElement.addEventListener('submit', handleProfileEditFormSubmit);
}

function handleProfileEditPopupClose() {
  profileEditPopup.classList.remove('popup_open');
}

function handleProfileEditFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;

  handleProfileEditPopupClose();
}

function handleCardAddPopupOpen() {
  cardAddPopup.classList.add('popup_open');

  closeCardAddPopupButton.addEventListener('click', handleCardAddPopupClose);
  cardAddFormElement.addEventListener('submit', handleCardAddFormSubmit);
}

function handleCardAddPopupClose() {
  cardAddPopup.classList.remove('popup_open');
}

function handleCardAddFormSubmit (evt) {
  evt.preventDefault();

  const newCard = {};

  newCard.name = placeNameInput.value;
  newCard.link = placeLinkInput.value;

  renderCard(newCard);

  handleCardAddPopupClose();
}

function handlePlaceImagePopupOpen(evt) {
  placeImagePopup.querySelector('.image-popup__place-image').src = evt.target.closest('.cards-grid__image').src;
  placeImagePopup.querySelector('.image-popup__place-name').textContent = evt.target.closest('.cards-grid__list-item').querySelector('.cards-grid__heading').textContent;

  placeImagePopup.classList.add('image-popup_open');

  closePlaceImagePopupButton.addEventListener('click', handlePlaceImagePopupClose);
}

function handlePlaceImagePopupClose() {
  placeImagePopup.classList.remove('image-popup_open');
}
renderInitialCards();

profileEditButton.addEventListener('click', handleProfileEditPopupOpen);

cardAddButton.addEventListener('click', handleCardAddPopupOpen);
