let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

profileEditButton.addEventListener('click', () => {
  popup.classList.add('popup_open');
});
