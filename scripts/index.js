const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const nameInput = document.querySelector('.form__input_type_name');
const professionInput = document.querySelector('.form__input_type_profession');
const formElement = document.querySelector('.form');
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

  // Отрисовываем карточку на странице
  cardsList.appendChild(cardItem);
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
