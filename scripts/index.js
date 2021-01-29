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

const initialCards = [
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


////////////////////////////////////////////////////////////
// ОТРИСОВКА КАРТОЧЕК
////////////////////////////////////////////////////////////

// Отрисовываем первые карточки
function renderInitialCards () {
  initialCards.reverse().forEach(renderCard);
}

// Отрисовываем произвольную карточку
function renderCard (cardObj) {

  // Клонируем шаблон
  const cardItem = cardTemplate.cloneNode(true);

  // Заполняем шаблон
  // 1. Изображение места
  cardItem.querySelector('.cards-grid__image').src = cardObj.link;

  // 2. Название места
  cardItem.querySelector('.cards-grid__heading').textContent = cardObj.name;

  // Вешаем слушатель на кнопку удаления
  cardItem.querySelector('.cards-grid__delete-button').addEventListener('click', handleDeleteCard);

  // Вешаем слушатель на кнопку лайка
  cardItem.querySelector('.cards-grid__like-button').addEventListener('click', handleLikeCard);

  // Вешаем слушатель на изображение
  cardItem.querySelector('.cards-grid__image').addEventListener('click', handlePlaceImagePopupOpen);

  // Отрисовываем карточку на странице
  cardsList.prepend(cardItem);
}


////////////////////////////////////////////////////////////
// УДАЛЕНИЕ КАРТОЧЕК
////////////////////////////////////////////////////////////

function handleDeleteCard (evt) {
  evt.target.closest('.cards-grid__list-item').remove();
}


////////////////////////////////////////////////////////////
// ЛАЙК КАРТОЧЕК
////////////////////////////////////////////////////////////

function handleLikeCard (evt) {
  evt.target.classList.toggle('cards-grid__like-button_active');
}


////////////////////////////////////////////////////////////
// РАБОТА С ПОПАПОМ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
////////////////////////////////////////////////////////////

function handleProfileEditPopupOpen() {
  profileEditPopup.classList.add('popup_open');
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
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


////////////////////////////////////////////////////////////
// РАБОТА С ПОПАПОМ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
////////////////////////////////////////////////////////////

function handleCardAddPopupOpen() {
  cardAddPopup.classList.add('popup_open');
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


////////////////////////////////////////////////////////////
// РАБОТА С ПОПАПОМ ИЗОБРАЖЕНИЯ ИЗ КАРТОЧКИ
////////////////////////////////////////////////////////////

function handlePlaceImagePopupOpen(evt) {
  placeImagePopup.querySelector('.image-popup__place-image').src = evt.target.closest('.cards-grid__image').src;
  placeImagePopup.querySelector('.image-popup__place-name').textContent = evt.target.closest('.cards-grid__list-item').querySelector('.cards-grid__heading').textContent;
  placeImagePopup.classList.add('image-popup_open');
}

function handlePlaceImagePopupClose() {
  placeImagePopup.classList.remove('image-popup_open');
}

////////////////////////////////////////////////////////////
// ВЫЗОВ ФУНКЦИЙ
////////////////////////////////////////////////////////////

// Отрисовать первые карточки
renderInitialCards();


////////////////////////////////////////////////////////////
// ДОБАВЛЕНИЕ СЛУШАТЕЛЕЙ
////////////////////////////////////////////////////////////

profileEditButton.addEventListener('click', handleProfileEditPopupOpen);
closeProfileEditPopupButton.addEventListener('click', handleProfileEditPopupClose);
profileEditFormElement.addEventListener('submit', handleProfileEditFormSubmit);

cardAddButton.addEventListener('click', handleCardAddPopupOpen);
closeCardAddPopupButton.addEventListener('click', handleCardAddPopupClose);
cardAddFormElement.addEventListener('submit', handleCardAddFormSubmit);

closePlaceImagePopupButton.addEventListener('click', handlePlaceImagePopupClose);
