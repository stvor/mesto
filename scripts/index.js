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
const placeImagePopup = document.querySelector('.popup_type_image-popup');
const placeImage = placeImagePopup.querySelector('.image-popup__place-image');
const placeName = placeImagePopup.querySelector('.image-popup__place-name');
const closePlaceImagePopupButton = placeImagePopup.querySelector('.image-popup__close');

function renderInitialCards () {
  initialCards.reverse().forEach((card) => {
    renderCard (card, cardsList);
  });
}

function renderCard (data, wrap) {
  wrap.prepend(createCard(data));
}

function createCard (cardData) {
  const cardItem = cardTemplate.cloneNode(true);

  const likeButton = cardItem.querySelector('.cards-grid__like-button');
  const deleteButton = cardItem.querySelector('.cards-grid__delete-button');
  const cardImage = cardItem.querySelector('.cards-grid__image');
  const cardHeading = cardItem.querySelector('.cards-grid__heading');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardHeading.textContent = cardData.name;

  deleteButton.addEventListener('click', handleDeleteCard);
  likeButton.addEventListener('click', handleLikeCard);
  cardImage.addEventListener('click', () => handlePlaceImagePopupOpen(cardData));

  return cardItem;
}

function handleDeleteCard (evt) {
  evt.target.closest('.cards-grid__list-item').remove();
}

function handleLikeCard (evt) {
  evt.target.classList.toggle('cards-grid__like-button_active');
}

function openPopup(popup) {
  popup.classList.add('popup_open');
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
}

function handleProfileEditPopupOpen() {
  openPopup(profileEditPopup);

  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

function handleProfileEditPopupClose() {
  closePopup(profileEditPopup);
}

function handleProfileEditFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;

  handleProfileEditPopupClose();
}

function handleCardAddPopupOpen() {
  openPopup(cardAddPopup);
}

function handleCardAddPopupClose() {
  closePopup(cardAddPopup);
}

function handleCardAddFormSubmit (evt) {
  evt.preventDefault();

  const newCard = {};

  newCard.name = placeNameInput.value;
  newCard.link = placeLinkInput.value;

  renderCard(newCard, cardsList);

  placeNameInput.value = '';
  placeLinkInput.value = '';

  handleCardAddPopupClose();
}

function handlePlaceImagePopupOpen(cardData) {
  placeImage.src = cardData.link;
  placeImage.alt = cardData.name;
  placeName.textContent = cardData.name;

  openPopup(placeImagePopup);
}

function handlePlaceImagePopupClose() {
  closePopup(placeImagePopup);
}

cardAddButton.addEventListener('click', handleCardAddPopupOpen);
closeCardAddPopupButton.addEventListener('click', handleCardAddPopupClose);
cardAddFormElement.addEventListener('submit', handleCardAddFormSubmit);

profileEditButton.addEventListener('click', handleProfileEditPopupOpen);
closeProfileEditPopupButton.addEventListener('click', handleProfileEditPopupClose);
profileEditFormElement.addEventListener('submit', handleProfileEditFormSubmit);

closePlaceImagePopupButton.addEventListener('click', handlePlaceImagePopupClose);

renderInitialCards();
