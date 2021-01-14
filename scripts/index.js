let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close');

profileEditButton.addEventListener('click', () => {
  popup.classList.add('popup_open');
});

popupCloseButton.addEventListener('click', () => {
  popup.classList.remove('popup_open');
});
