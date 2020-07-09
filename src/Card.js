export default class Card {
  constructor(templateCard, cardData, showPopupMethod, cardSelectors, toggleLikeApi, userInfo, removeCardApi, errorHandler) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.likes = cardData.likes;
    this.templateCard = templateCard;
    this.showPopupMethod = showPopupMethod;
    this.cardSelectors = cardSelectors;
    this.cardId = cardData._id;
    this.toggleLikeApi = toggleLikeApi;
    this.removeCardApi = removeCardApi;
    this.userInfo = userInfo;
    this.cardIsLiked = this.isLiked();
    this.ownerId = cardData.owner._id;
    this.errorHandler = errorHandler;
  }

  isLiked() {
    return this.likes.some(like => like._id === this.userInfo._id);
  }

  like() {
    this.cardIsLiked = !this.cardIsLiked;
    this.toggleLikeApi({ id: this.cardId, isLiked: this.cardIsLiked })
      .then(result => {
        this.cardLikeButton.classList.toggle('place-card__like-icon_liked');

        this.renderLikes(result);
      })
      .catch(err => this.errorHandler(err));
  }

  remove(event) {
    event.stopPropagation();
    if (!window.confirm('Вы действительно хотите удалить эту карточку?')) return

    this.removeCardApi({ id: this.cardId })
      .then(result => {
        this.removeCardFromDOM(result);
      })
      .catch(err => this.errorHandler(err));
  }

  removeCardFromDOM() {
    this.removeEventListeners();
    this.card.remove();
  }

  renderLikes(result) {
    this.likeCount.textContent = result.likes.length;
  }

  showPopup() {
    this.showPopupMethod(this.link);
  }

  create() {
    const card = this.templateCard.content.cloneNode(true);
    this.card = card.querySelector(this.cardSelectors.card);

    const cardName = card.querySelector(this.cardSelectors.cardName);
    this.likeCount = card.querySelector(this.cardSelectors.cardLikeCount);
    this.likeCount.textContent = this.likes ? this.likes.length : 0;

    this.cardBackground = card.querySelector(this.cardSelectors.cardBackground);

    cardName.textContent = this.name;
    this.cardBackground.setAttribute('style', `background-image: url(${this.link})`);
    this.cardBackground.dataset.imageLink = this.link;

    this.cardLikeButton = this.card.querySelector(this.cardSelectors.cardLikeButton);

    if (this.cardIsLiked) this.cardLikeButton.classList.add('place-card__like-icon_liked');

    this.cardRemoveButton = this.card.querySelector(this.cardSelectors.cardRemoveButton);
    if (this.ownerId !== this.userInfo._id) this.cardRemoveButton.remove();

    this.setEventlisteners();

    return card;
  }

  setEventlisteners() {
    this.likeBind = this.like.bind(this);
    this.removeBind = this.remove.bind(this);
    this.showPopupBind = this.showPopup.bind(this);

    this.cardLikeButton.addEventListener('click', this.likeBind);

    if (this.ownerId === this.userInfo._id) this.cardRemoveButton.addEventListener('click', this.removeBind);

    this.cardBackground.addEventListener('click', this.showPopupBind);
  }

  removeEventListeners() {
    this.cardLikeButton.removeEventListener('click', this.likeBind);
    this.cardRemoveButton.removeEventListener('click', this.removeBind);
    this.cardBackground.removeEventListener('click', this.showPopupBind);
  }
}