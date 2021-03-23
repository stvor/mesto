import './index.css';
import { Card, cardsData } from '../components/Card.js';
import { FormValidator, settings } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_profile-edit');
const closeProfileEditPopupButton = profileEditPopup.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const nameInput = document.querySelector('.form__input_type_name');
const professionInput = document.querySelector('.form__input_type_profession');
const profileEditFormElement = document.querySelector('.form_type_profile-edit');
// const cardsList = document.querySelector('.cards-grid__list');
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


////////////////////////////////////////////////////////////
// ОТРИСОВКА КАРТОЧЕК
////////////////////////////////////////////////////////////

// Отрисовываем одну карточку
// function renderCard (data, wrap) {
//   wrap.prepend(createCard(data));
// }

// // Создаем одну карточку
// function createCard (cardData) {
//   const card = new Card(cardData, '.card-template');
//   const cardElement = card.generateCard();

//   return cardElement;
// }


////////////////////////////////////////////////////////////
// РАБОТА С ПОПАПАМИ
////////////////////////////////////////////////////////////

// Любой попап
function openPopup(popup) {
//   popup.classList.add('popup_open');

  // window.addEventListener('keydown', handleEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_open');

  // window.removeEventListener('keydown', handleEsc);
}

// function handleEsc(evt) {
//   const openedPopup = document.querySelector('.popup_open');

//   if (evt.key === 'Escape') {
//     closePopup(openedPopup);
//   }
// }

function handleOverlayClick(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
}

// Попап редактирования профиля
function handleProfileEditPopupOpen() {
  nameInput.value = '';
  professionInput.value = '';

  // openPopup(profileEditPopup);
  profilePopupWithForm.open();
  profilePopupWithForm.setEventListeners();

  profileEditFormValidator.resetValidation();

  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

// function handleProfileEditPopupClose() {
//   closePopup(profileEditPopup);
// }

// function handleProfileEditFormSubmit (evt) {
//   evt.preventDefault();

//   profileName.textContent = nameInput.value;
//   profileProfession.textContent = professionInput.value;

//   handleProfileEditPopupClose();
// }

// Попап добавления новой карточки
function handleCardAddPopupOpen() {
  placeNameInput.value = '';
  placeLinkInput.value = '';

  // openPopup(cardAddPopup);
  cardAddPopupWithForm.open();
  cardAddPopupWithForm.setEventListeners();

  cardAddFormValidator.resetValidation();
}

// function handleCardAddPopupClose() {
//   closePopup(cardAddPopup);
// }

// function handleCardAddFormSubmit (evt) {
//   evt.preventDefault();

//   const newCard = {};

//   newCard.name = placeNameInput.value;
//   newCard.link = placeLinkInput.value;

//   renderCard(newCard, cardsList);

//   handleCardAddPopupClose();
// }

// Попап изображения
// function handlePlaceImagePopupClose() {
//   closePopup(placeImagePopup);
// }


////////////////////////////////////////////////////////////
// ДОБАВЛЕНИЕ СЛУШАТЕЛЕЙ
////////////////////////////////////////////////////////////

// Все попапы
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => handleOverlayClick(evt, popup));
});

// Попап добавления новой карточки
cardAddButton.addEventListener('click', handleCardAddPopupOpen);
// closeCardAddPopupButton.addEventListener('click', handleCardAddPopupClose);
// cardAddFormElement.addEventListener('submit', handleCardAddFormSubmit);

// Попап редактирования профиля
profileEditButton.addEventListener('click', handleProfileEditPopupOpen);
// closeProfileEditPopupButton.addEventListener('click', handleProfileEditPopupClose);
// profileEditFormElement.addEventListener('submit', handleProfileEditFormSubmit);

// Попап изображения
// closePlaceImagePopupButton.addEventListener('click', handlePlaceImagePopupClose);


////////////////////////////////////////////////////////////
// СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ
////////////////////////////////////////////////////////////

// Создать экземпляры класса Card для каждой карточки
// cardsData.forEach((cardData) => {
//   cardsList.append(createCard(cardData));
// });

// Создать класс Section для отрисовки карточек
const cardsList = new Section({
  items: cardsData,
  renderer: (item) => {
    const card = new Card({
      cardData: item,
      cardSelector: '.card-template',
      handleCardClick: (item) => {
        const placePopupWithImage = new PopupWithImage('.popup_type_image-popup', item);

        placePopupWithImage.open();
        placePopupWithImage.setEventListeners();

      }
    });

    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  }
}, '.cards-grid__list');

cardsList.renderItems();

// Создать экземпляр класса PopupWithForm для попапа профиля
const profilePopupWithForm = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  handleFormSubmit: () => {
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;

    profilePopupWithForm.close();
  }
});

// Создать экземпляр класса PopupWithForm для попапа добавления новой карточки
const cardAddPopupWithForm = new PopupWithForm({
  popupSelector: '.popup_type_card-add',
  handleFormSubmit: () => {
    const newCard = {};

    newCard.name = placeNameInput.value;
    newCard.link = placeLinkInput.value;

    const card = new Card({
      cardData: newCard,
      cardSelector: '.card-template',
      handleCardClick: (item) => {
        const placePopupWithImage = new PopupWithImage('.popup_type_image-popup', item);

        placePopupWithImage.open();
        placePopupWithImage.setEventListeners();

      }
    });

    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);

    cardAddPopupWithForm.close();
  }
});

// Создать экземпляры класса FormValidator для каждой формы
const cardAddFormValidator = new FormValidator(settings, cardAddFormElement);
cardAddFormValidator.enableValidation();

const profileEditFormValidator = new FormValidator(settings, profileEditFormElement);
profileEditFormValidator.enableValidation();

export { placeName, placeImage, placeImagePopup, openPopup };
