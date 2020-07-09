import Popup from './Popup.js';

export default class PopupImage extends Popup {
  setEventListeners() {
    this.closeButton.addEventListener('click', this.closePopup.bind(this));
  }
}