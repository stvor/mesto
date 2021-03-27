import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator, settings } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditFormElement = document.querySelector('.form_type_profile-edit');
const cardAddButton = document.querySelector('.profile__add-button');
const cardAddFormElement = document.querySelector('.form_type_card-add');

const options = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '6320c87e-58cc-431b-b75b-473d8cbd6c68',
  },
};


////////////////////////////////////////////////////////////
// ОПИСАНИЕ ФУНКЦИЙ
////////////////////////////////////////////////////////////

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

// Создание карточки
function createCard(item) {
  const card = new Card({
    cardData: item,
    cardSelector: '.card-template',
    handleCardClick: (item) => {
      placePopupWithImage.open(item);
    },
    handleDeleteCard: (evt) => {
      evt.target.closest('.cards-grid__list-item').remove();
    },
    handleLikeCard: (evt) => {
      evt.target.classList.toggle('cards-grid__like-button_active');
    },
  });

  const cardElement = card.generateCard();

  return cardElement;
};


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

// Создать класс Api для работы с сервером
const api = new Api(options);

// api.getUser()
//   .then(data => {
//     console.log(data);
//     userInfo.setUserInfo(data.name, data.about, data.avatar);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// api.deleteCard()
// .then(data => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log(err);
// });

// api.unlikeCard()
// .then(data => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log(err);
// });

// api.setAvatar()
// .then(data => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log(err);
// });

// api.getInitialCards()
//   .then(data => {
//     console.log(data);
//     cardsList.renderItems(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Создать класс Section для отрисовки карточек
const cardsList = new Section({
  renderer: (item) => {
    const newCardElement = createCard(item);

    cardsList.addItem(newCardElement);
  }
}, '.cards-grid__list');

// Создать экземпляр класса PopupWithForm для попапа профиля
const profilePopupWithForm = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  handleFormSubmit: (userData) => {
    api.setUser(userData)
      .then(data => {
        console.log(data);
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });

    profilePopupWithForm.close();
  }
});

profilePopupWithForm.setEventListeners();

// Создать экземпляр класса PopupWithForm для попапа добавления новой карточки
const cardAddPopupWithForm = new PopupWithForm({
  popupSelector: '.popup_type_card-add',
  handleFormSubmit: (cardData) => {
    console.log('1', cardData);
    api.addCard(cardData)
      .then(data => {
        console.log('2', data);

        const newCard = {};

        newCard.name = data.name;
        newCard.link = data.link;
        newCard.likesNumber = data.likes.length;

        console.log('3', newCard);

        const newCardElement = createCard(newCard);

        cardsList.addItem(newCardElement);
      })
      .catch((err) => {
        console.log(err);
      });

    cardAddPopupWithForm.close();
  }
});

cardAddPopupWithForm.setEventListeners();

// Создать класс UserInfo для отображения профиля
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  professionSelector: '.profile__profession',
  avatarSelector: '.profile__avatar',
});

// Создать экземпляры класса FormValidator для каждой формы
const cardAddFormValidator = new FormValidator(settings, cardAddFormElement);
cardAddFormValidator.enableValidation();

const profileEditFormValidator = new FormValidator(settings, profileEditFormElement);
profileEditFormValidator.enableValidation();

const placePopupWithImage = new PopupWithImage('.popup_type_image-popup');
placePopupWithImage.setEventListeners();


////////////////////////////////////////////////////////////
// ВЫЗОВЫ
////////////////////////////////////////////////////////////

api.first(api.getUser(), api.getInitialCards())
  .then(([userData, cardsData]) => {
    console.log(userData, cardsData);
    userInfo.setUserInfo(userData);

    cardsList.renderItems(cardsData);
  });
