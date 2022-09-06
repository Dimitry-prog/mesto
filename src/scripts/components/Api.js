export default class Api {
  construct() {

  }

  getUsersInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-50/users/me', {
      headers: {
        authorization: 'aaaf8a01-66a7-402b-b4c7-63b2ef616c45'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-50/cards', {
      headers: {
        authorization: 'aaaf8a01-66a7-402b-b4c7-63b2ef616c45',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  patchProfile(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-50/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'aaaf8a01-66a7-402b-b4c7-63b2ef616c45',
        'Content-Type': 'application/json'
      },
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
    return fetch('https://mesto.nomoreparties.co/v1/cohort-50/cards', {
      method: 'POST',
      headers: {
        authorization: 'aaaf8a01-66a7-402b-b4c7-63b2ef616c45',
        'Content-Type': 'application/json'
      },
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
    return fetch('https://mesto.nomoreparties.co/v1/cohort-50/cards', {
      headers: {
        authorization: 'aaaf8a01-66a7-402b-b4c7-63b2ef616c45'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-50/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: 'aaaf8a01-66a7-402b-b4c7-63b2ef616c45',
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  putLikeCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-50/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: 'aaaf8a01-66a7-402b-b4c7-63b2ef616c45',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: id,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  removeLikeCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-50/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: 'aaaf8a01-66a7-402b-b4c7-63b2ef616c45',
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  patchAvatar(linkAvatar) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-50/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: 'aaaf8a01-66a7-402b-b4c7-63b2ef616c45',
        'Content-Type': 'application/json'
      },
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
