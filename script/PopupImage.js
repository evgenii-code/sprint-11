class PopupImage extends Popup {
  setEventListeners() {
    this.closeButton.addEventListener('click', this.closePopup.bind(this));
  }
}