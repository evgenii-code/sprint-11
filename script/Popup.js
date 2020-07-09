'use strict';

class Popup {
  constructor(popup, closeButton, callBack, openButton) {
    this.openButton = openButton;
    this.popup = popup;
    this.closeButton = closeButton;
    this.callBack = callBack;
    this.setEventListeners();
  }

  setEventListeners() {
    this.openButton.addEventListener('click', this.openPopup.bind(this));
    this.closeButton.addEventListener('click', this.closePopup.bind(this));
  }

  openPopup(value) {
    if (typeof this.callBack === 'function') {
      this.callBack(value);
    };

    this.popup.classList.add('popup_is-opened');
  }

  closePopup() {
    this.popup.classList.remove('popup_is-opened');
  }
}
