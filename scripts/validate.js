const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');

const showInputError = (element) => {
  element.classList.add('form__input_type_error');
};

const hideInputError = (element) => {
  element.classList.remove('form__input_type_error');
};

const isValid = () => {
  if (!formInput.validity.valid) {
    showInputError(formInput);
  } else {
    hideInputError(formInput);
  }
};

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', isValid);
