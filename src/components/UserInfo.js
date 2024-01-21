export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this.nameElement = document.querySelector(nameSelector);
    this.aboutElement = document.querySelector(aboutSelector);
    this.avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this.nameElement.textContent,
      about: this.aboutElement.textContent,
      avatar: this.avatarElement.src,
    };
  }

  setUserInfo(name, about, avatar) {
    this.nameElement.textContent = name;
    this.aboutElement.textContent = about;
    this.avatarElement.src = avatar;
  }
}
