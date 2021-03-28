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
      });
  }

  setUser(userData) {
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
        name: userData.name,
        about: userData.profession
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка, код ${res.status}`))
      });
    }

  addCard(cardData) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cardData['place-name'],
        link: cardData['place-link'],
      }),
    })
      .then(res => {
        if (res.ok) {
            return res.json();
          }

          return Promise.reject(new Error(`Ошибка, код ${res.status}`))
        });
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
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
      });
  }

  sendLike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
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
      });
  }

  sendUnlike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
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
      });
  }

  setAvatar(avatarLink) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка, код ${res.status}`))
      });
  }

  first(...args) {
    return Promise.all([...args]);
  }
}
