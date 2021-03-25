export class Api {
  constructor(config) {
    this.url = config.url;
    this.authorization = config.headers.authorization;
  }

  getUser() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.authorization,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка, код ${res.status}`))
      })
      .catch(err => {
        Promise.reject(err);
      });
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.authorization,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка, код ${res.status}`))
      })
      .catch(err => {
        Promise.reject(err);
      });
  }

  setUser() {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // todo: проверить
        // name: userData.name,
        // about: userData.about,
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка, код ${res.status}`))
      })
      .catch(err => {
        Promise.reject(err);
      });
    }

    addCard() {
      return fetch(`${this.url}/cards`, {
        method: 'POST',
        headers: {
          authorization: this.authorization,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // todo: отправлять карточку из формы
        name: 'Marie Skłodowska Curie',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      }),
    })
    .then(res => {
      if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка, код ${res.status}`))
      })
      .catch(err => {
        Promise.reject(err);
      });
    }

  deleteCard() {
    return fetch(`${this.url}/cards/605ce53fed7b8600b5c34092`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка, код ${res.status}`))
      })
      .catch(err => {
        Promise.reject(err);
      });
  }

  likeCard() {
    return fetch(`${this.url}/cards/likes/605ce357ed7b8600b5c34090`, {
      method: 'PUT',
      headers: {
        authorization: this.authorization,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка, код ${res.status}`))
      })
      .catch(err => {
        Promise.reject(err);
      });
  }

  unlikeCard() {
    return fetch(`${this.url}/cards/likes/605ce357ed7b8600b5c34090`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка, код ${res.status}`))
      })
      .catch(err => {
        Promise.reject(err);
      });
  }
}
