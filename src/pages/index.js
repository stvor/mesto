import './index.css';
import { Card, cardsData } from '../components/Card.js';
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

const api = new Api(options);

api.getUser()
  .then(data => {
    console.log(data);
    userInfo.setUserInfo(data.name, data.about, data.avatar);
  })
  .catch((err) => {
    console.log(err);
  });

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
  renderer: (item) => {
    const newCardElement = createCard(item);

    cardsList.addItem(newCardElement);
  }
}, '.cards-grid__list');

api.getInitialCards()
  .then(data => {
    console.log(data);
    cardsList.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

// Создать экземпляр класса PopupWithForm для попапа профиля
const profilePopupWithForm = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  handleFormSubmit: (userData) => {
    api.setUser(userData)
      .then(data => {
        userInfo.setUserInfo(data.name, data.about, data.avatar);
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
    api.addCard(cardData)
      .then(data => {
        console.log(data);

        const newCard = {};

        newCard.name = cardData['place-name'];
        newCard.link = cardData['place-link'];

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

function createCard(item) {
  const card = new Card({
    cardData: item,
    cardSelector: '.card-template',
    handleCardClick: (item) => {
      placePopupWithImage.open(item);
    },
    handleLikeClick: (cardId) => {
      console.log('123');
      api.likeCard(cardId)
        .then(data => {
          console.log(data);
          card.updateLikes(data.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const cardElement = card.generateCard();

  return cardElement;
};

