import './index.css';
import { Card, cardsData } from '../components/Card.js';
import { FormValidator, settings } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditFormElement = document.querySelector('.form_type_profile-edit');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddFormElement = document.querySelector('.form_type_card-add');


// Попап редактирования профиля
function handleProfileEditPopupOpen() {
  const userData = userInfo.getUserInfo();

  profilePopupWithForm.open(userData);

  profileEditFormValidator.resetValidation();
}

// Попап добавления новой карточки
function handleCardAddPopupOpen() {
  cardAddPopupWithForm.open();

  cardAddFormValidator.resetValidation();
}


////////////////////////////////////////////////////////////
// ДОБАВЛЕНИЕ СЛУШАТЕЛЕЙ
////////////////////////////////////////////////////////////

// Попап добавления новой карточки
cardAddButton.addEventListener('click', handleCardAddPopupOpen);

// Попап редактирования профиля
profileEditButton.addEventListener('click', handleProfileEditPopupOpen);


////////////////////////////////////////////////////////////
// СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ
////////////////////////////////////////////////////////////

// Создать класс Section для отрисовки карточек
const cardsList = new Section({
  items: cardsData,
  renderer: (item) => {
    const newCardElement = createCard(item);

    cardsList.addItem(newCardElement);
  }
}, '.cards-grid__list');

cardsList.renderItems();

// Создать экземпляр класса PopupWithForm для попапа профиля
const profilePopupWithForm = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo(userData.name, userData.profession);

    profilePopupWithForm.close();
  }
});

profilePopupWithForm.setEventListeners();

// Создать экземпляр класса PopupWithForm для попапа добавления новой карточки
const cardAddPopupWithForm = new PopupWithForm({
  popupSelector: '.popup_type_card-add',
  handleFormSubmit: (cardData) => {
    const newCard = {};

    newCard.name = cardData['place-name'];
    newCard.link = cardData['place-link'];

    const newCardElement = createCard(newCard);

    cardsList.addItem(newCardElement);

    cardAddPopupWithForm.close();
  }
});

cardAddPopupWithForm.setEventListeners();

// Создать класс UserInfo для отображения профиля
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  professionSelector: '.profile__profession'
});

// Создать экземпляры класса FormValidator для каждой формы
const cardAddFormValidator = new FormValidator(settings, cardAddFormElement);
cardAddFormValidator.enableValidation();

const profileEditFormValidator = new FormValidator(settings, profileEditFormElement);
profileEditFormValidator.enableValidation();

function createCard(item) {
  const card = new Card({
    cardData: item,
    cardSelector: '.card-template',
    handleCardClick: (item) => {
      const placePopupWithImage = new PopupWithImage('.popup_type_image-popup');

      placePopupWithImage.open(item);
      placePopupWithImage.setEventListeners();

    }
  });

  const cardElement = card.generateCard();

  return cardElement;
};
