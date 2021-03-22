export class UserInfo {
  constructor({ userNameSelector, professionSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._profession = document.querySelector(professionSelector);
  }

  getUserInfo() {
    const userName = this._userName.textContent;
    const profession = this._profession.textContent;

    return { userName, profession };
  }

  setUserInfo(userName, profession) {
    this._userName.textContent = userName;
    this._profession.textContent = profession;
  }
}
