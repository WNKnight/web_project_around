export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this.nameElement = document.querySelector(nameSelector);
    this.aboutElement = document.querySelector(aboutSelector);
    this.avatarElement = document.querySelector(avatarSelector);
    this._userId = null;
  }

  getUserInfo() {
    return {
      name: this.nameElement.textContent,
      about: this.aboutElement.textContent,
      avatar: this.avatarElement.src,
      id: this._userId,
    };
  }

  setUserInfo(name, about, avatarUrl, userId) {
    this.nameElement.textContent = name;
    this.aboutElement.textContent = about;
    this.avatarElement.src = avatarUrl;
    this._userId = userId;
  }
}
