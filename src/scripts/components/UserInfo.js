import { profileName, profileActivity } from '../utils/constants.js';

export default class UserInfo {
  constructor(data) {
    this._name = data.name;
    this._activity = data.activity;
  }
  getUserInfo() {
    return {
      name: this._name,
      activity: this._activity,
    }
  }

  setUserInfo(formValues) {
    profileName.textContent = formValues.name;
    profileActivity.textContent = formValues.activity;
  }
}
