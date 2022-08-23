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

  setUserInfo(data) {
    return {
      name: data.name,
      activity: data.activity,
    }
  }
}
