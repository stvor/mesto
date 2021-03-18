import { Card, cardsData } from './Card.js';
import { FormValidator, settings } from './FormValidator.js';

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
const popupList = document.querySelectorAll('.popup');
const formList = Array.from(document.querySelectorAll(settings.formSelector));


////////////////////////////////////////////////////////////
// ОТРИСОВКА КАРТОЧЕК
////////////////////////////////////////////////////////////

// Отрисовываем одну карточку
function renderCard (data, wrap) {
  wrap.prepend(createCard(data));
}

// Создаем одну карточку
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


////////////////////////////////////////////////////////////
// УДАЛЕНИЕ КАРТОЧЕК
////////////////////////////////////////////////////////////

function handleDeleteCard (evt) {
  evt.target.closest('.cards-grid__list-item').remove();
}

function handleLikeCard (evt) {
  evt.target.classList.toggle('cards-grid__like-button_active');
}


////////////////////////////////////////////////////////////
// РАБОТА С ПОПАПАМИ
////////////////////////////////////////////////////////////

// Любой попап
function openPopup(popup) {
  popup.classList.add('popup_open');

  window.addEventListener('keydown', handleEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_open');

  window.removeEventListener('keydown', handleEsc);
}

function handleEsc(evt) {
  const openedPopup = document.querySelector('.popup_open');

  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

function handleOverlayClick(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
}

// Попап редактирования профиля
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

// Попап добавления новой карточки
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

  const inputList = Array.from(evt.target.querySelectorAll(settings.inputSelector));
  const buttonElement = evt.target.querySelector(settings.submitButtonSelector);
}

// Попап изображения
function handlePlaceImagePopupOpen(cardData) {
  placeImage.src = cardData.link;
  placeImage.alt = cardData.name;
  placeName.textContent = cardData.name;

  openPopup(placeImagePopup);
}

function handlePlaceImagePopupClose() {
  closePopup(placeImagePopup);
}


////////////////////////////////////////////////////////////
// ДОБАВЛЕНИЕ СЛУШАТЕЛЕЙ
////////////////////////////////////////////////////////////

// Все попапы
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => handleOverlayClick(evt, popup));
});

// Попап добавления новой карточки
cardAddButton.addEventListener('click', handleCardAddPopupOpen);
closeCardAddPopupButton.addEventListener('click', handleCardAddPopupClose);
cardAddFormElement.addEventListener('submit', handleCardAddFormSubmit);

// Попап редактирования профиля
profileEditButton.addEventListener('click', handleProfileEditPopupOpen);
closeProfileEditPopupButton.addEventListener('click', handleProfileEditPopupClose);
profileEditFormElement.addEventListener('submit', handleProfileEditFormSubmit);

// Попап изображения
closePlaceImagePopupButton.addEventListener('click', handlePlaceImagePopupClose);

popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => handleOverlayClick(evt, popup));
});


////////////////////////////////////////////////////////////
// СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ
////////////////////////////////////////////////////////////

// Создать экземпляры класса Card для каждой карточки
cardsData.forEach((cardData) => {
  const card = new Card(cardData, '.card-template');
  const cardElement = card.generateCard();
  cardsList.append(cardElement);
});

// Создать экземпляры класса FormValidator для каждой формы
formList.forEach((formElement) => {
  const formValidator = new FormValidator(settings, formElement);
  formValidator.enableValidation(settings, formElement);
});

export { placeName, placeImage, placeImagePopup, openPopup };
