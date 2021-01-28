let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let nameInput = document.querySelector('.form__input_type_name');
let professionInput = document.querySelector('.form__input_type_profession');
let formElement = document.querySelector('.form');
const cardsList = document.querySelector('.cards-grid__list');
const cardTemplate = document.querySelector('.card-template').content;

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
  initialCards.forEach(renderCard);
}

// Отрисовываем произвольную карточку
function renderCard (cardObj) {

  // Клонируем шаблон
  const htmlElement = cardTemplate.cloneNode(true);

  // Заполняем шаблон
  // 1. Изображение места
  htmlElement.querySelector('.cards-grid__image').src = cardObj.link;

  // 2. Название места
  htmlElement.querySelector('.cards-grid__heading').textContent = cardObj.name;

  // Отрисовываем карточку на странице
  cardsList.appendChild(htmlElement);
}


////////////////////////////////////////////////////////////
// УДАЛЕНИЕ КАРТОЧЕК
////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////
// РАБОТА С ПОПАПАМИ
////////////////////////////////////////////////////////////

function popupOpen() {
  popup.classList.add('popup_open');
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

function popupClose() {
  popup.classList.remove('popup_open');
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;

  popupClose();
}


////////////////////////////////////////////////////////////
// ВЫЗОВ ФУНКЦИЙ
////////////////////////////////////////////////////////////

// Отрисовать первые карточки
renderInitialCards();


////////////////////////////////////////////////////////////
// ДОБАВЛЕНИЕ СЛУШАТЕЛЕЙ
////////////////////////////////////////////////////////////

profileEditButton.addEventListener('click', popupOpen);

popupCloseButton.addEventListener('click', popupClose);

formElement.addEventListener('submit', handleFormSubmit);
