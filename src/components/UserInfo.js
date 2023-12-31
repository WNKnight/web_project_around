export class UserInfo {
  constructor(nameSelector, jobSelector) {
    this.nameElement = document.querySelector(nameSelector);
    this.jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this.nameElement.textContent,
      job: this.jobElement.textContent,
    };
  }

  setUserInfo(newName, newJob) {
    this.nameElement.textContent = newName;
    this.jobElement.textContent = newJob;
  }
}
