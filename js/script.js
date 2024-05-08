void function () {
  'use strict';

  const range = document.querySelector('#income');
  let rangeValue = document.querySelector('#income-value');
  let inputOrangeRightSide = document.querySelector('.income-range-right-side');
  const form = document.querySelector('#form-id');
  const userNameInput = document.querySelector('.user-first-name input');
  const userLastNameInput = document.querySelector('.user-last-name input');
  const userEmailInput = document.querySelector('.user-email input');
  const userPasswordInput = document.querySelector('.user-password input');
  const userPasswordConfirmInput = document.querySelector('.user-password-confirm input');

  class Validator {
    constructor(userData) {
      this.userData = userData;
    }

    isName() {
      const name = this.userData.name;
      return name !== null && name.trim().length >= 3;
    }

    isLastName() {
      const lastName = this.userData.lastName;
      return lastName !== null && lastName.trim().length >= 3;
    }

    isEmail() {
      const email = this.userData.email;
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(email);
    }

    isPasswordLength() {
      const password = this.userData.password;

      return password !== null && password.trim().length >= 6;
    }

    isPasswordMatch() {
      const password = this.userData.password;
      const passwordConfirm = this.userData.passwordConfirm;

      return password === passwordConfirm && passwordConfirm.trim().length > 0;

    }
  }

  function validateInputs(isValid, input) {
    if (!isValid) {
      input.classList.add('validation-false')
      input.classList.remove('validation-true');
    } else {
      input.classList.add('validation-true')
      input.classList.remove('validation-false');
    }
  }

  function updateRangeColor() {
    const value = range.value;
    const calcWidth = (100 - value) + '%';

    inputOrangeRightSide.style.width = calcWidth;
  }
  updateRangeColor();
  range.addEventListener('input', updateRangeColor);

  function updateValue() {
    let value = range.value;

    rangeValue.textContent = value + 'K';
  }
  range.addEventListener('input', updateValue);


  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const userValues = {
      name: form.querySelector('.user-first-name input').value,
      lastName: form.querySelector('.user-last-name input').value,
      email: form.querySelector('.user-email input').value,
      password: form.querySelector('.user-password input').value,
      passwordConfirm: form.querySelector('.user-password-confirm input').value
    }
    const validator = new Validator(userValues);

    validateInputs(validator.isName(), userNameInput);
    validateInputs(validator.isLastName(), userLastNameInput);
    validateInputs(validator.isEmail(), userEmailInput);
    validateInputs(validator.isPasswordLength(), userPasswordInput);
    validateInputs(validator.isPasswordMatch(), userPasswordConfirmInput);
  })
}();