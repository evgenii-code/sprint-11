'use strict';

class UserInfo {
  constructor(nameElem, aboutElem, avatarElem) {
    this.nameElem = nameElem;
    this.aboutElem = aboutElem;
    this.avatarElem = avatarElem;
  }

  setUserInfo(result) {
    this.username = result.name;
    this.job = result.about;
    this.avatar = result.avatar || this.avatar;
    // Так нехорошо и надо исправить                +
    // Вы мутируете объект, который передан как параметр по ссылке и этот объект посторонний, это совершенно неявно для пользователя класса.
    // Да и к тому же работа класса требует наличия этого объекта.
    // У вашего класса должен быть метод getUserInfo который вернет объект с данными пользователя,
    // а там вы уж ими распоряжайтесь  
    this.userData = result;

    this.updateUserInfo();
  }

  getUserInfo() {
    return this.userData;
  }

  updateUserInfo() {
    this.nameElem.textContent = this.username;
    this.aboutElem.textContent = this.job;
    this.avatarElem.style.backgroundImage = `url(${this.avatar}`;
  }
}