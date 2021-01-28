let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let nameInput = document.querySelector('.form__input_type_name');
let professionInput = document.querySelector('.form__input_type_profession');
let formElement = document.querySelector('.form');

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

profileEditButton.addEventListener('click', popupOpen);

popupCloseButton.addEventListener('click', popupClose);

formElement.addEventListener('submit', handleFormSubmit);
