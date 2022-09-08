import { profileName, profileActivity, profileImg } from '../utils/constants.js';

export default class UserInfo {
  constructor(data) {
    this._name = data.name;
    this._about = data.about;
  }
  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
    }
  }

  setUserInfo(formValues) {
    profileName.textContent = formValues.name;
    profileActivity.textContent = formValues.about;
  }

  setUserAvatar(formValues) {
    profileImg.src = formValues.avatar;
  }
}
