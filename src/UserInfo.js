export default class UserInfo {
  constructor(nameElem, aboutElem, avatarElem) {
    this.nameElem = nameElem;
    this.aboutElem = aboutElem;
    this.avatarElem = avatarElem;
  }

  setUserInfo(result) {
    this.username = result.name;
    this.job = result.about;
    this.avatar = result.avatar || this.avatar;
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