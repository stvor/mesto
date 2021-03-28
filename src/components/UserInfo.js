export class UserInfo {
  constructor({ userNameSelector, professionSelector, avatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._profession = document.querySelector(professionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userName = this._userName.textContent;
    const profession = this._profession.textContent;

    return { userName, profession };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._profession.textContent = about;
    this._avatar.style.backgroundImage = `url("${avatar}")`;
    this._id = _id;
  }

  getUserId() {
    return this._id;
  }
}
