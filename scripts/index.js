let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let nameInput = document.querySelector('.form__name');
let professionInput = document.querySelector('.form__profession');
let formElement = document.querySelector('.form');

profileEditButton.addEventListener('click', () => {
  popup.classList.add('popup_open');
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});

popupCloseButton.addEventListener('click', () => {
  popup.classList.remove('popup_open');
});

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);
