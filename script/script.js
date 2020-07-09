'use strict';

(function () {
  const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort11',
    headers: {
      authorization: '5634da00-9646-4a6f-a86d-3ff101e9d022',
      'Content-Type': 'application/json'
    },
    paths: {
      userInfoPath: '/users/me',
      cardsPath: '/cards',
      likesPath: '/cards/like',
    },
  });
  
  const root = document.querySelector('.root');
  
  const usernameElem = root.querySelector('.user-info__username');
  const jobElem = root.querySelector('.user-info__job');
  const avatarElem = root.querySelector('.user-info__photo');
  
  const userInfo = new UserInfo(usernameElem, jobElem, avatarElem);
  let userData;
  
  const addPopupElem = root.querySelector('#popup-add');
  const addPopupCloseButton = addPopupElem.querySelector('.popup__close');
  
  const editPopupElem = root.querySelector('#popup-edit');
  const editPopupCloseButton = editPopupElem.querySelector('.popup__close');
  
  const imagePopupElem = root.querySelector('#popup-pic');
  const imagePopupCloseButton = imagePopupElem.querySelector('.popup__close');
  
  const templateCard = root.querySelector('.card-template');
  const placesList = root.querySelector('.places-list');
  
  const editUserInfoButton = root.querySelector('.user-info__edit-button');
  const editForm = document.forms.edit;
  
  const addCardButton = root.querySelector('.user-info__button');
  const addForm = document.forms.add;
  
  const errorMessages = {
    valueMissing: 'Это обязательное поле',
    tooShort: 'Должно быть от 2 до 30 символов',
    typeMismatch: 'Здесь должна быть ссылка'
  };
  
  const popupAddButton = addForm.elements.addButton;
  const addFormValidator = new FormValidator(addForm, errorMessages);
  addFormValidator.setEventListeners(popupAddButton);
  
  const popupEditButton = editForm.elements.editButton;
  const editFormValidator = new FormValidator(editForm, errorMessages);
  editFormValidator.setEventListeners(popupEditButton);
  
  const cards = [];
  // Зачем let? Вы же можете создать сущность класса тут сразу        +
  // Надо исправить
  const cardList = new CardList({ placesList });
  
  const fillUpPopup = function () {
    const inputs = this.popup.querySelectorAll('.popup__input');
  
    Array.from(inputs).forEach(input => {
      input.value = userInfo[input.name];
    });
  
    editFormValidator.clearErrors();
    editFormValidator.setSubmitButtonState();
  }
  
  const clearForm = function () {
    const inputs = this.popup.querySelectorAll('.popup__input');
  
    Array.from(inputs).forEach(input => {
      input.value = '';
    })
  
    addFormValidator.clearErrors();
    addFormValidator.setSubmitButtonState();
  }
  
  const getImage = function (value) {
    const pictureContainer = this.popup.querySelector('.popup__picture');
    pictureContainer.src = value;
  }
  
  const addPopup = new Popup(addPopupElem, addPopupCloseButton, clearForm, addCardButton);
  const editPopup = new Popup(editPopupElem, editPopupCloseButton, fillUpPopup, editUserInfoButton);
  const imagePopup = new PopupImage(imagePopupElem, imagePopupCloseButton, getImage);
  const externalMethod = imagePopup.openPopup.bind(imagePopup);
  
  const cardSelectors = {
    card: '.place-card',
    cardName: '.place-card__name',
    cardBackground: '.place-card__image',
    cardLikeButton: '.place-card__like-icon',
    cardLikeCount: '.place-card__like-count',
    cardRemoveButton: '.place-card__delete-icon',
  }
  
  const toggleLikeApi = api.toggleLike.bind(api);
  const removeCardApi = api.removeCard.bind(api);
  
  function errorHandler(err) {
    console.log(`Ошибка: ${err}`)
  }
  
  function getInputValue(form) {
    const inputs = form.querySelectorAll('.popup__input');
  
    const result = {};
  
    Array.from(inputs).forEach(input => {
      result[input.name] = input.value;
    });
  
    return result;
  }
  
  function submitAddCard(event, errorHandler) {
    event.preventDefault();
  
    const cardData = getInputValue(event.target);
  
    api.setNewCard({ name: cardData.name, link: cardData.link })
      .then(result => {
        const newCard = new Card(templateCard, result, externalMethod, cardSelectors, toggleLikeApi, userData, removeCardApi, errorHandler);
  
        cardList.addCard(newCard.create());
  
        addPopup.closePopup();
      })
      .catch(err => errorHandler(err));
  }
  
  function submitUserInfo(event, errorHandler) {
    event.preventDefault();
  
    const form = event.target;
  
    const name = form.elements.username.value;
    const about = form.elements.job.value;
  
    api.setUserInfo({ name, about })
      .then(result => {
        userInfo.setUserInfo(result);
  
        editPopup.closePopup();
      })
      .catch(err => errorHandler(err));
  }
  
  // Надо исправить
  // См. комментарий в Card               +
  api.getUserInfo()
    .then(result => {
      userInfo.setUserInfo(result);
      userData = userInfo.getUserInfo();
    })
    .catch(err => errorHandler(err));
  
  // Надо исправить
  // См. комментарий в Card               +
  api.getInitialCards()
    .then(result => {
      result.forEach(cardData => {
        const newCard = new Card(templateCard, cardData, externalMethod, cardSelectors, toggleLikeApi, userData, removeCardApi, errorHandler);
        const cardToAppend = newCard.create();
        cards.push(cardToAppend);
      });
      cardList.render(cards);
    })
    .catch(err => errorHandler(err));
  
  addForm.addEventListener('submit', event => submitAddCard(event, errorHandler));
  editForm.addEventListener('submit', event => submitUserInfo(event, errorHandler));
})();


// Добрый день
// Оберните точку сборки в IIFE, чтобы точно быть уверенным что не используются глобальные переменные и защитить код отт конфликтов с другими
// модулями.

// Есть несколько замечаний, которые надо исправить.

// ## Можно лучше

// Большое количество параметров лучше передвать в метод или в конструктор через деструктуризацию.

// Например в коде:
// ~~~
// const newClass = new Class({ windowOne, userForm, popupObj })
// ~~~
// А внутри класса:
// ~~~
// constructor ({ userForm, popupObj, windowOne }) {...}
// ~~~
// И тогда порядок переменных будет неважен, это удобно