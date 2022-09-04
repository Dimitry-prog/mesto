export default class Api {
  construct() {

  }

  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-50/users/me', {
      headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
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
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
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
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.activity
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  postNewCard(name, link) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-50/cards', {
      method: 'POST',
      headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  showQuantityLikes() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-50/cards', {
      headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard() {
    console.log('result');
  }

  toggleLike() {
    console.log('result');
  }

  patchAvatar(linkAvatar) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-50/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: linkAvatar
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
