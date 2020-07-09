export default class FormValidator {
  constructor(form, errorMessages) {
    this.form = form;
    this.errorMessages = errorMessages;
  }

  checkInputValidity({ input, error }) {
    if (input.validity.valueMissing) {
      error.textContent = this.errorMessages.valueMissing;
      return;
    }
    if (input.validity.tooShort || input.validity.tooLong) {
      error.textContent = this.errorMessages.tooShort;
      return;
    }
    if (input.validity.typeMismatch) {
      error.textContent = this.errorMessages.typeMismatch;
      return;
    }

    error.textContent = '';
  }

  setSubmitButtonState() {
    const isAllInputsValid = this.form.checkValidity();

    if (isAllInputsValid) {
      this.submitButton.removeAttribute('disabled');
      this.submitButton.classList.remove('popup__button_disabled');
    } else {
      this.submitButton.setAttribute('disabled', true);
      this.submitButton.classList.add('popup__button_disabled');
    }
  }

  clearErrors() {
    this.inputs.forEach(input => {
      const error = input.nextElementSibling;

      error.textContent = '';
    });
  }

  setEventListeners(submitButton) {
    this.submitButton = submitButton;
    this.inputs = Array.from(this.form.querySelectorAll('.popup__input'));

    this.inputs.forEach(input => {
      const error = input.nextElementSibling;

      input.addEventListener('input', () => this.checkInputValidity({ input, error }));
    });

    this.form.addEventListener('input', () => this.setSubmitButtonState());
  }
}
