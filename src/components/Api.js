export class Api {
  constructor(config) {
    this.url = config.url;
    this.authorization = config.headers.authorization;
  }

  _processingResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка, код ${res.status}`))
  }

  getUser() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.authorization,
      },
    })
      .then(res => this._processingResponse(res));
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.authorization,
      },
    })
    .then(res => this._processingResponse(res));
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
    .then(res => this._processingResponse(res));
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
    .then(res => this._processingResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
      },
    })
    .then(res => this._processingResponse(res));
  }

  sendLike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.authorization,
      },
    })
    .then(res => this._processingResponse(res));
  }

  sendUnlike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
      },
    })
    .then(res => this._processingResponse(res));
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
    .then(res => this._processingResponse(res));
  }

  first(...args) {
    return Promise.all([...args]);
  }
}
