export default class Api {
  constructor({ url, headers }) {
    this.url = url;
    this._headers = headers;
    console.log(this.url);
    console.log(this._headers);
  }

  getUsersInfo() {
    return fetch(this.url + '/users/me', {
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitCards() {
    return fetch(this.url + '/cards', {
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  patchProfile(data) {
    return fetch(this.url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  postNewCard(data) {
    return fetch(this.url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getQuantityLikes() {
    return fetch(this.url + '/cards', {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  putLikeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  removeLikeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  patchAvatar(linkAvatar) {
    return fetch(this.url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: linkAvatar
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

}
